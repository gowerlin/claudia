# i18n 國際化實作說明

## 概述
已成功為 Claudia 專案加入 i18n (國際化) 支援，並新增繁體中文 (zh-TW) 語系。

## 實作內容

### 1. 安裝的套件
- `i18next` - 核心 i18n 框架
- `react-i18next` - React 整合
- `i18next-browser-languagedetector` - 自動偵測使用者語言

### 2. 檔案結構
```
src/
├── lib/
│   └── i18n.ts              # i18n 設定檔
├── locales/
│   ├── en/
│   │   └── translation.json  # 英文翻譯
│   └── zh-tw/
│       └── translation.json  # 繁體中文翻譯
└── components/
    └── LanguageSwitcher.tsx  # 語言切換元件
```

### 3. 主要變更

#### i18n 初始化 (src/lib/i18n.ts)
- 設定支援的語言：英文 (en) 和繁體中文 (zh-TW)
- 預設語言為英文
- 自動偵測使用者瀏覽器語言
- 語言偏好儲存在 localStorage

#### App.tsx
- 匯入 i18n 設定檔以初始化國際化功能

#### Topbar 元件
- 加入語言切換按鈕
- 使用 `useTranslation` hook 翻譯文字
- 已翻譯的項目：Settings、Usage Dashboard

#### Settings 元件
- 使用 `useTranslation` hook
- 已翻譯所有 UI 文字，包括：
  - 標題和描述
  - Tab 標籤
  - 表單標籤和說明
  - 錯誤和成功訊息
  - 範例文字

### 4. 語言檔案內容

#### 翻譯結構
```json
{
  "common": {
    "save": "儲存",
    "saving": "儲存中...",
    "cancel": "取消",
    "back": "返回"
  },
  "settings": {
    "title": "設定",
    "tabs": {
      "general": "一般",
      "permissions": "權限"
    }
  }
}
```

### 5. 使用方式

#### 在元件中使用翻譯
```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('settings.title')}</h1>
      <button>{t('common.save')}</button>
    </div>
  );
}
```

#### 切換語言
使用者可以透過 Topbar 右側的語言切換按鈕選擇語言。選擇的語言會儲存在瀏覽器的 localStorage 中。

### 6. 擴展指南

#### 新增翻譯
1. 在 `src/locales/en/translation.json` 和 `src/locales/zh-tw/translation.json` 中加入新的翻譯鍵值
2. 在元件中使用 `t('your.translation.key')`

#### 新增語言
1. 在 `src/locales/` 下建立新的語言資料夾（例如：`ja` 代表日文）
2. 複製 `translation.json` 並翻譯內容
3. 在 `src/lib/i18n.ts` 的 `resources` 和 `supportedLngs` 中加入新語言
4. 在 `src/components/LanguageSwitcher.tsx` 的 `languages` 陣列中加入新語言選項

### 7. 注意事項
- 所有新增的 UI 文字都應該使用 i18n
- 保持翻譯檔案的結構一致性
- 使用有意義的翻譯鍵值命名（例如：`settings.general.title` 而非 `title1`）
- 記得在兩種語言檔案中都加入對應的翻譯

## 後續建議
1. 將其他主要元件（如 ProjectList、SessionList 等）的文字改為使用 i18n
2. 考慮加入更多語言支援（如簡體中文、日文等）
3. 實作動態載入語言檔案以減少初始載入大小
4. 加入翻譯缺失的錯誤處理和回報機制