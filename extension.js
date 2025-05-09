const vscode = require('vscode');
const whitelist = require('./whitelist');

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

function isCommandAllowed(command) {
    return whitelist.some(pattern => {
        const regex = new RegExp('^' + pattern.replace('*', '.*') + '$');
        return regex.test(command);
    });
}

exports.activate = activate;

function deactivate() {
    // Clean up resources if needed
}

exports.deactivate = deactivate;
