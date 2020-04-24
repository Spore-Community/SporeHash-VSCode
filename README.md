# Spore Hash Extension for VS Code

Convert between names and FNV Hash IDs used in DBPF files for Spore, a 2008 video game from Maxis.

Resources used by the game are typically identified by IDs - 32-bit integers in hex format. These IDs are [FNV Hashes](https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function), calculated from a string name. For example, the creature model file format is "crt", which has a hash of `0x2B978C46`.

This extension provides an easy way to convert between names and hashes.

The primary use for these hashes is for naming folders (groups), files (instances), and filetypes (types) inside of DBPFs (database packed files), which normally have the extension `.package`. DBPFs hold most of the data used by Spore, and mods can also add their own DBPFs to add or modify content in the game.

This format is also used by Darkspore and SimCity (they share much of their code and design with Spore), as well as other Maxis games.

## Features

* Shows the FNV hash of selected text, in the status bar.
* Click the hash in the status bar to copy it to the clipboard.

## Download
Click "Releases" above to download the latest version. Downloads are provided as a VSIX file, which can be installed from VS Code's Extensions sidebar.

## Discord
If you need any help, join our Discord at https://discord.gg/66jVk3X

#
*Not associated with or endorsed by Electronic Arts or Maxis.*