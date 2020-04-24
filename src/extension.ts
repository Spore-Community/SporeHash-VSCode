import * as vscode from 'vscode';

let statusBarHash: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {

	// Status bar click
	context.subscriptions.push(vscode.commands.registerCommand('sporehash.copySelectionHash', () => {
		let hashString = copySelectionHashString();
		vscode.window.showInformationMessage(`Copied Spore Hash ${hashString} to clipboard.`);
	}));

	// Create status bar item
	statusBarHash = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);
	statusBarHash.command = 'sporehash.copySelectionHash';
	context.subscriptions.push(statusBarHash);

	// Register listener to update status bar
	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarHash));
	context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarHash));
}

/**
 * Calculates the Spore FNV hash for the specified string.
 * @param text the string to calculate a hash for
 * @returns the hash
 */
function calculateHash(text: string): number {
	let hash = 0x811C9DC5;
	[...text].forEach(letter => {
		hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
		hash ^= letter.toLowerCase().charCodeAt(0);
	});
	return hash;
}

/**
 * Calculates the Spore FNV hash for the current selected text in the editor.
 * @returns the hash, or undefined if no editor is active
 */
function calculateSelectionHash(): number | undefined {
	let editor = vscode.window.activeTextEditor;
	if (editor !== undefined) {
		let selection = editor?.selection;
		if (!selection.isEmpty) {
			let text = editor?.document.getText(selection);
			let hash = calculateHash(text);
			return hash;
		}
	}
}

/**
 * Calculates the Spore FNV hash for the current selected text in the editor, and returns it as a hex string.
 * @returns the hash as a hex string, or undefined if no editor is active
 */
function calculateSelectionHashString(): string | undefined {
	let hash = calculateSelectionHash();
	let hexString = hash?.toString(16).toUpperCase();
	return hexString;
}

/**
 * Calculates the Spore FNV hash for the current selected text in the editor, and copies it to the clipboard.
 * @returns the hash as a hex string, or undefined if no editor is active
 */
function copySelectionHashString(): string | undefined {
	let hashString = calculateSelectionHashString();
	if (hashString !== undefined) {
		vscode.env.clipboard.writeText(hashString);
	}
	return hashString;
}

/**
 * Updates the hash in the status bar.
 */
function updateStatusBarHash(): void {
	let hashString = calculateSelectionHashString();
	if (hashString !== undefined) {
		// Add space in middle for readability
		let word1 = hashString.substr(0,4);
		let word2 = hashString.substr(4,4);
		statusBarHash.text = `Spore Hash: ${word1} ${word2}`;
		statusBarHash.show();
	} else {
		statusBarHash.hide();
	}
}