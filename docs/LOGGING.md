# Frontend Logging System

This document describes the frontend logging system implemented in Claudia that captures all console output and writes it to log files.

## Overview

The logging system automatically intercepts all console methods (`console.log`, `console.error`, `console.warn`, etc.) and writes them to timestamped log files. This helps with debugging issues in production and understanding user behavior.

## Features

- **Automatic Console Interception**: All console methods are automatically captured
- **Log File Rotation**: Logs are rotated based on file size and date
- **Configurable Retention**: Control how many log files to keep and their maximum size
- **Search and Filter**: Search through logs in the UI
- **Auto-refresh**: Real-time log viewing with auto-refresh
- **Performance Optimized**: Logs are buffered and written in batches

## Architecture

### Backend (Rust/Tauri)

The backend provides several commands for log management:

- `write_log`: Write a log entry to file
- `get_log_files`: List all available log files
- `read_log_file`: Read contents of a specific log file
- `clear_logs`: Delete all log files
- `get_log_config`: Get current logging configuration
- `update_log_config`: Update logging configuration

Log files are stored in:
- Windows: `%APPDATA%\com.claudia\logs\`
- macOS: `~/Library/Application Support/com.claudia/logs/`
- Linux: `~/.config/com.claudia/logs/`

### Frontend (TypeScript/React)

The frontend logger (`src/lib/logger.ts`) provides:

1. **Automatic initialization** on app start
2. **Console method interception** to capture all output
3. **Buffered writes** for performance
4. **Configuration management**

## Usage

### Basic Usage

Once the app starts, all console output is automatically logged:

```typescript
// These will all be captured to log files
console.log('Application started');
console.error('An error occurred', new Error('Details'));
console.warn('Warning message');
console.info('Information', { data: 'value' });
```

### Viewing Logs

1. Open Settings (gear icon in top bar)
2. Navigate to the "Logs" tab
3. Select a log file from the dropdown
4. Use search to filter logs
5. Enable auto-refresh for real-time viewing

### Configuration

In the Logs tab settings, you can configure:

- **Enable/Disable Logging**: Toggle logging on/off
- **Max File Size**: Set maximum size before rotation (default: 10MB)
- **Max Files**: Set how many log files to keep (default: 5)

### Programmatic Access

```typescript
import { logger } from '@/lib/logger';

// Get current configuration
const config = logger.getConfig();

// Update configuration
await logger.updateConfig({
  max_file_size_mb: 20,
  max_files: 10,
  enabled: true
});

// Get list of log files
const files = await logger.getLogFiles();

// Read a log file
const content = await logger.readLogFile('frontend-2025-01-16.log');

// Clear all logs
await logger.clearLogs();
```

## Log Format

Each log entry follows this format:
```
[ISO-8601 Timestamp] [LEVEL] Message Details
```

Example:
```
[2025-01-16T10:30:45.123Z] [INFO] Application started
[2025-01-16T10:30:46.456Z] [ERROR] Failed to load resource Network error
```

## Best Practices

1. **Use appropriate log levels**:
   - `console.log` / `console.info`: General information
   - `console.warn`: Warnings that don't break functionality
   - `console.error`: Errors and exceptions

2. **Include context in logs**:
   ```typescript
   console.error('API call failed', {
     endpoint: '/api/users',
     status: 404,
     userId: 123
   });
   ```

3. **Log important user actions**:
   ```typescript
   console.info('User action', {
     action: 'create_project',
     projectName: 'My Project'
   });
   ```

4. **Avoid logging sensitive information**:
   - Don't log passwords, API keys, or personal data
   - Be careful with user-generated content

## Troubleshooting

### Logs not appearing

1. Check if logging is enabled in Settings > Logs
2. Ensure the app has write permissions to the app data directory
3. Check if there's sufficient disk space

### Performance issues

1. Reduce the logging frequency in your code
2. Decrease the max file size to trigger more frequent rotations
3. Reduce the number of retained log files

### Large log files

The system automatically rotates logs when they exceed the configured size. You can also manually clear logs from the UI.

## Security Considerations

- Log files are stored locally on the user's machine
- No logs are sent to external servers
- Be cautious about what information is logged
- Users can clear their logs at any time

## Future Enhancements

Potential improvements for the logging system:

1. Log level filtering in the UI
2. Export logs to different formats
3. Remote log collection (opt-in)
4. Performance metrics and analytics
5. Integration with error reporting services