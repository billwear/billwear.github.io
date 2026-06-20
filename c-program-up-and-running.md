# Step 1: Getting a C Program Up and Running on macOS

Gotta have a development environment. I'm using a MacBook Pro.  Your mileage may vary, consult suitable sources.

---

## 1. Command Line Tools

macOS doesn't bundle a C compiler, but there's a free Apple package called **Command Line Tools for Xcode**. Includes `clang` (the default C compiler for macOS), `make`, and other essential development utilities.

I do **not** need to install the massive, multi-gigabyte Xcode IDE from the App Store. Lightweight command-line tools work fine in the Terminal.

### Step-by-Step

1. `Cmd + Space` to get to spotlight.
2. `Terminal <Enter>'.
3. Installed the CLI Xcode kit with `xcode-select --install`.
4. Answered yes to "The xcode-select command requires the command line developer tools. Would you like to install the tools now?"
5. Clicked `Install` and agreed to the license.
6. Waited for it to finish installing.

### Verified the Installation
Used these commands to confirm that the compiler and make were ready to go:	

```bash
clang --version
<version number output>
make --version
<version number output>
```

## 2. Writing "Hello, World!"
Test the environment with a hello.c:

1. Created a dedicated directory for your C projects and navigated into it.
2. Created a new file named hello.c and typed in something like this:

```bash
#include <stdio.h>

int main(void) 
{
	printf("Hello, World!\n");
	return 0;
}
```

## 3. Building the hello program

You don't even need a Makefile for a single-file project:
	
```bash
make hello
```

make automatically looks for a file named hello.c in the current directory and invokes the compiler to build an executable named hello.

## 5. Executed the program

```bash
./hello
```


Got the expected output:

```bash
Hello, World!
```

Okay, MacBook Pro set up. Now on to real code. 