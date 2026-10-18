CC = gcc
CFLAGS = -Wall -Wextra -pedantic -std=c99 -O2
TARGET = hls
PREFIX = /usr/local
BINDIR = $(PREFIX)/bin

all: $(TARGET)

$(TARGET): hls.c
	$(CC) $(CFLAGS) -o $(TARGET) hls.c

install: $(TARGET)
	sudo install -d $(BINDIR)
	sudo install -m 755 $(TARGET) $(BINDIR)/$(TARGET)

uninstall:
	sudo rm -f $(BINDIR)/$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: all clean install uninstall
