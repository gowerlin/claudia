# Windows 環境變數設定指南

## 📋 概述

本文檔詳細說明如何在 Windows 環境下設定 Claudia 所需的環境變數，確保應用程式能正確運行。

## 🔧 必要的環境變數

### 1. SHELL 環境變數

Claudia 需要 POSIX shell 來執行 Claude Code CLI。在 Windows 上，我們使用 Git Bash。

#### 方法 1：透過 Git Bash 設定 (推薦)

```bash
# 開啟 Git Bash，編輯 ~/.bashrc
nano ~/.bashrc

# 或使用 vim
vim ~/.bashrc

# 添加以下行：
export SHELL="C:\Program Files\Git\bin\bash.exe"

# 儲存檔案後，重新載入設定
source ~/.bashrc

# 驗證設定
echo $SHELL
```

#### 方法 2：透過 Windows 系統設定

1. **開啟系統內容**
   - 按 `Win + R`，輸入 `sysdm.cpl`
   - 或右鍵點擊「本機」→「內容」→「進階系統設定」

2. **設定環境變數**
   - 點擊「環境變數」按鈕
   - 在「系統變數」部分點擊「新增」
   - 變數名稱：`SHELL`
   - 變數值：`C:\Program Files\Git\bin\bash.exe`
   - 點擊「確定」

3. **驗證設定**
   ```bash
   # 重新開啟 Git Bash，執行：
   echo $SHELL
   ```

### 2. ANTHROPIC_API_KEY 環境變數

#### 方法 1：透過 Git Bash 設定

```bash
# 編輯 ~/.bashrc
nano ~/.bashrc

# 添加您的 API Key
export ANTHROPIC_API_KEY="your-actual-api-key-here"

# 重新載入設定
source ~/.bashrc

# 驗證設定 (小心不要洩露完整 key)
echo ${ANTHROPIC_API_KEY:0:8}...
```

#### 方法 2：透過 .env 檔案

```bash
# 在 Claudia 專案根目錄中創建 .env 檔案
cd /d/Projects/claudia
echo "ANTHROPIC_API_KEY=your-actual-api-key-here" > .env

# 確保 .env 檔案在 .gitignore 中
echo ".env" >> .gitignore
```

#### 方法 3：透過 Windows 系統設定

1. **系統環境變數設定**
   - 開啟系統內容 (`sysdm.cpl`)
   - 點擊「環境變數」
   - 在「使用者變數」部分點擊「新增」
   - 變數名稱：`ANTHROPIC_API_KEY`
   - 變數值：您的實際 API Key
   - 點擊「確定」

2. **重新啟動終端**
   ```bash
   # 關閉並重新開啟 Git Bash
   # 驗證設定
   echo ${ANTHROPIC_API_KEY:0:8}...
   ```

## 🛠️ 其他有用的環境變數

### 開發環境最佳化

```bash
# 編輯 ~/.bashrc
nano ~/.bashrc

# 添加以下設定：

# Rust 編譯最佳化
export CARGO_BUILD_JOBS=4
export RUSTC_WRAPPER=""

# Node.js 記憶體設定
export NODE_OPTIONS="--max-old-space-size=4096"

# Git 設定
export GIT_EDITOR="nano"

# Bun 設定
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# 儲存並重新載入
source ~/.bashrc
```

### Windows 特定路徑設定

```bash
# 添加常用工具到 PATH
export PATH="$PATH:/c/Program Files/Git/bin"
export PATH="$PATH:/c/Users/$USER/.cargo/bin"
export PATH="$PATH:/c/Program Files/nodejs"

# Windows 相容性設定
export MSYS_NO_PATHCONV=1
export MSYS2_ARG_CONV_EXCL="*"
```

## 🔍 驗證設定

### 完整環境檢查腳本

```bash
#!/bin/bash
# 儲存為 check-env.sh 並執行 chmod +x check-env.sh

echo "=== Claudia 環境檢查 ==="
echo

echo "1. Shell 設定："
echo "   SHELL = $SHELL"
if [ -f "$SHELL" ]; then
    echo "   ✅ Shell 檔案存在"
else
    echo "   ❌ Shell 檔案不存在"
fi
echo

echo "2. API Key 設定："
if [ -n "$ANTHROPIC_API_KEY" ]; then
    echo "   ✅ ANTHROPIC_API_KEY 已設定 (${ANTHROPIC_API_KEY:0:8}...)"
else
    echo "   ❌ ANTHROPIC_API_KEY 未設定"
fi
echo

echo "3. 必要工具："
tools=("node" "npm" "bun" "rustc" "cargo" "git" "claude-code")
for tool in "${tools[@]}"; do
    if command -v "$tool" &> /dev/null; then
        version=$(command "$tool" --version 2>/dev/null | head -1)
        echo "   ✅ $tool: $version"
    else
        echo "   ❌ $tool: 未安裝或不在 PATH 中"
    fi
done
echo

echo "4. 路徑設定："
echo "   PATH = $PATH"
echo

echo "5. 工作目錄權限："
if [ -w "." ]; then
    echo "   ✅ 當前目錄可寫入"
else
    echo "   ❌ 當前目錄無寫入權限"
fi

echo
echo "=== 檢查完成 ==="
```

