#define _XOPEN_SOURCE 700
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>
#include <strings.h>
#include <unistd.h>
#include <dirent.h>
#include <sysexits.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <sys/ioctl.h>
#include <sys/wait.h>
#include <pwd.h>
#include <grp.h>
#include <time.h>
#include <limits.h>
#include <errno.h>
#include <fcntl.h>

#ifdef __APPLE__
#include <sys/xattr.h>
#else
#include <sys/xattr.h>
#endif

/* -------------------------------------------------------------------------
 * ANSI Terminal Styling
 * ------------------------------------------------------------------------- */
#define ANSI_RESET     "\033[0m"
#define ANSI_BOLD      "\033[1m"
#define ANSI_UNDERLINE "\033[4m"
#define ANSI_BLUE      "\033[1;34m"
#define ANSI_GREEN     "\033[1;32m"
#define ANSI_CYAN      "\033[1;36m"
#define ANSI_RED       "\033[1;31m"
#define ANSI_MAGENTA   "\033[1;35m"
#define ANSI_YELLOW    "\033[1;33m"
#define ANSI_REVERSE   "\033[7m"
#define ANSI_GRAY      "\033[0;90m"

/* -------------------------------------------------------------------------
 * Data Models
 * ------------------------------------------------------------------------- */
typedef struct {
    bool show_all;
    bool long_format;
    bool human_sizes;
    bool classify;
    bool sort_time;
    bool sort_size;
    bool reverse_sort;
    bool recursive;
    bool numeric_ids;
    bool git_status;
    bool show_xattr;
    bool tree_view;
    bool show_alloc;
    bool sniff_type;
    bool colorize;
} Config;

typedef struct {
    char *name;
    char *full_path;
    char *link_target;
    struct stat sb;
    bool stat_ok;
    bool broken_link;
    char git_code[3];
    char *magic_desc;
    bool has_xattrs;
    char **xattr_names;
    size_t xattr_count;
} FileEntry;

typedef struct GitNode {
    char *rel_path;
    char code[3];
    struct GitNode *next;
} GitNode;

#define HASH_BUCKETS 512
typedef struct {
    char worktree_root[PATH_MAX];
    bool is_repo;
    GitNode *buckets[HASH_BUCKETS];
} GitContext;

typedef struct InodeNode {
    dev_t dev;
    ino_t ino;
    struct InodeNode *next;
} InodeNode;

static const Config *g_active_cfg = NULL;

/* -------------------------------------------------------------------------
 * Hash Functions & Tracking
 * ------------------------------------------------------------------------- */
static unsigned int hash_string(const char *str) {
    unsigned int hash = 5381;
    int c;
    while ((c = *str++)) hash = ((hash << 5) + hash) + c;
    return hash % HASH_BUCKETS;
}

bool inode_visited(InodeNode **head, dev_t dev, ino_t ino) {
    InodeNode *cur = *head;
    while (cur) {
        if (cur->dev == dev && cur->ino == ino) return true;
        cur = cur->next;
    }
    InodeNode *new_node = malloc(sizeof(InodeNode));
    if (!new_node) return false;
    new_node->dev = dev;
    new_node->ino = ino;
    new_node->next = *head;
    *head = new_node;
    return false;
}

void free_inode_set(InodeNode *head) {
    while (head) {
        InodeNode *tmp = head->next;
        free(head);
        head = tmp;
    }
}

/* -------------------------------------------------------------------------
 * Git Subsystem Engine
 * ------------------------------------------------------------------------- */
void find_git_root(const char *start_path, GitContext *ctx) {
    memset(ctx, 0, sizeof(GitContext));
    char resolved[PATH_MAX];
    if (!realpath(start_path, resolved)) {
        strncpy(resolved, start_path, sizeof(resolved) - 1);
        resolved[sizeof(resolved) - 1] = '\0';
    }

    char test_path[PATH_MAX];
    while (true) {
        snprintf(test_path, sizeof(test_path), "%s/.git", resolved);
        struct stat sb;
        if (stat(test_path, &sb) == 0) {
            strncpy(ctx->worktree_root, resolved, sizeof(ctx->worktree_root) - 1);
            ctx->is_repo = true;
            return;
        }

        char *last_slash = strrchr(resolved, '/');
        if (!last_slash || last_slash == resolved) break;
        *last_slash = '\0';
    }
}

