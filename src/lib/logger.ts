import { invoke } from "@tauri-apps/api/core";

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogConfig {
  max_file_size_mb: number;
  max_files: number;
  enabled: boolean;
}

class Logger {
  private originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
    debug: console.debug,
    info: console.info
  };

  private isInitialized = false;
  private logBuffer: Array<{ level: LogLevel; args: any[]; timestamp: Date }> = [];
  private flushTimer: NodeJS.Timeout | null = null;
  private config: LogConfig = {
    max_file_size_mb: 10,
    max_files: 5,
    enabled: true
  };

  /**
   * Initialize the logger and intercept console methods
   */
  async initialize() {
    if (this.isInitialized) {
      return;
    }

    // Load config
    try {
      this.config = await invoke<LogConfig>('get_log_config');
    } catch (error) {
      this.originalConsole.error('Failed to load log config:', error);
    }

    if (!this.config.enabled) {
      return;
    }

    // Intercept console methods
    this.interceptConsoleMethod('log', 'info');
    this.interceptConsoleMethod('info', 'info');
    this.interceptConsoleMethod('warn', 'warn');
    this.interceptConsoleMethod('error', 'error');
    this.interceptConsoleMethod('debug', 'debug');

    // Set up periodic flush
    this.startPeriodicFlush();

    // Flush on page unload
    window.addEventListener('beforeunload', () => {
      this.flushSync();
    });

    this.isInitialized = true;
  }

  /**
   * Intercept a console method and redirect to our logger
   */
  private interceptConsoleMethod(method: keyof typeof console, level: LogLevel) {
    const original = this.originalConsole[method as keyof typeof this.originalConsole];
    
    (console as any)[method] = (...args: any[]) => {
      // Call original method
      original.apply(console, args);
      
      // Add to log buffer
      if (this.config.enabled) {
        this.logBuffer.push({
          level,
          args,
          timestamp: new Date()
        });

        // Flush if buffer is getting large
        if (this.logBuffer.length >= 50) {
          this.flush();
        }
      }
    };
  }

  /**
   * Start periodic flush timer
   */
  private startPeriodicFlush() {
    this.flushTimer = setInterval(() => {
      if (this.logBuffer.length > 0) {
        this.flush();
      }
    }, 5000); // Flush every 5 seconds
  }

  /**
   * Format log arguments into a string
   */
  private formatArgs(args: any[]): { message: string; details?: string } {
    if (args.length === 0) {
      return { message: '' };
    }

    // Convert first argument to string for the main message
    let message = '';
    let details: string | undefined;

    try {
      if (typeof args[0] === 'string') {
        message = args[0];
      } else if (args[0] instanceof Error) {
        message = args[0].message;
        details = args[0].stack;
      } else {
        message = String(args[0]);
      }

      // If there are additional arguments, stringify them as details
      if (args.length > 1) {
        const additionalArgs = args.slice(1).map(arg => {
          if (typeof arg === 'object') {
            try {
              return JSON.stringify(arg, null, 2);
            } catch {
              return String(arg);
            }
          }
          return String(arg);
        });

        details = (details ? details + '\n' : '') + additionalArgs.join(' ');
      }
    } catch (error) {
      message = 'Failed to format log message';
      details = String(error);
    }

    return { message, details };
  }

  /**
   * Flush log buffer to file asynchronously
   */
  private async flush() {
    if (this.logBuffer.length === 0 || !this.config.enabled) {
      return;
    }

    const logsToFlush = [...this.logBuffer];
    this.logBuffer = [];

    try {
      // Process logs in batches to avoid overwhelming the backend
      for (const log of logsToFlush) {
        const { message, details } = this.formatArgs(log.args);
        
        await invoke('write_log', {
          level: log.level,
          message,
          details
        });
      }
    } catch (error) {
      // Restore logs to buffer on error
      this.logBuffer = logsToFlush.concat(this.logBuffer);
      this.originalConsole.error('Failed to write logs:', error);
    }
  }

  /**
   * Flush log buffer synchronously (for page unload)
   */
  private flushSync() {
    if (this.logBuffer.length === 0 || !this.config.enabled) {
      return;
    }

    // Try to send logs synchronously using sendBeacon if available
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      // const logs = this.logBuffer.map(log => ({
      //   level: log.level,
      //   timestamp: log.timestamp.toISOString(),
      //   ...this.formatArgs(log.args)
      // }));

      // Note: This would require a separate HTTP endpoint in Tauri
      // For now, we'll just try async flush
      this.flush();
    }
  }

  /**
   * Stop the logger and restore original console methods
   */
  stop() {
    if (!this.isInitialized) {
      return;
    }

    // Flush remaining logs
    this.flush();

    // Clear flush timer
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = null;
    }

    // Restore original console methods
    console.log = this.originalConsole.log;
    console.error = this.originalConsole.error;
    console.warn = this.originalConsole.warn;
    console.debug = this.originalConsole.debug;
    console.info = this.originalConsole.info;

    this.isInitialized = false;
  }

  /**
   * Get list of log files
   */
  async getLogFiles(): Promise<string[]> {
    try {
      return await invoke<string[]>('get_log_files');
    } catch (error) {
      this.originalConsole.error('Failed to get log files:', error);
      return [];
    }
  }

  /**
   * Read a log file
   */
  async readLogFile(fileName: string, lines?: number): Promise<string> {
    try {
      return await invoke<string>('read_log_file', { fileName, lines });
    } catch (error) {
      this.originalConsole.error('Failed to read log file:', error);
      return '';
    }
  }

  /**
   * Clear all log files
   */
  async clearLogs(): Promise<void> {
    try {
      await invoke('clear_logs');
    } catch (error) {
      this.originalConsole.error('Failed to clear logs:', error);
    }
  }

  /**
   * Update log configuration
   */
  async updateConfig(config: LogConfig): Promise<void> {
    try {
      await invoke('update_log_config', { config });
      this.config = config;
      
      // If logging was disabled, stop intercepting
      if (!config.enabled) {
        this.stop();
      } else if (!this.isInitialized) {
        // If logging was enabled and we're not initialized, initialize
        await this.initialize();
      }
    } catch (error) {
      this.originalConsole.error('Failed to update log config:', error);
    }
  }

  /**
   * Get current log configuration
   */
  getConfig(): LogConfig {
    return { ...this.config };
  }
}

// Create singleton instance
export const logger = new Logger();

// Auto-initialize on import
if (typeof window !== 'undefined') {
  logger.initialize().catch(error => {
    console.error('Failed to initialize logger:', error);
  });
}