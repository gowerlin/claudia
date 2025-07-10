# WSL Support for Claude Code in Claudia

This document describes the Windows Subsystem for Linux (WSL) support added to Claudia for running Claude Code.

## Overview

Windows users can now use Claude Code installed in their WSL distributions through Claudia. This feature automatically detects Claude installations across all WSL distributions and makes them available in the Claude version selector.

## Features

### Automatic Detection
- Claudia automatically scans all installed WSL distributions for Claude Code installations
- Detects Claude in the default WSL distribution and all named distributions
- Shows version information when available

### Seamless Integration
- WSL installations appear in the Claude version selector alongside native Windows installations
- Commands are automatically routed through WSL when a WSL installation is selected
- Environment variables are properly passed through to the WSL environment

### UI Indicators
- WSL installations are clearly marked with a server icon and "WSL" badge
- The distribution name is shown in the installation details
- Orange color scheme distinguishes WSL installations from other types

## How It Works

### Detection Process
1. Claudia checks if WSL is installed by running `wsl --list --quiet`
2. For each distribution found, it runs `wsl which claude` to check for Claude
3. If found, it retrieves the version using `wsl claude --version`
4. All found installations are added to the available installations list

### Execution
When a WSL installation is selected:
1. Commands are prefixed with `wsl` (and `-d <distribution>` if not default)
2. The Claude path within WSL is used (e.g., `/usr/local/bin/claude`)
3. All arguments and environment variables are properly passed through

### Path Format
WSL installations use a special path format:
```
wsl:<distribution>:<path>
```
For example:
- `wsl:default:/usr/local/bin/claude` - Claude in the default distribution
- `wsl:Ubuntu-22.04:/home/user/.local/bin/claude` - Claude in a specific distribution

## Requirements

- Windows 10 version 2004 or higher, or Windows 11
- WSL 2 installed and configured
- At least one WSL distribution installed
- Claude Code installed within the WSL distribution

## Installation

1. Install WSL if not already installed:
   ```powershell
   wsl --install
   ```

2. Install Claude Code in your WSL distribution:
   ```bash
   # Inside WSL
   npm install -g claude-code
   # or
   curl -fsSL https://claude.ai/install.sh | sh
   ```

3. Launch Claudia and select your WSL installation from the Claude version selector

## Troubleshooting

### WSL installations not showing up
- Ensure WSL is properly installed: `wsl --status`
- Check that Claude is in the PATH within WSL: `wsl which claude`
- Try restarting Claudia after installing Claude in WSL

### Version not detected
- Some WSL configurations may not properly report version information
- This doesn't affect functionality - the installation will still work

### Performance considerations
- WSL adds a small overhead compared to native Windows execution
- For best performance, use the bundled Claude Code version when available

## Future Enhancements

- Support for selecting specific WSL distributions in settings
- Remote SSH and Docker container support
- WSL 1 compatibility (currently only WSL 2 is tested)

## Technical Details

The implementation includes:
- `InstallationType::Wsl` enum variant for identifying WSL installations
- `find_wsl_installations()` function for detecting Claude in all distributions
- `create_wsl_command()` function for creating properly formatted WSL commands
- UI updates to display WSL installations with appropriate icons and badges

All WSL-specific code is conditionally compiled for Windows only using `#[cfg(target_os = "windows")]`.