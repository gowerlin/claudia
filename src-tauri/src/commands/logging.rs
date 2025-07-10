use chrono::Local;
use serde::{Deserialize, Serialize};
use std::fs::{self, OpenOptions};
use std::io::Write;
use std::path::PathBuf;
use tauri::{AppHandle, Manager};

#[derive(Debug, Serialize, Deserialize)]
pub struct LogEntry {
    pub timestamp: String,
    pub level: String,
    pub message: String,
    pub details: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct LogConfig {
    pub max_file_size_mb: f64,
    pub max_files: usize,
    pub enabled: bool,
}

impl Default for LogConfig {
    fn default() -> Self {
        Self {
            max_file_size_mb: 10.0,
            max_files: 5,
            enabled: true,
        }
    }
}

fn get_log_dir(app_handle: &AppHandle) -> Result<PathBuf, String> {
    let app_data_dir = app_handle
        .path()
        .app_data_dir()
        .map_err(|e| format!("Failed to get app data directory: {}", e))?;
    
    let log_dir = app_data_dir.join("logs");
    
    // Create logs directory if it doesn't exist
    if !log_dir.exists() {
        fs::create_dir_all(&log_dir)
            .map_err(|e| format!("Failed to create logs directory: {}", e))?;
    }
    
    Ok(log_dir)
}

fn get_current_log_file(log_dir: &PathBuf) -> Result<PathBuf, String> {
    let today = Local::now().format("%Y-%m-%d").to_string();
    let log_file = log_dir.join(format!("frontend-{}.log", today));
    Ok(log_file)
}

fn rotate_logs(log_dir: &PathBuf, config: &LogConfig) -> Result<(), String> {
    let current_log = get_current_log_file(log_dir)?;
    
    // Check if current log file exceeds size limit
    if current_log.exists() {
        let metadata = fs::metadata(&current_log)
            .map_err(|e| format!("Failed to get log file metadata: {}", e))?;
        
        let size_mb = metadata.len() as f64 / (1024.0 * 1024.0);
        
        if size_mb > config.max_file_size_mb {
            // Rename current log file with timestamp
            let timestamp = Local::now().format("%Y%m%d_%H%M%S").to_string();
            let rotated_file = log_dir.join(format!("frontend-{}-{}.log", 
                Local::now().format("%Y-%m-%d"), timestamp));
            
            fs::rename(&current_log, &rotated_file)
                .map_err(|e| format!("Failed to rotate log file: {}", e))?;
        }
    }
    
    // Clean up old log files
    let mut log_files: Vec<_> = fs::read_dir(log_dir)
        .map_err(|e| format!("Failed to read log directory: {}", e))?
        .filter_map(|entry| entry.ok())
        .filter(|entry| {
            entry.file_name()
                .to_str()
                .map(|name| name.starts_with("frontend-") && name.ends_with(".log"))
                .unwrap_or(false)
        })
        .collect();
    
    // Sort by modification time (newest first)
    log_files.sort_by_key(|entry| {
        entry.metadata()
            .and_then(|m| m.modified())
            .unwrap_or(std::time::SystemTime::UNIX_EPOCH)
    });
    log_files.reverse();
    
    // Remove files exceeding max_files limit
    if log_files.len() > config.max_files {
        for entry in log_files.iter().skip(config.max_files) {
            if let Err(e) = fs::remove_file(entry.path()) {
                eprintln!("Failed to remove old log file: {}", e);
            }
        }
    }
    
    Ok(())
}

#[tauri::command]
pub async fn test_logging(app_handle: AppHandle) -> Result<String, String> {
    let log_dir = get_log_dir(&app_handle)?;
    let config = LogConfig::default();
    
    // Test write
    let test_message = format!("Test log entry at {}", Local::now().to_rfc3339());
    let log_file = get_current_log_file(&log_dir)?;
    
    let mut file = OpenOptions::new()
        .create(true)
        .append(true)
        .open(&log_file)
        .map_err(|e| format!("Failed to open log file: {}", e))?;
    
    file.write_all(format!("{}\n", test_message).as_bytes())
        .map_err(|e| format!("Failed to write to log file: {}", e))?;
    
    Ok(format!("Log directory: {:?}\nLog file: {:?}\nConfig: {:?}", log_dir, log_file, config))
}

#[tauri::command]
pub async fn write_log(
    app_handle: AppHandle,
    level: String,
    message: String,
    details: Option<String>,
) -> Result<(), String> {
    // Get log configuration (could be loaded from settings in the future)
    let config = LogConfig::default();
    
    if !config.enabled {
        return Ok(());
    }
    
    let log_dir = get_log_dir(&app_handle)?;
    
    // Rotate logs if needed
    rotate_logs(&log_dir, &config)?;
    
    let log_file = get_current_log_file(&log_dir)?;
    
    // Create log entry
    let log_entry = LogEntry {
        timestamp: Local::now().to_rfc3339(),
        level,
        message,
        details,
    };
    
    // Format log line
    let log_line = format!(
        "[{}] [{}] {} {}\n",
        log_entry.timestamp,
        log_entry.level.to_uppercase(),
        log_entry.message,
        log_entry.details.as_deref().unwrap_or("")
    );
    
    // Write to file
    let mut file = OpenOptions::new()
        .create(true)
        .append(true)
        .open(&log_file)
        .map_err(|e| format!("Failed to open log file: {}", e))?;
    
    file.write_all(log_line.as_bytes())
        .map_err(|e| format!("Failed to write to log file: {}", e))?;
    
    Ok(())
}

#[tauri::command]
pub async fn get_log_files(app_handle: AppHandle) -> Result<Vec<String>, String> {
    let log_dir = get_log_dir(&app_handle)?;
    
    let mut log_files: Vec<String> = fs::read_dir(&log_dir)
        .map_err(|e| format!("Failed to read log directory: {}", e))?
        .filter_map(|entry| entry.ok())
        .filter_map(|entry| {
            let file_name = entry.file_name().to_string_lossy().to_string();
            if file_name.starts_with("frontend-") && file_name.ends_with(".log") {
                Some(file_name)
            } else {
                None
            }
        })
        .collect();
    
    log_files.sort();
    log_files.reverse(); // Most recent first
    
    Ok(log_files)
}

#[tauri::command]
pub async fn read_log_file(
    app_handle: AppHandle,
    file_name: String,
    lines: Option<usize>,
) -> Result<String, String> {
    let log_dir = get_log_dir(&app_handle)?;
    let log_file = log_dir.join(&file_name);
    
    // Security check: ensure the file is in the log directory
    if !log_file.starts_with(&log_dir) {
        return Err("Invalid log file path".to_string());
    }
    
    let content = fs::read_to_string(&log_file)
        .map_err(|e| format!("Failed to read log file: {}", e))?;
    
    // If lines is specified, return only the last N lines
    if let Some(n) = lines {
        let lines: Vec<&str> = content.lines().collect();
        let start = lines.len().saturating_sub(n);
        Ok(lines[start..].join("\n"))
    } else {
        Ok(content)
    }
}

#[tauri::command]
pub async fn clear_logs(app_handle: AppHandle) -> Result<(), String> {
    let log_dir = get_log_dir(&app_handle)?;
    
    let log_files: Vec<_> = fs::read_dir(&log_dir)
        .map_err(|e| format!("Failed to read log directory: {}", e))?
        .filter_map(|entry| entry.ok())
        .filter(|entry| {
            entry.file_name()
                .to_str()
                .map(|name| name.starts_with("frontend-") && name.ends_with(".log"))
                .unwrap_or(false)
        })
        .collect();
    
    for entry in log_files {
        if let Err(e) = fs::remove_file(entry.path()) {
            eprintln!("Failed to remove log file: {}", e);
        }
    }
    
    Ok(())
}

#[tauri::command]
pub async fn get_log_config() -> Result<LogConfig, String> {
    // In the future, this could load from persistent settings
    Ok(LogConfig::default())
}

#[tauri::command]
pub async fn update_log_config(config: LogConfig) -> Result<(), String> {
    // In the future, this could save to persistent settings
    // For now, just validate the config
    if config.max_file_size_mb <= 0.0 {
        return Err("Max file size must be positive".to_string());
    }
    if config.max_files == 0 {
        return Err("Max files must be at least 1".to_string());
    }
    
    Ok(())
}