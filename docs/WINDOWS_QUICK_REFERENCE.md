# Claudia Windows 快速參考卡

## 🚀 快速開始

### 必要工具安裝 (一次性設定)

```bash
# 1. 安裝 Bun (套件管理器)
curl -fsSL https://bun.sh/install | bash

# 2. 安裝 Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 3. 安裝 Claude Code CLI
npm install -g @anthropic-ai/claude-code@1.0.41
```

### 環境變數設定

```bash
# 編輯 ~/.bashrc
nano ~/.bashrc

# 添加以下內容：
export SHELL="C:\Program Files\Git\bin\bash.exe"
export ANTHROPIC_API_KEY="your-api-key-here"

# 儲存後重新載入
source ~/.bashrc
```

### 專案設定

```bash
# 複製專案
git clone https://github.com/getAsterisk/claudia.git
cd claudia
git checkout Windows-Support-WSL-or-Docker

# 安裝依賴並建置
bun install
bun run build:executables:current

# 啟動開發模式
bun run tauri dev
```

## 🔧 常用命令

### 開發命令

| 命令 | 用途 |
|------|------|
| `bun run tauri dev` | 啟動開發模式 |
| `bun run tauri build` | 建置生產版本 |
| `bun run build:executables:current` | 建置 Claude Code 執行檔 |
| `bun install` | 安裝/更新依賴項目 |
| `bun run clean` | 清理建置快取 |

### 診斷命令

| 命令 | 用途 |
|------|------|
| `echo $SHELL` | 檢查 Shell 設定 |
| `echo ${ANTHROPIC_API_KEY:0:8}...` | 檢查 API Key (安全) |
| `claude-code --version` | 檢查 Claude CLI 版本 |
| `node --version && bun --version` | 檢查 Node/Bun 版本 |
| `rustc --version` | 檢查 Rust 版本 |

## 🚨 疑難排解

### 常見錯誤及解決方案

| 錯誤訊息 | 解決方案 |
|----------|----------|
| `No suitable shell found` | 設定 `export SHELL="C:\Program Files\Git\bin\bash.exe"` |
| `claude-code: command not found` | 執行 `npm install -g @anthropic-ai/claude-code@1.0.41` |
| `cargo: command not found` | 重新安裝 Rust 或重新啟動終端 |
| `Permission denied` | 以管理員身分執行 Git Bash |
| API Key 錯誤 | 檢查 `ANTHROPIC_API_KEY` 環境變數 |

### 快速重設

```bash
# 清理並重新開始
rm -rf node_modules src-tauri/target
bun install
bun run build:executables:current
```

## 📁 重要路徑

| 項目 | Windows 路徑 |
|------|-------------|
| Git Bash | `C:\Program Files\Git\bin\bash.exe` |
| 使用者設定 | `~/.bashrc` (例如 `C:\Users\Username\.bashrc`) |
| 專案目錄 | 您選擇的位置 (例如 `D:\Projects\claudia`) |
| 建置輸出 | `src-tauri\target\release\bundle\` |
| 日誌檔案 | `%APPDATA%\com.claudia\logs\` |

## 🔍 健康檢查腳本

```bash
#!/bin/bash
# 快速檢查所有必要元件

echo "=== Claudia 健康檢查 ==="

# 檢查工具
tools=("git" "node" "bun" "rustc" "claude-code")
for tool in "${tools[@]}"; do
    if command -v "$tool" &>/dev/null; then
        echo "✅ $tool"
    else
        echo "❌ $tool"
    fi
done

# 檢查環境變數
[ -n "$SHELL" ] && echo "✅ SHELL" || echo "❌ SHELL"
[ -n "$ANTHROPIC_API_KEY" ] && echo "✅ API_KEY" || echo "❌ API_KEY"

# 檢查關鍵檔案
[ -f "package.json" ] && echo "✅ package.json" || echo "❌ package.json"
[ -f "src-tauri/Cargo.toml" ] && echo "✅ Cargo.toml" || echo "❌ Cargo.toml"

echo "===================="
```

## 📞 快速支援

### 獲取幫助的步驟

1. **查看日誌**: Claudia → Settings → Logs
2. **運行健康檢查**: 執行上述健康檢查腳本
3. **收集資訊**: 記錄錯誤訊息和系統資訊
4. **查閱文檔**: 檢查 `docs/` 目錄中的詳細文檔
5. **提交 Issue**: 在 GitHub 上提交詳細的錯誤報告

### 常用除錯技巧

```bash
# 詳細錯誤輸出
RUST_BACKTRACE=1 bun run tauri dev

# 清理快取
bun cache clean

# 重新安裝所有依賴
rm -rf node_modules bun.lockb
bun install

# 檢查端口使用
netstat -an | findstr :1420
```

## 🎯 效能提示

### 加速建置

```bash
# 設定並行編譯
export CARGO_BUILD_JOBS=4

# 增加 Node.js 記憶體
export NODE_OPTIONS="--max-old-space-size=4096"

# 使用 SSD 儲存專案
# 排除專案目錄於防毒軟體掃描
```

### 記憶體最佳化

- 關閉不必要的瀏覽器分頁
- 在建置時關閉其他重型應用程式
- 定期清理建置快取

---

**💡 提示**: 將此頁面加入書籤以便快速參考！