void init_git_context(const char *dir_path, GitContext *ctx) {
    find_git_root(dir_path, ctx);
    if (!ctx->is_repo) return;

    int pipefd[2];
    if (pipe(pipefd) == -1) return;

    pid_t pid = fork();
    if (pid == -1) {
        close(pipefd[0]);
        close(pipefd[1]);
        return;
    }

    if (pid == 0) {
        close(pipefd[0]);
        dup2(pipefd[1], STDOUT_FILENO);
        int devnull = open("/dev/null", O_WRONLY);
        if (devnull >= 0) {
            dup2(devnull, STDERR_FILENO);
            close(devnull);
        }
        close(pipefd[1]);

        char *args[] = {"git", "-C", ctx->worktree_root, "status", "--porcelain=v1", "-z", "--untracked-files=all", NULL};
        execvp("git", args);
        _exit(127);
    }

    close(pipefd[1]);
    FILE *fp = fdopen(pipefd[0], "r");
    if (!fp) {
        close(pipefd[0]);
        waitpid(pid, NULL, 0);
        return;
    }

    char record_hdr[3];
    while (fread(record_hdr, 1, 3, fp) == 3) {
        char rel_buffer[PATH_MAX];
        size_t idx = 0;
        int c;
        while ((c = fgetc(fp)) != EOF && c != '\0') {
            if (idx < sizeof(rel_buffer) - 1) {
                rel_buffer[idx++] = (char)c;
            }
        }
        rel_buffer[idx] = '\0';

        if (record_hdr[0] == 'R' || record_hdr[1] == 'R') {
            while ((c = fgetc(fp)) != EOF && c != '\0') {}
        }

        unsigned int h = hash_string(rel_buffer);
        GitNode *node = malloc(sizeof(GitNode));
        if (node) {
            node->rel_path = strdup(rel_buffer);
            node->code[0] = record_hdr[0];
            node->code[1] = record_hdr[1];
            node->code[2] = '\0';
            node->next = ctx->buckets[h];
            ctx->buckets[h] = node;
        }
    }

    fclose(fp);
    waitpid(pid, NULL, 0);
}

void lookup_git_status(const GitContext *ctx, const char *full_path, char *out_code) {
    strcpy(out_code, "  ");
    if (!ctx || !ctx->is_repo) return;

    char resolved[PATH_MAX];
    if (!realpath(full_path, resolved)) return;

    size_t root_len = strlen(ctx->worktree_root);
    if (strncmp(resolved, ctx->worktree_root, root_len) != 0) return;

    const char *rel_part = resolved + root_len;
    while (*rel_part == '/') rel_part++;
    if (*rel_part == '\0') return;

    unsigned int h = hash_string(rel_part);
    GitNode *cur = ctx->buckets[h];
    while (cur) {
        if (strcmp(cur->rel_path, rel_part) == 0) {
            strncpy(out_code, cur->code, 2);
            out_code[2] = '\0';
            return;
        }
        cur = cur->next;
    }
}

void free_git_context(GitContext *ctx) {
    if (!ctx || !ctx->is_repo) return;
    for (int i = 0; i < HASH_BUCKETS; i++) {
        GitNode *cur = ctx->buckets[i];
        while (cur) {
            GitNode *tmp = cur->next;
            free(cur->rel_path);
            free(cur);
            cur = tmp;
        }
    }
}

/* -------------------------------------------------------------------------
 * Magic Bytes Sniffer
 * ------------------------------------------------------------------------- */
