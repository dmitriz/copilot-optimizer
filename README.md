# Copilot Optimizer

## Overview

The Copilot Optimizer is a Visual Studio Code extension that integrates with GitHub Copilot Agent Mode to control the automatic approval of terminal commands. The extension registers a custom tool using the `vscode.languageModels.createTool` API to intercept terminal commands and evaluate whether they are safe to approve based on a whitelist of allowed patterns.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/dmitriz/copilot-optimizer.git
   ```

2. Navigate to the extension directory:

   ```sh
   cd copilot-optimizer
   ```

3. Install the dependencies:

   ```sh
   npm install
   ```

4. Open the extension directory in Visual Studio Code:

   ```sh
   code .
   ```

5. Press `F5` to start debugging the extension.

## Usage

To use the extension:

1. Activate the extension by running the "Copilot Optimizer" command from the Command Palette (Ctrl+Shift+P or Cmd+Shift+P)
2. Open a terminal and start using GitHub Copilot Agent Mode
3. When Copilot suggests terminal commands, the extension will automatically:
   - Approve commands that match the whitelist patterns
   - Defer other commands for your manual review

You can verify the extension is working by checking the output panel for logs showing command evaluations.

## Configuration

The whitelist patterns are stored in a separate configuration file called `whitelist.js`. The file exports an array of allowed command patterns using glob-like patterns such as 'npm install *', 'mkdir*', etc.

### Example `whitelist.js`

```js
module.exports = [
    'npm install *',
    'mkdir *',
    'git clone *',
    //'rm -rf *', // VERY DANGEROUS - DO NOT UNCOMMENT UNLESS YOU KNOW WHAT YOU ARE DOING
    'touch *',
    'echo *',
    'cp *',
    'mv *',
    'ls *',
    'cat *'
];
```

You can modify the `whitelist.js` file to add or remove command patterns as needed.
