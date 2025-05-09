const vscode = require('vscode');
const whitelist = require('./whitelist');

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
            if (isCommandAllowed(command)) {
                return { status: 'approved' };
            } else {
                return { status: 'deferred' };
            }
        }
    });

    context.subscriptions.push(tool);
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
    return whitelist.some(pattern => {
        const regex = new RegExp('^' + pattern.replace('*', '.*') + '$');
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
    // Clean up resources if needed
}

exports.deactivate = deactivate;