char *sniff_magic_bytes(const char *path) {
    int fd = open(path, O_RDONLY);
    if (fd < 0) return NULL;

    unsigned char buf[32];
    ssize_t n = read(fd, buf, sizeof(buf));
    close(fd);

    if (n <= 0) return strdup("empty");

    if (n >= 4 && memcmp(buf, "\x7f\x45\x4c\x46", 4) == 0) return strdup("ELF binary");
    if (n >= 4 && (memcmp(buf, "\xfe\xed\xfa\xce", 4) == 0 || memcmp(buf, "\xce\xfa\xed\xfe", 4) == 0))
        return strdup("Mach-O 32-bit");
    if (n >= 4 && (memcmp(buf, "\xfe\xed\xfa\xcf", 4) == 0 || memcmp(buf, "\xcf\xfa\xed\xfe", 4) == 0))
        return strdup("Mach-O 64-bit");
    if (n >= 4 && memcmp(buf, "\xca\xfe\xba\xbe", 4) == 0) return strdup("Mach-O Universal/Java");

    if (n >= 2 && memcmp(buf, "#!", 2) == 0) return strdup("script text");
    if (n >= 4 && memcmp(buf, "%PDF", 4) == 0) return strdup("PDF document");
    if (n >= 4 && memcmp(buf, "PK\x03\x04", 4) == 0) return strdup("ZIP archive");
    if (n >= 15 && memcmp(buf, "SQLite format 3", 15) == 0) return strdup("SQLite database");

    for (ssize_t i = 0; i < n; i++) {
        if (buf[i] == 0 || (buf[i] < 7) || (buf[i] > 14 && buf[i] < 32) || buf[i] == 127) {
            return strdup("raw binary");
        }
    }
    return strdup("text document");
}

/* -------------------------------------------------------------------------
 * Extended Attributes Scanner
 * ------------------------------------------------------------------------- */
void inspect_xattrs(FileEntry *e) {
    e->has_xattrs = false;
    e->xattr_names = NULL;
    e->xattr_count = 0;

#ifdef __APPLE__
    ssize_t buflen = listxattr(e->full_path, NULL, 0, XATTR_NOFOLLOW);
#else
    ssize_t buflen = llistxattr(e->full_path, NULL, 0);
#endif

    if (buflen <= 0) return;

    char *buf = malloc(buflen);
    if (!buf) return;

#ifdef __APPLE__
    ssize_t res = listxattr(e->full_path, buf, buflen, XATTR_NOFOLLOW);
#else
    ssize_t res = llistxattr(e->full_path, buf, buflen);
#endif

    if (res > 0) {
        e->has_xattrs = true;
        size_t count = 0;
        for (ssize_t i = 0; i < res; i++) {
            if (buf[i] == '\0') count++;
        }

        e->xattr_names = malloc(count * sizeof(char *));
        if (e->xattr_names) {
            e->xattr_count = count;
            size_t idx = 0;
            char *ptr = buf;
            while (ptr < buf + res) {
                e->xattr_names[idx++] = strdup(ptr);
                ptr += strlen(ptr) + 1;
            }
        }
    }
    free(buf);
}

/* -------------------------------------------------------------------------
 * Formatting Helpers
 * ------------------------------------------------------------------------- */
void format_mode(mode_t mode, bool has_xattr, char *out) {
    out[0] = S_ISDIR(mode)  ? 'd' :
             S_ISLNK(mode)  ? 'l' :
             S_ISCHR(mode)  ? 'c' :
             S_ISBLK(mode)  ? 'b' :
             S_ISFIFO(mode) ? 'p' :
             S_ISSOCK(mode) ? 's' : '-';

    out[1] = (mode & S_IRUSR) ? 'r' : '-';
    out[2] = (mode & S_IWUSR) ? 'w' : '-';
    out[3] = (mode & S_ISUID) ? ((mode & S_IXUSR) ? 's' : 'S') : ((mode & S_IXUSR) ? 'x' : '-');

    out[4] = (mode & S_IRGRP) ? 'r' : '-';
    out[5] = (mode & S_IWGRP) ? 'w' : '-';
    out[6] = (mode & S_ISGID) ? ((mode & S_IXGRP) ? 's' : 'S') : ((mode & S_IXGRP) ? 'x' : '-');

    out[7] = (mode & S_IROTH) ? 'r' : '-';
    out[8] = (mode & S_IWOTH) ? 'w' : '-';
    out[9] = (mode & S_ISVTX) ? ((mode & S_IXOTH) ? 't' : 'T') : ((mode & S_IXOTH) ? 'x' : '-');

    out[10] = has_xattr ? '@' : ' ';
    out[11] = '\0';
}

