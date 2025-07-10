# Claudia Windows 安裝和設定指南

## 📋 概述

本指南將幫助您在 Windows 環境下安裝和設定 Claudia，包括使用 Git Bash 的詳細步驟。

## 🛠️ 系統要求

### 最低要求
- **作業系統**: Windows 10 版本 1903 或更高版本
- **記憶體**: 4GB RAM (建議 8GB)
- **硬碟空間**: 2GB 可用空間
- **網路連線**: 用於下載依賴項目

### 必需軟體
- **Node.js** 18.0.0 或更高版本
- **Rust** 1.70.0 或更高版本
- **Git** (包含 Git Bash)
- **Claude Code CLI** 1.0.41 或更高版本

## 🚀 安裝步驟

### 第 1 步：安裝必需的軟體

#### 1.1 安裝 Git (包含 Git Bash)

1. **下載 Git**
   - 前往 [Git 官方網站](https://git-scm.com/download/win)
   - 下載最新版本的 Git for Windows

2. **安裝 Git**
   ```bash
   # 下載完成後，執行安裝程式
   # 建議設定選項：
   - ✅ Use Git from Git Bash only (安全選項)
   - ✅ Checkout Windows-style, commit Unix-style line endings
   - ✅ Use Windows' default console window
   ```

3. **驗證安裝**
   ```bash
   # 開啟 Git Bash，執行：
   git --version
   # 應該顯示類似：git version 2.43.0.windows.1
   ```

#### 1.2 安裝 Node.js

1. **下載並安裝 Node.js**
   - 前往 [Node.js 官方網站](https://nodejs.org/)
   - 下載 LTS 版本 (建議)
   - 執行安裝程式，使用預設設定

2. **驗證安裝**
   ```bash
   # 在 Git Bash 中執行：
   node --version
   npm --version
   # 應該顯示版本號
   ```

#### 1.3 安裝 Bun (推薦的套件管理器)

```bash
# 在 Git Bash 中執行：
curl -fsSL https://bun.sh/install | bash

# 重新啟動 Git Bash 或執行：
source ~/.bashrc

# 驗證安裝
bun --version
```

#### 1.4 安裝 Rust

1. **使用 rustup 安裝**
   ```bash
   # 在 Git Bash 中執行：
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   
   # 選擇預設安裝 (選項 1)
   # 安裝完成後，重新啟動 Git Bash
   ```

2. **驗證安裝**
   ```bash
   rustc --version
   cargo --version
   ```

#### 1.5 安裝 Claude Code CLI

1. **使用 npm 安裝**
   ```bash
   # 在 Git Bash 中執行：
   npm install -g @anthropic-ai/claude-code@1.0.41
   ```

2. **驗證安裝**
   ```bash
   claude-code --version
   # 應該顯示：1.0.41
   ```

3. **設定 Claude API Key**
   ```bash
   # 設定 API Key (替換為您的實際 API Key)
   claude-code auth login
   # 或直接設定環境變數：
   export ANTHROPIC_API_KEY="your-api-key-here"
   ```

### 第 2 步：下載和設定 Claudia

#### 2.1 複製專案

```bash
# 在 Git Bash 中，導航到您想要的目錄
cd /d/Projects  # 例如 D:\Projects

# 複製 Claudia 專案
git clone https://github.com/getAsterisk/claudia.git
cd claudia

# 切換到 Windows 支援分支
git checkout Windows-Support-WSL-or-Docker
```

#### 2.2 安裝依賴項目

```bash
# 使用 Bun 安裝依賴項目
bun install

# 如果您偏好使用 npm：
# npm install
```

#### 2.3 建置必要的執行檔

```bash
# 建置 Claude Code 執行檔
bun run build:executables:current

# 這將下載並建置適用於您的平台的執行檔
```

### 第 3 步：設定 Shell 環境

#### 3.1 設定 Git Bash 路徑

Claudia 需要 POSIX shell 環境。在 Windows 上，它會自動檢測 Git Bash：

```bash
# 確認 Git Bash 位置 (通常在)：
ls -la "C:\Program Files\Git\bin\bash.exe"
```

#### 3.2 設定環境變數 (可選)

```bash
# 在 Git Bash 中，編輯 ~/.bashrc
nano ~/.bashrc

# 添加以下行：
export SHELL="C:\Program Files\Git\bin\bash.exe"
export ANTHROPIC_API_KEY="your-api-key-here"

# 儲存並重新載入
source ~/.bashrc
```

### 第 4 步：啟動 Claudia

#### 4.1 開發模式

```bash
# 在專案目錄中執行：
bun run tauri dev

# 這將：
# 1. 建置前端 (React + Vite)
# 2. 編譯後端 (Rust + Tauri)
# 3. 啟動桌面應用程式
```

#### 4.2 生產建置

```bash
# 建置生產版本：
bun run tauri build

# 建置的執行檔將位於：
# src-tauri/target/release/bundle/
```

## 🔧 疑難排解

### 常見問題和解決方案

#### 問題 1：Claude Code CLI 找不到 Shell

**錯誤訊息**：
```
No suitable shell found. Claude CLI requires a Posix shell environment
```

**解決方案**：
```bash
# 1. 確認 Git Bash 已安裝
ls -la "C:\Program Files\Git\bin\bash.exe"

# 2. 手動設定 SHELL 環境變數
export SHELL="C:\Program Files\Git\bin\bash.exe"

# 3. 重新啟動 Claudia
```

#### 問題 2：Rust 編譯錯誤

**解決方案**：
```bash
# 更新 Rust 工具鏈
rustup update

# 安裝 Visual Studio Build Tools (如需要)
# 下載並安裝 Visual Studio Installer
# 選擇 "C++ build tools" 工作負載
```

#### 問題 3：Node.js 版本不相容

**解決方案**：
```bash
# 檢查 Node.js 版本
node --version

# 如果版本低於 18，請更新：
# 下載並安裝最新的 Node.js LTS 版本
```

#### 問題 4：權限問題

**解決方案**：
```bash
# 以管理員身分執行 Git Bash
# 或設定適當的資料夾權限

# 清理並重新安裝 (如需要)
bun run clean
bun install
```

### 效能最佳化

#### 加速建置時間

```bash
# 使用 Rust 的並行編譯
export CARGO_BUILD_JOBS=4

# 使用 SSD 儲存專案
# 關閉防毒軟體的即時掃描 (針對專案資料夾)
```

#### 記憶體使用最佳化

```bash
# 限制 Node.js 記憶體使用
export NODE_OPTIONS="--max-old-space-size=4096"
```

## 📁 目錄結構

```
claudia/
├── src/                    # React 前端原始碼
├── src-tauri/             # Rust 後端原始碼
├── public/                # 靜態資源
├── docs/                  # 文檔
├── scripts/               # 建置腳本
└── cc_agents/             # 預建的代理程式
```

## 🔄 更新和維護

### 更新 Claudia

```bash
# 拉取最新更改
git pull origin Windows-Support-WSL-or-Docker

# 更新依賴項目
bun install

# 重新建置
bun run build:executables:current
```

### 清理建置快取

```bash
# 清理所有建置快取
bun run clean

# 或手動清理：
rm -rf node_modules
rm -rf src-tauri/target
bun install
```

## 🛡️ 安全考量

### API Key 管理

```bash
# 避免在程式碼中硬編碼 API Key
# 使用環境變數：
export ANTHROPIC_API_KEY="your-key"

# 或使用 .env 檔案 (不要提交到 Git)
echo "ANTHROPIC_API_KEY=your-key" > .env
```

### 防火牆設定

- Claudia 在本地運行，通常不需要特殊防火牆設定
- 開發模式使用端口 1420 (http://localhost:1420)

## 📞 支援和幫助

### 獲取幫助

1. **查看日誌**：
   ```bash
   # 開啟 Claudia，前往 Settings > Logs
   # 或查看控制台輸出
   ```

2. **檢查版本資訊**：
   ```bash
   # 在專案目錄中
   bun --version
   node --version
   rustc --version
   claude-code --version
   ```

3. **社群支援**：
   - GitHub Issues: [claudia/issues](https://github.com/getAsterisk/claudia/issues)
   - 查看文檔：`docs/` 目錄

### 診斷工具

```bash
# 檢查系統相容性
echo "=== 系統資訊 ==="
uname -a
echo "=== Node.js ==="
node --version
echo "=== Rust ==="
rustc --version
echo "=== Git ==="
git --version
echo "=== Claude Code ==="
claude-code --version
echo "=== Shell ==="
echo $SHELL
```

## 🎯 下一步

安裝完成後，您可以：

1. **探索 CC Agents**：使用預建的代理程式
2. **瀏覽 CC Projects**：管理 Claude Code 專案
3. **自訂設定**：調整應用程式偏好設定
4. **查看使用分析**：監控 API 使用情況

享受使用 Claudia 的體驗！🚀

---

**注意**：本指南假設您使用 Git Bash 作為主要終端。如果您偏好使用 PowerShell 或 Command Prompt，某些命令可能需要調整。
