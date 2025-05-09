const vscode = require('vscode');
// Import the whitelist from whitelist.js
let whitelist = require('./whitelist');

/**
 * Activates the extension by registering the "Copilot Optimizer" language tool.
 *
 * The tool evaluates commands against a whitelist and returns an approval status based on whether the command matches any allowed pattern. The tool is added to the extension's subscriptions for proper lifecycle management.
 */
function activate(context) {
    const tool = vscode.languageModels.createTool({
        id: 'copilot-optimizer',
        label: 'Copilot Optimizer',
        run: async (command) => {
            if (typeof command !== 'string' || !command.trim()) {
                return { status: 'deferred' };
            }
            if (isCommandAllowed(command)) {
                return { status: 'approved' };
            } else {
                return { status: 'deferred' };
            }
        }
    });

    context.subscriptions.push(tool);

    // Register the command and wrap it with context.subscriptions.push
    context.subscriptions.push(
        vscode.commands.registerCommand('copilot-optimizer', () => {
            vscode.window.showInformationMessage("Copilot Optimizer is running");
        })
    );
}

/**
 * Determines whether a command string matches any pattern in the whitelist.
 *
 * Wildcard patterns in the whitelist use `*` to match any sequence of characters.
 *
 * @param {string} command - The command string to check.
 * @returns {boolean} `true` if the command matches a whitelist pattern; otherwise, `false`.
 */
function isCommandAllowed(command) {
    if (typeof command !== 'string' || !Array.isArray(whitelist)) {
        return false;
    }
    return whitelist.some(pattern => {
        if (typeof pattern !== 'string') return false;
        const regex = new RegExp('^' + pattern.replace(/[-\/^$*+?.()|[]{}]/g, '\\$&').replace('\*', '.*') + '$');
        return regex.test(command);
    });
}

exports.activate = activate;

/**
 * Placeholder for extension deactivation logic.
 *
 * Intended for cleanup tasks when the extension is deactivated. Currently, no actions are performed.
 */
function deactivate() {
    // No cleanup needed for this extension
    // If future versions require cleanup, implement it here
    whitelist = [];
}

exports.deactivate = deactivate;