void format_size(off_t size, char *out, size_t out_len) {
    const char *units[] = {"B", "K", "M", "G", "T", "P"};
    int unit_idx = 0;
    double d_size = (double)size;

    while (d_size >= 1024.0 && unit_idx < 5) {
        d_size /= 1024.0;
        unit_idx++;
    }

    if (unit_idx == 0) {
        snprintf(out, out_len, "%lld%s", (long long)size, units[unit_idx]);
    } else {
        snprintf(out, out_len, "%.1f%s", d_size, units[unit_idx]);
    }
}

char get_classify_marker(mode_t mode) {
    if (S_ISDIR(mode))  return '/';
    if (S_ISLNK(mode))  return '@';
    if (S_ISFIFO(mode)) return '|';
    if (S_ISSOCK(mode)) return '=';
    if (mode & (S_IXUSR | S_IXGRP | S_IXOTH)) return '*';
    return '\0';
}

const char *get_color(const FileEntry *entry) {
    if (!entry->stat_ok) return ANSI_RED;
    if (entry->broken_link) return ANSI_REVERSE;

    mode_t m = entry->sb.st_mode;
    if (S_ISDIR(m)) return ANSI_BLUE;
    if (S_ISLNK(m)) return ANSI_CYAN;
    if (S_ISCHR(m) || S_ISBLK(m)) return ANSI_MAGENTA;
    if (S_ISFIFO(m) || S_ISSOCK(m)) return ANSI_RED;
    if (m & (S_IXUSR | S_IXGRP | S_IXOTH)) return ANSI_GREEN;

    return "";
}

/* -------------------------------------------------------------------------
 * Sorting Engine
 * ------------------------------------------------------------------------- */
int compare_entries(const void *a, const void *b) {
    const FileEntry *ea = (const FileEntry *)a;
    const FileEntry *eb = (const FileEntry *)b;
    int result = 0;

    if (g_active_cfg->sort_size) {
        if (ea->sb.st_size < eb->sb.st_size) result = 1;
        else if (ea->sb.st_size > eb->sb.st_size) result = -1;
    } else if (g_active_cfg->sort_time) {
        if (ea->sb.st_mtime < eb->sb.st_mtime) result = 1;
        else if (ea->sb.st_mtime > eb->sb.st_mtime) result = -1;
    }

    if (result == 0) {
        result = strcoll(ea->name, eb->name);
    }

    return g_active_cfg->reverse_sort ? -result : result;
}

/* -------------------------------------------------------------------------
 * Layout & Presentation
 * ------------------------------------------------------------------------- */
void print_columns(FileEntry *entries, size_t count, const Config *cfg) {
    if (count == 0) return;

    struct winsize ws;
    int term_width = 80;
    if (ioctl(STDOUT_FILENO, TIOCGWINSZ, &ws) == 0 && ws.ws_col > 0) {
        term_width = ws.ws_col;
    }

    size_t max_len = 0;
    for (size_t i = 0; i < count; i++) {
        size_t len = strlen(entries[i].name);
        if (cfg->classify && get_classify_marker(entries[i].sb.st_mode)) len++;
        if (cfg->git_status) len += 3;
        if (len > max_len) max_len = len;
    }

    size_t col_width = max_len + 2;
    size_t num_cols = term_width / col_width;
    if (num_cols < 1) num_cols = 1;

    size_t num_rows = (count + num_cols - 1) / num_cols;

    for (size_t row = 0; row < num_rows; row++) {
        for (size_t col = 0; col < num_cols; col++) {
            size_t idx = col * num_rows + row;
            if (idx >= count) break;

            FileEntry *e = &entries[idx];
            char marker = cfg->classify ? get_classify_marker(e->sb.st_mode) : '\0';
            const char *color = cfg->colorize ? get_color(e) : "";
            const char *reset = cfg->colorize ? ANSI_RESET : "";

            int chars_printed = 0;
            if (cfg->git_status) {
                const char *gcolor = (e->git_code[0] != ' ' && e->git_code[0] != '?') ? ANSI_GREEN : ANSI_YELLOW;
                if (!cfg->colorize) gcolor = "";
                printf("%s%s%s ", gcolor, e->git_code, reset);
                chars_printed += 3;
            }

            if (marker) {
                chars_printed += printf("%s%s%c%s", color, e->name, marker, reset) - 
                                 (cfg->colorize ? (int)(strlen(color) + strlen(reset)) : 0);
            } else {
                chars_printed += printf("%s%s%s", color, e->name, reset) - 
                                 (cfg->colorize ? (int)(strlen(color) + strlen(reset)) : 0);
            }

            if (col + 1 < num_cols && (idx + num_rows) < count) {
                int pad = (int)col_width - chars_printed;
                for (int p = 0; p < pad; p++) putchar(' ');
            }
        }
        putchar('\n');
    }
}

