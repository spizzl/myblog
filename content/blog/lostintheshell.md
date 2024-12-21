+++
title = 'Lost in the Shell? Github Copilot CLI Came to help you!'
date = 2024-07-11T22:57:17+02:00
draft = false
+++

![alt](/images/lostintheshell/shell.jpg)
### Propably you are already familiar with the problem:


As a hacker, that you are, you want to make the most within the shell but sometimes you end up not knowing how a certain task can be easily done. You know that in your back of your head but you just forgot.

Well, gladly Github Copilot comes for you to help out.

### Step 0: Installing

If you are like me in Arch Linux you can install the cli tool simply by typing

```bash
git clone https://aur.archlinux.org/packages/github-copilot-cli
cd github-copilot-cli
makepkg -si
```

In order to authenticate with your Github Account type

```bash
github-copilot-cli auth
```

Now in order to add the tool to my path i added 
```bash
# .zshrc
eval "$(github-copilot-cli alias -- "$0")"
```
to my .zshrc file or your resource file of your choice. And now you are ready to go....

### 1. Getting to know the Tool

Lets start up with something easy. I want to look for every file with the ending ".tmp" in my home directory and want to directly delete it. A command that you should already be familiar with. 

In order order to ask copilot for the command you just promt it with

```bash
[fuzzywood$] gh? "run a command that searches my homedirectory for files that end with *.tmp and remove it"

```
And The magic happens...

```bash
 ──────────────────── Command ────────────────────

find ~ -name "*.tmp" -exec rm {} \;

 ────────────────── Explanation ──────────────────

○ find is used to list files.
  ◆ ~ specifies that we start the search in the home directory of the current user.
  ◆ -name "*.tmp" stipulates that we search for files ending in .tmp.
  ◆ -exec rm {} \; executes the rm command for each file found.
    ◇ {} is replaced by the file name.
    ◇ \; specifies the end of the command to execute.

  ✅ Run this command
  📝 Revise query
❯ ❌ Cancel
```

### 2. Spicing things up
Now lets try to alter the request...

```bash
 ───────────────────── Query ─────────────────────

1) run a command that searches my homedirectory for files that end with2) the letters can be lowercase as well as uppercase also count the files that where
*.tmp and remove it                                                    deleted and print it out

 ──────────────────── Command ────────────────────

find ~ -iname "*.tmp" -exec rm {} \; -exec echo {} \; | wc -l

 ────────────────── Explanation ──────────────────

○ find is used to list files.
  ◆ ~ specifies that we start the search in the home directory.
  ◆ -iname "*.tmp" specifies that we search for files ending in .tmp case-insensitively.
  ◆ -exec rm {} \; executes the rm command for each file found.
    ◇ {} is replaced by the file name.
    ◇ \; specifies the end of the command.
  ◆ -exec echo {} \; executes the echo command for each file found.
    ◇ {} is replaced by the file name.
    ◇ \; specifies the end of the command.
○ | wc -l counts the number of lines in the output of the previous command.

  ✅ Run this command
❯ 📝 Revise query
  ❌ Cancel
```
And Et voilà! We have the command exactly how we want it. The command can now be executed exatly the way we wanted it

### 3. Pushing the Limits

Now we want to try to push the tool until its limits. So lets try the following:

```bash
[fuzzywood$] gh? "Please search for every file in my home directory and output the results in a csv sheet with the following rows:
horizontal rule
incresing File id,
File Name,
Permissions,
Name of the Subfolder, 
first line of content if it is readable.horizontal rule
The CSC File is placed directly in the home folder."
```
we get the following:
```bash
──────────────────── Command ────────────────────

Sorry. GitHub Copilot doesnt know how to do that.

  📝 Revise query
❯ ❌ Cancel
```
So that must be the limit of that tool, so certainly we cannot do everything and are limited to some capacities. But is that really the End now? Lets try to shrink it down a little bit:


```bash
[fuzzywood$] gh? "Please search for every file in my home directory and output the results in a csv sheetcalled "results.csv" with the following rows:
File Name,
Permissions,
Name of the Subfolder"
```

So as you can see we cut off some parts from the original prompt in order to concentrate on the important part.

```bash
 ──────────────────── Command ────────────────────

find ~ -type f -exec stat -c "%n,%A,%d" {} \; > results.csv

 ────────────────── Explanation ──────────────────

○ find is used to list files.
  ◆ ~ specifies that we start the search in the home directory.
  ◆ -type f specifies that we only want to list files, not directories.
  ◆ -exec specifies that we want to execute a command for each file found.
    ◇ stat -c "%n,%A,%d" {} prints the file name, permissions, and device number.
  ◆ \; specifies the end of the command to execute.
○ > results.csv redirects the output of the find command to a file called results.csv.

❯ ✅ Run this command
  📝 Revise query
  ❌ Cancel
```
What a suprise we are actually presented with sort of a result and the File also looks quiet promising.

```bash
[fuzzywood$] tail results.csv -n 4 
/home/fuzzywood/.nuget/packages/microsoft.extensions.apidescription.server/6.0.5/tools/dotnet-getdocument.deps.json,-rwxr--r--,65024
/home/fuzzywood/.nuget/NuGet/NuGet.Config,-rw-------,65024
/home/fuzzywood/.viminfo,-rw-------,65024
/home/fuzzywood/RiceInstaller,-rwxr--r--,65024
```
As you can see, the last row was halucinated as the device id each time which sould have been the name from the supfolder.

I could also propably fix that by trying to revise the query over and over again but i think you see my point here.

## 4. Conclusion
Copilot is a also in the cli your friend and can help you in need. Things that often requiere a google search can now be fixed within the shell.

I still recommend using the man pages and reading the docs as you should as a brave hacker. Because there are beeing written for a reason. Copilot should alway be seen as tool that gives tips to you and helps you understand the shell.

For me personally it is very useful to refresh old knowledge and help me mastering the shell, so that one day i can rely on my own knowledge, rather than on copilot.

### Have a wonderful day you all!

