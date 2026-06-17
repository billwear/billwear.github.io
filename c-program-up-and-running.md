# Step 1: Getting a C Program Up and Running on macOS

Before you can write and compile C programs, you need to set up your development environment. This guide will take you from an out-of-the-box MacBook Pro to compiling and running your very first C program.

---

## 1. Installing the Command Line Tools

macOS doesn't come with a C compiler pre-installed, but Apple provides a free package called **Command Line Tools for Xcode**. This package includes `clang` (the default C compiler for macOS), `make`, and other essential development utilities.

You do **not** need to install the massive, multi-gigabyte Xcode IDE from the App Store. We can install just the lightweight command-line tools via the Terminal.

### Step-by-Step Installation:
1. Open the **Terminal** app (Press `Cmd + Space` to open Spotlight, type "Terminal", and press `Enter`).
2. Type the following command and press `Enter`:

```bash
xcode-select --install
```

3. A software update popup window will appear asking: "The xcode-select command requires the command line developer tools. Would you like to install the tools now?"
4. Click Install and agree to the License Agreement.
5. Wait for the download and installation to complete.

### Verify the Installation
To confirm that your compiler and make utility are ready to go, run these two commands in your Terminal:	
	```bash
	clang --version
	```

(You should see output indicating the Apple clang version.)
	```bash
	make --version
	```

(You should see output indicating GNU Make.)

## 2. Choosing a Text Editor
To write C code, you need a plain text editor. Do not use generic word processors like TextEdit or Microsoft Word, as they inject hidden formatting characters that break code compilation. Popular, lightweight choices for modern development on macOS include:

• VS Code (Visual Studio Code): Highly customizable with excellent C/C++ extensions.
• Terminal Editors (Emacs / Vim): Ideal if you prefer staying entirely within the command line and keyboard-driven workflows.

Pick your preferred editor, install it, and you're ready to write some code.

## 3. Writing "Hello, World!"
Now let's test the environment by creating a classic "Hello, World!" program.

1. In your Terminal, create a dedicated directory for your C projects and navigate into it: mkdir -p ~/Developer/c_projects cd ~/Developer/c_projects
2. Create and open a new file named hello.c using your text editor.
3. Paste the following C source code into the file:
	```bash
	#include <stdio.h>

	int main(void) 
	{
		printf("Hello, World!\n");
		return 0;
	}
	```

4. Save and close the file.

## 4. Compiling and Running
C is a compiled language. This means your human-readable .c file must be translated into a machine-readable binary executable before it can run.

### Method A: Compiling Directly with Clang
To compile your file directly, use the compiler command in the Terminal:
	```bash
	clang hello.c -o hello
	```

• clang: Calls the compiler.
• hello.c: Specifies the source code file.
• -o hello: Tells the compiler to output a binary file named hello (instead of the default a.out).

### Method B: Compiling with Make (Faster)
Because macOS includes make, you can take advantage of its built-in implicit rules for C. You don't even need a Makefile for a single-file project. Simply type:
	```bash
	make hello
	```

make automatically looks for a file named hello.c in the current directory and invokes the compiler to build an executable named hello.

## 5. Executing the Program
Once compiled by either method, you will see a new executable file named hello in your folder. Run it by typing:
	```bash
	./hello
	```

(The ./ tells the Terminal to look for the executable in the current directory.)

### Expected Output:
	```bash
	Hello, World!
	```

If you see that output on your screen, your MacBook Pro is officially configured for C development! You are ready to move on to building more complex applications.