void print_long(FileEntry *entries, size_t count, const Config *cfg) {
    char perms[12];
    char size_buf[32];
    char time_buf[64];
    char owner[64];
    char group[64];
    char alloc_buf[32];

    for (size_t i = 0; i < count; i++) {
        FileEntry *e = &entries[i];
        if (!e->stat_ok) {
            fprintf(stderr, "hls: cannot access '%s': %s\n", e->name, strerror(errno));
            continue;
        }

        format_mode(e->sb.st_mode, e->has_xattrs, perms);

        if (cfg->numeric_ids) {
            snprintf(owner, sizeof(owner), "%u", e->sb.st_uid);
            snprintf(group, sizeof(group), "%u", e->sb.st_gid);
        } else {
            struct passwd *pw = getpwuid(e->sb.st_uid);
            struct group  *gr = getgrgid(e->sb.st_gid);
            snprintf(owner, sizeof(owner), "%s", pw ? pw->pw_name : "unknown");
            snprintf(group, sizeof(group), "%s", gr ? gr->gr_name : "unknown");
        }

        if (cfg->human_sizes) {
            format_size(e->sb.st_size, size_buf, sizeof(size_buf));
        } else {
            snprintf(size_buf, sizeof(size_buf), "%lld", (long long)e->sb.st_size);
        }

        if (cfg->show_alloc) {
            long long alloc_bytes = (long long)e->sb.st_blocks * 512;
            if (e->sb.st_size > 0 && alloc_bytes < e->sb.st_size) {
                snprintf(alloc_buf, sizeof(alloc_buf), "[%lld%% sparse]", (alloc_bytes * 100) / e->sb.st_size);
            } else {
                snprintf(alloc_buf, sizeof(alloc_buf), "[%lldK blk]", (long long)e->sb.st_blocks / 2);
            }
        } else {
            alloc_buf[0] = '\0';
        }

        struct tm *tm_info = localtime(&e->sb.st_mtime);
        strftime(time_buf, sizeof(time_buf), "%b %e %H:%M", tm_info);

        char marker = cfg->classify ? get_classify_marker(e->sb.st_mode) : '\0';
        const char *color = cfg->colorize ? get_color(e) : "";
        const char *reset = cfg->colorize ? ANSI_RESET : "";

        char git_badge[16] = "";
        if (cfg->git_status) {
            const char *gcol = (e->git_code[0] != ' ' && e->git_code[0] != '?') ? ANSI_GREEN : ANSI_YELLOW;
            if (!cfg->colorize) gcol = "";
            snprintf(git_badge, sizeof(git_badge), "%s%s%s ", gcol, e->git_code, reset);
        }

        printf("%s%s %2hu %-8s %-8s %6s %-13s %s %s%s%s",
               git_badge,
               perms,
               (unsigned short)e->sb.st_nlink,
               owner,
               group,
               size_buf,
               alloc_buf,
               time_buf,
               color,
               e->name,
               reset);

        if (marker) putchar(marker);
        if (e->link_target) printf(" -> %s", e->link_target);
        if (cfg->sniff_type && e->magic_desc) {
            printf(" %s(%s)%s", cfg->colorize ? ANSI_GRAY : "", e->magic_desc, reset);
        }
        putchar('\n');

        if (cfg->show_xattr && e->has_xattrs) {
            for (size_t x = 0; x < e->xattr_count; x++) {
                printf("    %s@ %s%s\n", cfg->colorize ? ANSI_CYAN : "", e->xattr_names[x], reset);
            }
        }
    }
}

