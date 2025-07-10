<div align="center">
  <img src="https://github.com/user-attachments/assets/92fd93ed-e71b-4b94-b270-50684323dd00" alt="Claudia Logo" width="120" height="120">

  <a href="https://claudiacode.com"><h1>Claudia</h1></a>
  
  <p>
    <strong>A powerful GUI app and Toolkit for Claude Code</strong>
  </p>
  <p>
    <strong>Create custom agents, manage interactive Claude Code sessions, run secure background agents, and more.</strong>
  </p>
  
  <p>
    <a href="#features"><img src="https://img.shields.io/badge/Features-✨-blue?style=for-the-badge" alt="Features"></a>
    <a href="#installation"><img src="https://img.shields.io/badge/Install-🚀-green?style=for-the-badge" alt="Installation"></a>
    <a href="#usage"><img src="https://img.shields.io/badge/Usage-📖-purple?style=for-the-badge" alt="Usage"></a>
    <a href="#development"><img src="https://img.shields.io/badge/Develop-🛠️-orange?style=for-the-badge" alt="Development"></a>
  </p>
</div>

![457013521-6133a738-d0cb-4d3e-8746-c6768c82672c](https://github.com/user-attachments/assets/a028de9e-d881-44d8-bae5-7326ab3558b9)

https://github.com/user-attachments/assets/bf0bdf9d-ba91-45af-9ac4-7274f57075cf

> [!TIP]
> **⭐ Star the repo and follow [@getAsterisk](https://x.com/getAsterisk) on X for early access to `asteria-swe-v0`**.

## 🌟 Overview

**Claudia** is a powerful desktop application that transforms how you interact with Claude Code. Built with Tauri 2, it provides a beautiful GUI for managing your Claude Code sessions, creating custom agents, tracking usage, and much more.

Think of Claudia as your command center for Claude Code - bridging the gap between the command-line tool and a visual experience that makes AI-assisted development more intuitive and productive.

## 🆕 Recent Updates

### Version 1.1.0 - Latest Improvements

🔧 **Windows 編譯問題修正**
- 解決了在 Windows 環境下的編譯相依性問題
- 優化了 Tauri 2 在 Windows 平台的建置流程
- 改善了 WebView2 整合的穩定性

🌐 **國際化支援 (i18n)**
- 新增繁體中文語系支援
- 實現動態語言切換功能
- 完整的中英文界面翻譯

📊 **日誌系統增強**
- 新增 log file 輸出功能，方便開發者除錯
- 實現結構化日誌記錄
- 支援多層級日誌等級控制

💻 **Windows 與 Claude Code 整合改善**
- 修正在 Windows 環境下與 Claude Code CLI 的相容性問題
- 改善 POSIX shell 環境的處理機制
- 優化 Git Bash 和 PowerShell 的支援

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [🆕 Recent Updates](#-recent-updates)
  - [Version 1.1.0 - Latest Improvements](#version-110---latest-improvements)
- [📋 Table of Contents](#-table-of-contents)
- [✨ Features](#-features)
  - [🗂️ **Project \& Session Management**](#️-project--session-management)
  - [🤖 **CC Agents**](#-cc-agents)
  - [📊 **Usage Analytics Dashboard**](#-usage-analytics-dashboard)
  - [🔌 **MCP Server Management**](#-mcp-server-management)
  - [⏰ **Timeline \& Checkpoints**](#-timeline--checkpoints)
  - [📝 **CLAUDE.md Management**](#-claudemd-management)
  - [🌐 **國際化支援 (Internationalization)**](#-國際化支援-internationalization)
  - [📊 **增強日誌系統 (Enhanced Logging)**](#-增強日誌系統-enhanced-logging)
- [📖 Usage](#-usage)
  - [Getting Started](#getting-started)
  - [Managing Projects](#managing-projects)
  - [Creating Agents](#creating-agents)
  - [Tracking Usage](#tracking-usage)
  - [Working with MCP Servers](#working-with-mcp-servers)
- [🚀 Installation](#-installation)
  - [Prerequisites](#prerequisites)
  - [Release Executables Will Be Published Soon](#release-executables-will-be-published-soon)
- [🔨 Build from Source](#-build-from-source)
  - [Prerequisites](#prerequisites-1)
    - [System Requirements](#system-requirements)
    - [Required Tools](#required-tools)
    - [Platform-Specific Dependencies](#platform-specific-dependencies)
  - [Build Steps](#build-steps)
  - [Troubleshooting](#troubleshooting)
    - [Common Issues](#common-issues)
    - [Verify Your Build](#verify-your-build)
  - [Build Artifacts](#build-artifacts)
- [🛠️ Development](#️-development)
  - [Tech Stack](#tech-stack)
  - [Recent Technical Improvements](#recent-technical-improvements)
  - [Project Structure](#project-structure)
  - [Development Commands](#development-commands)
- [🔒 Security](#-security)
- [🤝 Contributing](#-contributing)
  - [Areas for Contribution](#areas-for-contribution)
- [📄 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)
- [Star History](#star-history)

## ✨ Features

### 🗂️ **Project & Session Management**
- **Visual Project Browser**: Navigate through all your Claude Code projects in `~/.claude/projects/`
- **Session History**: View and resume past coding sessions with full context
- **Smart Search**: Find projects and sessions quickly with built-in search
- **Session Insights**: See first messages, timestamps, and session metadata at a glance

### 🤖 **CC Agents**
- **Custom AI Agents**: Create specialized agents with custom system prompts and behaviors
- **Agent Library**: Build a collection of purpose-built agents for different tasks
- **Background Execution**: Run agents in separate processes for non-blocking operations
- **Execution History**: Track all agent runs with detailed logs and performance metrics



### 📊 **Usage Analytics Dashboard**
- **Cost Tracking**: Monitor your Claude API usage and costs in real-time
- **Token Analytics**: Detailed breakdown by model, project, and time period
- **Visual Charts**: Beautiful charts showing usage trends and patterns
- **Export Data**: Export usage data for accounting and analysis

### 🔌 **MCP Server Management**
- **Server Registry**: Manage Model Context Protocol servers from a central UI
- **Easy Configuration**: Add servers via UI or import from existing configs
- **Connection Testing**: Verify server connectivity before use
- **Claude Desktop Import**: Import server configurations from Claude Desktop

### ⏰ **Timeline & Checkpoints**
- **Session Versioning**: Create checkpoints at any point in your coding session
- **Visual Timeline**: Navigate through your session history with a branching timeline
- **Instant Restore**: Jump back to any checkpoint with one click
- **Fork Sessions**: Create new branches from existing checkpoints
- **Diff Viewer**: See exactly what changed between checkpoints

### 📝 **CLAUDE.md Management**
- **Built-in Editor**: Edit CLAUDE.md files directly within the app
- **Live Preview**: See your markdown rendered in real-time
- **Project Scanner**: Find all CLAUDE.md files in your projects
- **Syntax Highlighting**: Full markdown support with syntax highlighting

### 🌐 **國際化支援 (Internationalization)**
- **多語言界面**: 支援英文 (English) 和繁體中文 (Traditional Chinese)
- **動態切換**: 無需重啟即可切換語言
- **完整翻譯**: 所有界面元素和訊息都已本地化
- **語言記憶**: 自動記住使用者的語言偏好設定

### 📊 **增強日誌系統 (Enhanced Logging)**
- **檔案輸出**: 自動將日誌寫入檔案，方便除錯分析
- **結構化記錄**: 包含時間戳、等級、組件等詳細資訊
- **多層級支援**: DEBUG、INFO、WARN、ERROR 等不同等級
- **開發除錯**: 特別針對 Windows 環境問題提供詳細日誌

## 📖 Usage

### Getting Started

1. **Launch Claudia**: Open the application after installation
2. **Welcome Screen**: Choose between CC Agents or CC Projects
3. **First Time Setup**: Claudia will automatically detect your `~/.claude` directory

### Managing Projects

```
CC Projects → Select Project → View Sessions → Resume or Start New
```

- Click on any project to view its sessions
- Each session shows the first message and timestamp
- Resume sessions directly or start new ones

### Creating Agents

```
CC Agents → Create Agent → Configure → Execute
```

1. **Design Your Agent**: Set name, icon, and system prompt
2. **Configure Model**: Choose between available Claude models
3. **Set Permissions**: Configure file read/write and network access
4. **Execute Tasks**: Run your agent on any project

### Tracking Usage

```
Menu → Usage Dashboard → View Analytics
```

- Monitor costs by model, project, and date
- Export data for reports
- Set up usage alerts (coming soon)

### Working with MCP Servers

```
Menu → MCP Manager → Add Server → Configure
```

- Add servers manually or via JSON
- Import from Claude Desktop configuration
- Test connections before using

## 🚀 Installation

### Prerequisites

- **Claude Code CLI**: Install from [Claude's official site](https://claude.ai/code)

### Release Executables Will Be Published Soon

## 🔨 Build from Source

### Prerequisites

Before building Claudia from source, ensure you have the following installed:

#### System Requirements

- **Operating System**: Windows 10/11, macOS 11+, or Linux (Ubuntu 20.04+)
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: At least 1GB free space

#### Required Tools

1. **Rust** (1.70.0 or later)
   ```bash
   # Install via rustup
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

2. **Bun** (latest version)
   ```bash
   # Install bun
   curl -fsSL https://bun.sh/install | bash
   ```

3. **Git**
   ```bash
   # Usually pre-installed, but if not:
   # Ubuntu/Debian: sudo apt install git
   # macOS: brew install git
   # Windows: Download from https://git-scm.com
   ```

4. **Claude Code CLI**
   - Download and install from [Claude's official site](https://claude.ai/code)
   - Ensure `claude` is available in your PATH

#### Platform-Specific Dependencies

**Linux (Ubuntu/Debian)**
```bash
# Install system dependencies
sudo apt update
sudo apt install -y \
  libwebkit2gtk-4.1-dev \
  libgtk-3-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev \
  patchelf \
  build-essential \
  curl \
  wget \
  file \
  libssl-dev \
  libxdo-dev \
  libsoup-3.0-dev \
  libjavascriptcoregtk-4.1-dev
```

**macOS**
```bash
# Install Xcode Command Line Tools
xcode-select --install

# Install additional dependencies via Homebrew (optional)
brew install pkg-config
```

**Windows**
- Install [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
- Install [WebView2](https://developer.microsoft.com/microsoft-edge/webview2/) (usually pre-installed on Windows 11)
- **推薦**: 使用 Git Bash 作為終端環境
- **詳細設定**: 請參閱 [Windows 安裝指南](docs/WINDOWS_INSTALLATION.md)

> **🪟 Windows 使用者須知**
> 
> **✅ 最新改善**：我們已大幅改善 Windows 平台的支援！
> 
> Claudia 在 Windows 上需要 POSIX shell 環境來執行 Claude Code CLI。經過最新優化：
> 
> 1. **編譯問題修正**：解決了 Tauri 2 在 Windows 的建置問題
> 2. **Claude Code 整合改善**：修正與 Claude Code CLI 的相容性
> 3. **多終端支援**：更好地支援 Git Bash、PowerShell 和 WSL
> 4. **日誌除錯**：新增 log 輸出，方便診斷 Windows 特有問題
> 
> **推薦設定**：
> - 安裝 Git for Windows (包含 Git Bash)
> - 使用 Git Bash 作為主要終端
> - 設定必要的環境變數
> 
> 完整的 Windows 設定說明請參考：
> - 📖 [詳細安裝指南](docs/WINDOWS_INSTALLATION.md)
> - 🔧 [環境變數設定](docs/WINDOWS_ENVIRONMENT_SETUP.md)  
> - ⚡ [快速參考卡](docs/WINDOWS_QUICK_REFERENCE.md)
> - 🔍 [WSL 支援說明](docs/WSL_SUPPORT.md)

### Build Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/getAsterisk/claudia.git
   cd claudia
   ```

2. **Install Frontend Dependencies**
   ```bash
   bun install
   ```

3. **Build the Application**
   
   **For Development (with hot reload)**
   ```bash
   bun run tauri dev
   ```
   
   **For Production Build**
   ```bash
   # Build the application
   bun run tauri build
   
   # The built executable will be in:
   # - Linux: src-tauri/target/release/bundle/
   # - macOS: src-tauri/target/release/bundle/
   # - Windows: src-tauri/target/release/bundle/
   ```

4. **Platform-Specific Build Options**
   
   **Debug Build (faster compilation, larger binary)**
   ```bash
   bun run tauri build --debug
   ```
   
   **Build without bundling (creates just the executable)**
   ```bash
   bun run tauri build --no-bundle
   ```
   
   **Universal Binary for macOS (Intel + Apple Silicon)**
   ```bash
   bun run tauri build --target universal-apple-darwin
   ```

### Troubleshooting

#### Common Issues

1. **"cargo not found" error**
   - Ensure Rust is installed and `~/.cargo/bin` is in your PATH
   - Run `source ~/.cargo/env` or restart your terminal

2. **Linux: "webkit2gtk not found" error**
   - Install the webkit2gtk development packages listed above
   - On newer Ubuntu versions, you might need `libwebkit2gtk-4.0-dev`

3. **Windows: "MSVC not found" error**
   - Install Visual Studio Build Tools with C++ support
   - Restart your terminal after installation

4. **"claude command not found" error**
   - Ensure Claude Code CLI is installed and in your PATH
   - Test with `claude --version`

5. **Build fails with "out of memory"**
   - Try building with fewer parallel jobs: `cargo build -j 2`
   - Close other applications to free up RAM

#### Verify Your Build

After building, you can verify the application works:

```bash
# Run the built executable directly
# Linux/macOS
./src-tauri/target/release/claudia

# Windows
./src-tauri/target/release/claudia.exe
```

### Build Artifacts

The build process creates several artifacts:

- **Executable**: The main Claudia application
- **Installers** (when using `tauri build`):
  - `.deb` package (Linux)
  - `.AppImage` (Linux)
  - `.dmg` installer (macOS)
  - `.msi` installer (Windows)
  - `.exe` installer (Windows)

All artifacts are located in `src-tauri/target/release/bundle/`.

## 🛠️ Development

### Tech Stack

- **Frontend**: React 18 + TypeScript + Vite 6
- **Backend**: Rust with Tauri 2
- **UI Framework**: Tailwind CSS v4 + shadcn/ui
- **Database**: SQLite (via rusqlite)
- **Package Manager**: Bun
- **Internationalization**: i18next for React
- **Logging**: Custom structured logging system

### Recent Technical Improvements

🔧 **Windows 平台優化**
- 修正 Tauri 2 在 Windows 環境的建置問題
- 改善 WebView2 整合和相依性管理
- 優化 Claude Code CLI 在 Windows 的執行環境

🌐 **國際化架構**
- 整合 i18next 國際化框架
- 實現動態語言切換機制
- 完整的中英文翻譯資源管理

📊 **日誌系統重構**
- 實現結構化日誌輸出到檔案
- 支援不同環境的日誌等級控制
- 特別針對跨平台相容性問題的除錯支援

### Project Structure

```
claudia/
├── src/                   # React frontend
│   ├── components/        # UI components
│   ├── lib/               # API client & utilities
│   └── assets/            # Static assets
├── src-tauri/             # Rust backend
│   ├── src/
│   │   ├── commands/      # Tauri command handlers
│   │   ├── checkpoint/    # Timeline management
│   │   └── process/       # Process management
│   └── tests/             # Rust test suite
└── public/                # Public assets
```

### Development Commands

```bash
# Start development server
bun run tauri dev

# Run frontend only
bun run dev

# Type checking
bunx tsc --noEmit

# Run Rust tests
cd src-tauri && cargo test

# Format code
cd src-tauri && cargo fmt
```

## 🔒 Security

Claudia prioritizes your privacy and security:

1. **Process Isolation**: Agents run in separate processes
2. **Permission Control**: Configure file and network access per agent
3. **Local Storage**: All data stays on your machine
4. **No Telemetry**: No data collection or tracking
5. **Open Source**: Full transparency through open source code

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Areas for Contribution

- 🐛 Bug fixes and improvements
- ✨ New features and enhancements
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- 🧪 Test coverage
- 🌐 Internationalization (more languages support)
- 💻 Platform-specific optimizations (especially Windows)
- 📊 Logging and debugging improvements

## 📄 License

This project is licensed under the AGPL License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Tauri](https://tauri.app/) - The secure framework for building desktop apps
- [Claude](https://claude.ai) by Anthropic

---

<div align="center">
  <p>
    <strong>Made with ❤️ by the <a href="https://asterisk.so/">Asterisk</a></strong>
  </p>
  <p>
    <a href="https://github.com/getAsterisk/claudia/issues">Report Bug</a>
    ·
    <a href="https://github.com/getAsterisk/claudia/issues">Request Feature</a>
  </p>
</div>


## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=getAsterisk/claudia&type=Date)](https://www.star-history.com/#getAsterisk/claudia&Date)
