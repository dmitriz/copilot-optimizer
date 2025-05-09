const vscode = require('vscode');
// No direct import here
let whitelist = [];

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
}

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

function deactivate() {
    // No cleanup needed for this extension
    // If future versions require cleanup, implement it here
    whitelist = [];
}

exports.deactivate = deactivate;