void free_entries(FileEntry *entries, size_t count) {
    for (size_t i = 0; i < count; i++) {
        free(entries[i].name);
        free(entries[i].full_path);
        free(entries[i].link_target);
        free(entries[i].magic_desc);
        if (entries[i].xattr_names) {
            for (size_t x = 0; x < entries[i].xattr_count; x++) {
                free(entries[i].xattr_names[x]);
            }
            free(entries[i].xattr_names);
        }
    }
    free(entries);
}

FileEntry *load_directory(const char *dir_path, const Config *cfg, const GitContext *git_ctx, size_t *out_count) {
    DIR *dp = opendir(dir_path);
    if (!dp) return NULL;

    size_t cap = 32;
    size_t count = 0;
    FileEntry *entries = malloc(cap * sizeof(FileEntry));
    if (!entries) {
        closedir(dp);
        return NULL;
    }

    struct dirent *dirp;
    while ((dirp = readdir(dp)) != NULL) {
        if (!cfg->show_all && dirp->d_name[0] == '.') continue;
        if (strcmp(dirp->d_name, ".") == 0 || strcmp(dirp->d_name, "..") == 0) continue;

        if (count >= cap) {
            cap *= 2;
            FileEntry *re = realloc(entries, cap * sizeof(FileEntry));
            if (!re) break;
            entries = re;
        }

        FileEntry *e = &entries[count];
        memset(e, 0, sizeof(FileEntry));
        e->name = strdup(dirp->d_name);

        char full[PATH_MAX];
        snprintf(full, sizeof(full), "%s/%s", dir_path, dirp->d_name);
        e->full_path = strdup(full);

        if (lstat(full, &e->sb) == 0) {
            e->stat_ok = true;
            if (S_ISLNK(e->sb.st_mode)) {
                char target[PATH_MAX];
                ssize_t len = readlink(full, target, sizeof(target) - 1);
                if (len != -1) {
                    target[len] = '\0';
                    e->link_target = strdup(target);
                }
                struct stat s_target;
                if (stat(full, &s_target) == -1) e->broken_link = true;
            }
            if (cfg->git_status && git_ctx) {
                lookup_git_status(git_ctx, full, e->git_code);
            }
            if (cfg->sniff_type && S_ISREG(e->sb.st_mode)) {
                e->magic_desc = sniff_magic_bytes(full);
            }
            inspect_xattrs(e);
        }
        count++;
    }
    closedir(dp);

    g_active_cfg = cfg;
    qsort(entries, count, sizeof(FileEntry), compare_entries);
    *out_count = count;
    return entries;
}

/* -------------------------------------------------------------------------
 * Tree Visualization Engine (-T)
 * ------------------------------------------------------------------------- */
void render_tree_recursive(const char *dir_path, const Config *cfg, const GitContext *git_ctx,
                           InodeNode **visited, char *prefix) {
    size_t count = 0;
    FileEntry *entries = load_directory(dir_path, cfg, git_ctx, &count);
    if (!entries) return;

    for (size_t i = 0; i < count; i++) {
        FileEntry *e = &entries[i];
        bool is_last = (i == count - 1);
        const char *branch = is_last ? "└── " : "├── ";
        const char *color = cfg->colorize ? get_color(e) : "";
        const char *reset = cfg->colorize ? ANSI_RESET : "";
        char marker = cfg->classify ? get_classify_marker(e->sb.st_mode) : '\0';

        char git_badge[16] = "";
        if (cfg->git_status) {
            const char *gcol = (e->git_code[0] != ' ' && e->git_code[0] != '?') ? ANSI_GREEN : ANSI_YELLOW;
            if (!cfg->colorize) gcol = "";
            snprintf(git_badge, sizeof(git_badge), "%s%s%s ", gcol, e->git_code, reset);
        }

        printf("%s%s%s%s%s", prefix, branch, git_badge, color, e->name);
        if (marker) putchar(marker);
        printf("%s", reset);

        if (e->link_target) printf(" -> %s", e->link_target);
        if (cfg->sniff_type && e->magic_desc) {
            printf(" %s(%s)%s", cfg->colorize ? ANSI_GRAY : "", e->magic_desc, reset);
        }
        putchar('\n');

        if (e->stat_ok && S_ISDIR(e->sb.st_mode) && !S_ISLNK(e->sb.st_mode)) {
            if (inode_visited(visited, e->sb.st_dev, e->sb.st_ino)) {
                printf("%s%s    %s[cycle detected]%s\n", prefix, is_last ? "    " : "│   ",
                       cfg->colorize ? ANSI_RED : "", reset);
                continue;
            }

            char next_prefix[PATH_MAX];
            snprintf(next_prefix, sizeof(next_prefix), "%s%s", prefix, is_last ? "    " : "│   ");
            render_tree_recursive(e->full_path, cfg, git_ctx, visited, next_prefix);
        }
    }
    free_entries(entries, count);
}

