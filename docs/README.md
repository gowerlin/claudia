# Windows 支援文檔索引

## 📋 概述

此目錄包含了在 Windows 環境下安裝、設定和使用 Claudia 的完整指南。

## 📚 文檔列表

### 🚀 安裝和設定指南

#### [WINDOWS_INSTALLATION.md](WINDOWS_INSTALLATION.md)
**完整的 Windows 安裝指南**
- 系統要求和必需軟體
- 詳細的安裝步驟
- Git Bash 設定說明
- 疑難排解和最佳化

#### [WINDOWS_ENVIRONMENT_SETUP.md](WINDOWS_ENVIRONMENT_SETUP.md)
**環境變數設定詳解**
- SHELL 環境變數設定
- ANTHROPIC_API_KEY 設定
- 開發環境最佳化
- 自動化設定腳本

#### [WINDOWS_QUICK_REFERENCE.md](WINDOWS_QUICK_REFERENCE.md)
**快速參考卡**
- 常用命令速查
- 疑難排解速查表
- 健康檢查腳本
- 效能提示

### 🔧 技術文檔

#### [LOGGING_SOLUTION.md](../LOGGING_SOLUTION.md)
**日誌系統說明** (包含 Windows 特定設定)
- 日誌檔案位置 (`%APPDATA%\com.claudia\logs\`)
- Windows 路徑處理
- Git Bash 中的日誌管理

#### [ZOOM_FEATURE.md](../ZOOM_FEATURE.md)
**縮放功能說明**
- Chrome 風格的縮放操作
- Ctrl + 滑鼠滾輪縮放
- 縮放指示器使用

## 🎯 快速開始 (Windows)

### 1. 基本要求檢查

```bash
# 在 Git Bash 中執行
echo "=== 系統檢查 ==="
echo "Windows 版本: $(cmd.exe /c ver)"
echo "Git 版本: $(git --version)"
echo "可用空間: $(df -h . | tail -1 | awk '{print $4}')"
```

### 2. 一鍵環境設定

```bash
# 下載並執行自動設定腳本
curl -o setup-claudia.sh https://raw.githubusercontent.com/getAsterisk/claudia/Windows-Support-WSL-or-Docker/scripts/setup-claudia.sh
chmod +x setup-claudia.sh
./setup-claudia.sh
```

### 3. 驗證安裝

```bash
# 檢查所有必要元件
echo "=== 工具檢查 ==="
node --version && echo "✅ Node.js"
bun --version && echo "✅ Bun"
rustc --version && echo "✅ Rust"
claude-code --version && echo "✅ Claude Code"

echo "=== 環境變數檢查 ==="
[ -n "$SHELL" ] && echo "✅ SHELL: $SHELL" || echo "❌ SHELL 未設定"
[ -n "$ANTHROPIC_API_KEY" ] && echo "✅ API Key 已設定" || echo "❌ API Key 未設定"
```

## 🔍 常見使用情境

### 情境 1: 首次安裝
📖 **建議閱讀順序**:
1. [WINDOWS_INSTALLATION.md](WINDOWS_INSTALLATION.md) - 完整安裝流程
2. [WINDOWS_ENVIRONMENT_SETUP.md](WINDOWS_ENVIRONMENT_SETUP.md) - 環境設定
3. [WINDOWS_QUICK_REFERENCE.md](WINDOWS_QUICK_REFERENCE.md) - 驗證安裝

### 情境 2: 環境問題排除
📖 **建議閱讀順序**:
1. [WINDOWS_QUICK_REFERENCE.md](WINDOWS_QUICK_REFERENCE.md) - 快速診斷
2. [WINDOWS_ENVIRONMENT_SETUP.md](WINDOWS_ENVIRONMENT_SETUP.md) - 環境修復
3. [WINDOWS_INSTALLATION.md](WINDOWS_INSTALLATION.md) - 深度疑難排解

### 情境 3: 日常使用參考
📖 **建議閱讀**:
- [WINDOWS_QUICK_REFERENCE.md](WINDOWS_QUICK_REFERENCE.md) - 常用命令
- [LOGGING_SOLUTION.md](../LOGGING_SOLUTION.md) - 檢查日誌
- [ZOOM_FEATURE.md](../ZOOM_FEATURE.md) - 介面操作

## 🚨 常見問題快速解決

### Shell 相關問題

```bash
# 問題: "No suitable shell found"
# 解決方案:
export SHELL="C:\Program Files\Git\bin\bash.exe"
echo 'export SHELL="C:\Program Files\Git\bin\bash.exe"' >> ~/.bashrc
```

### API Key 問題

```bash
# 問題: API Key 錯誤
# 解決方案:
export ANTHROPIC_API_KEY="your-actual-api-key"
echo 'export ANTHROPIC_API_KEY="your-key"' >> ~/.bashrc
source ~/.bashrc
```

### 編譯問題

```bash
# 問題: Rust 編譯失敗
# 解決方案:
rustup update
cargo clean
bun run clean
bun install
```

### 權限問題

```bash
# 問題: 權限拒絕
# 解決方案:
# 1. 以管理員身分執行 Git Bash
# 2. 檢查防毒軟體設定
# 3. 確認檔案權限
chmod 755 ~/.bashrc
```

## 📞 獲取支援

### 自助診斷步驟

1. **執行健康檢查**
   ```bash
   # 使用快速參考卡中的健康檢查腳本
   bash check-health.sh
   ```

2. **收集系統資訊**
   ```bash
   echo "=== 系統資訊 ==="
   uname -a
   echo "=== 工具版本 ==="
   node --version; bun --version; rustc --version
   echo "=== 環境變數 ==="
   env | grep -E "(SHELL|ANTHROPIC|PATH)"
   ```

3. **查看日誌**
   - 開啟 Claudia → Settings → Logs
   - 或檢查 `%APPDATA%\com.claudia\logs\`

### 支援資源

- 📖 **完整文檔**: 本目錄中的所有 `.md` 檔案
- 🐛 **問題回報**: [GitHub Issues](https://github.com/getAsterisk/claudia/issues)
- 💬 **社群討論**: [GitHub Discussions](https://github.com/getAsterisk/claudia/discussions)
- 📧 **直接聯繫**: 透過 GitHub Issues 標記相關維護者

## 🔄 文檔更新

此文檔會隨著 Claudia 的發展持續更新。建議：

- ⭐ **收藏此頁面** 以便快速查閱
- 🔔 **關注專案** 以獲取更新通知
- 📝 **回饋問題** 幫助改進文檔

---

**💡 提示**: 如果您是第一次使用，建議從 [WINDOWS_INSTALLATION.md](WINDOWS_INSTALLATION.md) 開始閱讀！
