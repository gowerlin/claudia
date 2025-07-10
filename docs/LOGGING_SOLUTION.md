# Frontend Logging Solution for Claudia

## Overview

I've implemented a comprehensive logging solution that captures all console output from the frontend and writes it to log files. This solution includes:

1. **Backend (Rust/Tauri)**: Log file management commands
2. **Frontend (TypeScript)**: Console interception and buffering
3. **UI Component**: Log viewer with search and configuration
4. **Automatic log rotation**: Based on file size and date

## Implementation Details

### 1. Tauri Backend Commands (`src-tauri/src/commands/logging.rs`)

The backend provides the following commands:

- `write_log`: Writes a log entry to file with timestamp
- `get_log_files`: Lists all available log files
- `read_log_file`: Reads contents of a specific log file
- `clear_logs`: Deletes all log files
- `get_log_config`: Gets current logging configuration
- `update_log_config`: Updates logging configuration

Log files are stored in the app data directory:
- Windows: `%APPDATA%\com.claudia\logs\` (例如 `C:\Users\Username\AppData\Roaming\com.claudia\logs\`)
- macOS: `~/Library/Application Support/com.claudia/logs/`
- Linux: `~/.config/com.claudia/logs/`

### Windows 特定設定

在 Windows 環境下，日誌系統會自動處理路徑轉換和權限設定：

```bash
# 檢查日誌目錄 (在 Git Bash 中)
ls -la "$APPDATA/com.claudia/logs/"

# 使用 Windows 路徑瀏覽器開啟日誌目錄
explorer "$APPDATA\\com.claudia\\logs"

# 清理舊日誌 (如需要)
rm -rf "$APPDATA/com.claudia/logs/*.log"
```

### 2. Frontend Logger (`src/lib/logger.ts`)

The logger automatically:
- Intercepts all console methods (log, error, warn, info, debug)
- Buffers log entries for performance
- Flushes logs periodically (every 5 seconds)
- Handles page unload events
- Formats complex objects and errors properly

### 3. Log Viewer Component (`src/components/LogViewer.tsx`)

Features:
- View log files with syntax highlighting
- Search functionality
- Auto-refresh mode
- Download logs
- Clear all logs
- Configure logging settings

### 4. Integration

The logging system is integrated into the Settings page under the "Logs" tab.

## Usage

### Basic Usage

Once the app starts, all console output is automatically captured:

```typescript
console.log('Application started');
console.error('An error occurred', new Error('Details'));
console.warn('Warning message');
console.info('User action', { action: 'clicked', button: 'save' });
```

### Viewing Logs

1. Open Settings (gear icon)
2. Navigate to "Logs" tab
3. Select a log file
4. Use search to filter
5. Enable auto-refresh for real-time viewing

### Configuration

- **Enable/Disable**: Toggle logging on/off
- **Max File Size**: Default 10MB (configurable)
- **Max Files**: Default 5 files (configurable)

## Log Format

```
[2025-01-16T10:30:45.123Z] [INFO] Application started
[2025-01-16T10:30:46.456Z] [ERROR] Failed to load resource Network error
```

## File Structure

```
src-tauri/
  src/
    commands/
      logging.rs      # Backend logging commands
      mod.rs          # Module declaration

src/
  lib/
    logger.ts         # Frontend logger implementation
    logger-example.ts # Usage examples
  components/
    LogViewer.tsx     # UI component for viewing logs
    Settings.tsx      # Updated to include logs tab
  locales/
    en/translation.json     # English translations
    zh-tw/translation.json  # Traditional Chinese translations

docs/
  LOGGING.md          # Detailed documentation
```

## Key Features

1. **Automatic Console Interception**: No code changes needed - all console calls are captured
2. **Performance Optimized**: Buffered writes, periodic flushing
3. **Log Rotation**: Automatic rotation based on size and date
4. **Search and Filter**: Find specific log entries quickly
5. **Real-time Viewing**: Auto-refresh mode for live log monitoring
6. **Configurable**: Control retention, file size, and enable/disable
7. **Multi-language Support**: English and Traditional Chinese

## Security Considerations

- Logs are stored locally only
- No sensitive data should be logged
- Users can clear logs at any time
- Log files respect app permissions

## Testing

The Log Viewer includes test buttons to generate different log levels:
- Log button → console.log
- Info button → console.info
- Warn button → console.warn
- Error button → console.error

This allows easy testing of the logging system without modifying code.