/* -------------------------------------------------------------------------
 * Directory Traversal Engine
 * ------------------------------------------------------------------------- */
void traverse_directory(const char *dir_path, const Config *cfg, bool print_dir_name) {
    GitContext git_ctx;
    if (cfg->git_status) {
        init_git_context(dir_path, &git_ctx);
    }

    if (cfg->tree_view) {
        printf("%s\n", dir_path);
        InodeNode *visited = NULL;
        struct stat root_sb;
        if (lstat(dir_path, &root_sb) == 0) {
            inode_visited(&visited, root_sb.st_dev, root_sb.st_ino);
        }
        char prefix[PATH_MAX] = "";
        render_tree_recursive(dir_path, cfg, cfg->git_status ? &git_ctx : NULL, &visited, prefix);
        free_inode_set(visited);
        if (cfg->git_status) free_git_context(&git_ctx);
        return;
    }

    size_t count = 0;
    FileEntry *entries = load_directory(dir_path, cfg, cfg->git_status ? &git_ctx : NULL, &count);
    if (!entries) {
        fprintf(stderr, "hls: cannot open directory '%s': %s\n", dir_path, strerror(errno));
        if (cfg->git_status) free_git_context(&git_ctx);
        return;
    }

    if (print_dir_name) {
        printf("%s:\n", dir_path);
    }

    if (cfg->long_format) {
        print_long(entries, count, cfg);
    } else {
        print_columns(entries, count, cfg);
    }

    if (cfg->recursive) {
        for (size_t i = 0; i < count; i++) {
            FileEntry *e = &entries[i];
            if (e->stat_ok && S_ISDIR(e->sb.st_mode) && !S_ISLNK(e->sb.st_mode)) {
                putchar('\n');
                traverse_directory(e->full_path, cfg, true);
            }
        }
    }

    free_entries(entries, count);
    if (cfg->git_status) free_git_context(&git_ctx);
}

/* -------------------------------------------------------------------------
 * Built-In Manual & Help Engine
 * ------------------------------------------------------------------------- */
void print_short_help(const char *progname) {
    printf("Usage: %s [-%saFlrRnStHM@Gs%s] [-%sh%s] [-%sm%s] [%sfile%s ...]\n",
           progname, ANSI_BOLD, ANSI_RESET, ANSI_BOLD, ANSI_RESET, ANSI_BOLD, ANSI_RESET, ANSI_UNDERLINE, ANSI_RESET);
    printf("Modern systems programmer's directory browser and APUE reference tool.\n");
    printf("Execute '%s -m' for the comprehensive manual page or -h for usage summary.\n", progname);
}