### 執行檢查

```bash
# 在 Git Bash 中執行：
bash check-env.sh
```

## 🚨 常見問題解決

### 問題 1：SHELL 變數設定後仍然無效

**解決方案**：
```bash
# 確認 Git Bash 路徑
ls -la "C:\Program Files\Git\bin\bash.exe"

# 如果路徑不同，更新設定
export SHELL="/c/Program Files/Git/bin/bash.exe"

# 或嘗試其他可能的路徑
export SHELL="/usr/bin/bash"
export SHELL="/bin/bash"
```

### 問題 2：環境變數在重新開機後消失

**解決方案**：
```bash
# 確保設定已加入 ~/.bashrc
cat ~/.bashrc | grep SHELL
cat ~/.bashrc | grep ANTHROPIC_API_KEY

# 如果沒有，重新添加
echo 'export SHELL="C:\Program Files\Git\bin\bash.exe"' >> ~/.bashrc
echo 'export ANTHROPIC_API_KEY="your-key"' >> ~/.bashrc
```

### 問題 3：權限問題

**解決方案**：
```bash
# 以管理員身分執行 Git Bash
# 或檢查檔案權限
ls -la ~/.bashrc

# 修復權限
chmod 644 ~/.bashrc
```

### 問題 4：多個 Shell 環境衝突

**解決方案**：
```bash
# 檢查所有可能的設定檔
echo "=== ~/.bashrc ==="
cat ~/.bashrc | grep export

echo "=== ~/.bash_profile ==="
cat ~/.bash_profile 2>/dev/null | grep export

echo "=== ~/.profile ==="
cat ~/.profile 2>/dev/null | grep export

# 選擇一個主要設定檔進行統一管理
```

## 🔄 自動化設定腳本

### 一鍵設定腳本

```bash
#!/bin/bash
# 儲存為 setup-env.sh

echo "=== Claudia Windows 環境自動設定 ==="

# 備份現有設定
if [ -f ~/.bashrc ]; then
    cp ~/.bashrc ~/.bashrc.backup.$(date +%Y%m%d_%H%M%S)
    echo "✅ 已備份現有 .bashrc"
fi

# 檢查並設定 SHELL
if ! grep -q "export SHELL=" ~/.bashrc 2>/dev/null; then
    echo 'export SHELL="C:\Program Files\Git\bin\bash.exe"' >> ~/.bashrc
    echo "✅ 已設定 SHELL 環境變數"
fi

# 設定開發環境最佳化
cat >> ~/.bashrc << 'EOF'

# Claudia 開發環境設定
export CARGO_BUILD_JOBS=4
export NODE_OPTIONS="--max-old-space-size=4096"
export MSYS_NO_PATHCONV=1

# 添加常用工具路徑
export PATH="$PATH:/c/Program Files/Git/bin"
export PATH="$PATH:/c/Users/$USER/.cargo/bin"

EOF

echo "✅ 已添加開發環境最佳化設定"

# 提示設定 API Key
echo
echo "⚠️  請手動設定您的 ANTHROPIC_API_KEY："
echo "   echo 'export ANTHROPIC_API_KEY=\"your-api-key\"' >> ~/.bashrc"
echo
echo "✅ 設定完成！請重新啟動 Git Bash 或執行：source ~/.bashrc"
```

### 執行自動設定

```bash
# 下載並執行設定腳本
curl -o setup-env.sh https://raw.githubusercontent.com/getAsterisk/claudia/Windows-Support-WSL-or-Docker/scripts/setup-env.sh
chmod +x setup-env.sh
./setup-env.sh
```

## 📝 設定檢查清單

### 安裝前檢查

- [ ] Windows 10 版本 1903 或更高
- [ ] 管理員權限可用
- [ ] 網路連線正常
- [ ] 至少 2GB 可用空間

### 環境變數檢查

- [ ] `SHELL` 指向 Git Bash
- [ ] `ANTHROPIC_API_KEY` 已設定
- [ ] `PATH` 包含必要工具
- [ ] 環境變數在重新開機後持續有效

### 工具檢查

- [ ] Git 和 Git Bash 已安裝
- [ ] Node.js 18+ 已安裝
- [ ] Bun 已安裝
- [ ] Rust 和 Cargo 已安裝
- [ ] Claude Code CLI 已安裝

### 功能檢查

- [ ] 可以執行 `claude-code --version`
- [ ] 可以執行 `bun run tauri dev`
- [ ] Claudia 應用程式正常啟動
- [ ] Claude Code 整合正常運作

## 🎯 下一步

環境設定完成後：

1. **測試基本功能**：執行 `bun run tauri dev`
2. **驗證 Claude 整合**：測試 Claude Code 命令
3. **探索功能**：使用 CC Agents 和 CC Projects
4. **自訂設定**：調整應用程式偏好

---

**提示**：將此文檔加入書籤，以便日後參考環境設定步驟。