void print_manpage(bool colorize) {
    const char *b   = colorize ? ANSI_BOLD : "";
    const char *u   = colorize ? ANSI_UNDERLINE : "";
    const char *rst = colorize ? ANSI_RESET : "";

    printf("%sHLS(1)%s                   General Commands Manual                  %sHLS(1)%s\n\n", b, rst, b, rst);
    printf("%sNAME%s\n", b, rst);
    printf("     %shls%s -- hacker's directory visualizer and systems-level demonstrator\n\n", b, rst);
    printf("%sSYNOPSIS%s\n", b, rst);
    printf("     %shls%s [-%saFlrnRStHM@Gs%s] [-%sh%s] [-%sm%s] [%sfile%s ...]\n\n", b, rst, b, rst, b, rst, b, rst, u, rst);
    printf("%sDESCRIPTION%s\n", b, rst);
    printf("     %shls%s inspects POSIX file metadata, integrates low-level filesystem telemetry,\n", b, rst);
    printf("     interrogates Git status caches, and displays tree layouts and file contents.\n\n");
    printf("     Options:\n\n");
    printf("     %s-a%s      Include dotfiles in listings.\n", b, rst);
    printf("     %s-F%s      Classify entries with trailing symbols ('/', '*', '@', '|', '=').\n", b, rst);
    printf("     %s-G%s      Query working tree status via asynchronous Git pipeline batching.\n", b, rst);
    printf("     %s-h%s      Print concise usage summary.\n", b, rst);
    printf("     %s-H%s      Scale sizes using human-readable binary suffixes (base 1024).\n", b, rst);
    printf("     %s-l%s      Render long multi-column record format with permission matrices.\n", b, rst);
    printf("     %s-m%s      Output this clean manual page (ANSI stripped automatically when piped).\n", b, rst);
    printf("     %s-M%s      Sniff initial magic bytes of files to determine binary/text signatures.\n", b, rst);
    printf("     %s-n%s      Display numeric UIDs and GIDs without /etc/passwd resolution.\n", b, rst);
    printf("     %s-r%s      Invert active sorting comparison.\n", b, rst);
    printf("     %s-R%s      Recursively traverse subdirectories.\n", b, rst);
    printf("     %s-s%s      Compute disk block allocation efficiency and flag sparse storage.\n", b, rst);
    printf("     %s-S%s      Sort by logical file size descending.\n", b, rst);
    printf("     %s-t%s      Sort by modification timestamp descending.\n", b, rst);
    printf("     %s-T%s      Render hierarchical visual tree graph with cycle prevention.\n", b, rst);
    printf("     %s-@%s      Enumerate extended filesystem attributes (macOS and Linux xattrs).\n\n", b, rst);
    printf("HLS Project Suite               September 2026                         HLS(1)\n");
}

/* -------------------------------------------------------------------------
 * Driver Entry Point
 * ------------------------------------------------------------------------- */
int main(int argc, char *argv[]) {
    Config cfg = {
        .show_all = false,
        .long_format = false,
        .human_sizes = false,
        .classify = false,
        .sort_time = false,
        .sort_size = false,
        .reverse_sort = false,
        .recursive = false,
        .numeric_ids = false,
        .git_status = false,
        .show_xattr = false,
        .tree_view = false,
        .show_alloc = false,
        .sniff_type = false,
        .colorize = isatty(STDOUT_FILENO)
    };

    int opt;
    /* Synchronized optstring containing all active flags: S and M included */
    while ((opt = getopt(argc, argv, "alHFtrRnShmGM@Ts")) != -1) {
        switch (opt) {
            case 'a': cfg.show_all = true;     break;
            case 'l': cfg.long_format = true;  break;
            case 'H': cfg.human_sizes = true;  break;
            case 'F': cfg.classify = true;     break;
            case 't': cfg.sort_time = true;    break;
            case 'S': cfg.sort_size = true;    break;
            case 'r': cfg.reverse_sort = true; break;
            case 'R': cfg.recursive = true;    break;
            case 'G': cfg.git_status = true;   break;
            case 'M':
              cfg.sniff_type = true;
              cfg.long_format = true;
              break;
            case '@': cfg.show_xattr = true;   break;
            case 'T': cfg.tree_view = true;    break;
            case 's': cfg.show_alloc = true;   break;
            case 'n':
                cfg.long_format = true;
                cfg.numeric_ids = true;
                break;
            case 'h':
                print_short_help(argv[0]);
                exit(EXIT_SUCCESS);
            case 'm':
                print_manpage(isatty(STDOUT_FILENO));
                exit(EXIT_SUCCESS);
            default:
                fprintf(stderr, "Try '%s -h' for more information.\n", argv[0]);
                exit(EX_USAGE);
        }
    }

    int targets_count = argc - optind;
    if (targets_count <= 0) {
        traverse_directory(".", &cfg, false);
    } else if (targets_count == 1) {
        traverse_directory(argv[optind], &cfg, false);
    } else {
        for (int i = optind; i < argc; i++) {
            traverse_directory(argv[i], &cfg, true);
            if (i + 1 < argc) putchar('\n');
        }
    }

    return EXIT_SUCCESS;
}
