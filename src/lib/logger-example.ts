/**
 * Example usage of the logger system
 * 
 * The logger automatically intercepts all console methods once initialized.
 * You can continue using console.log, console.error, etc. as normal.
 */

// import { logger } from './logger';

// Example 1: Basic logging (these will be automatically captured)
console.log('Application started');
console.info('User logged in', { userId: 123, timestamp: new Date() });
console.warn('API rate limit approaching', { remaining: 10 });
console.error('Failed to load resource', new Error('Network error'));

// Example 2: Complex object logging
const complexData = {
  user: {
    id: 123,
    name: 'John Doe',
    roles: ['admin', 'user']
  },
  session: {
    started: new Date(),
    duration: 3600
  }
};
console.log('Session data:', complexData);

// Example 3: Error with stack trace
try {
  throw new Error('Something went wrong!');
} catch (error) {
  console.error('Caught error:', error);
}

// Example 4: Managing logger programmatically
/*
// Example: Manage logger configuration
// async function manageLogger() {
  // Get current config
  const config = logger.getConfig();
  console.log('Current log config:', config);

  // Update config
  await logger.updateConfig({
    max_file_size_mb: 20,
    max_files: 10,
    enabled: true
  });

  // Get list of log files
  const logFiles = await logger.getLogFiles();
  console.log('Available log files:', logFiles);

  // Read a specific log file
  if (logFiles.length > 0) {
    const content = await logger.readLogFile(logFiles[0], 100); // Last 100 lines
    console.log('Log content preview:', content);
  }

  // Clear all logs (use with caution!)
  // await logger.clearLogs();

  // Stop logging temporarily
  // logger.stop();
// }
*/

// Example 5: Integration with React components
export function useLogger() {
  // Log component lifecycle
  console.log('Component mounted');
  
  return {
    logAction: (action: string, data?: any) => {
      console.log(`User action: ${action}`, data);
    },
    logError: (error: Error, context?: string) => {
      console.error(`Error in ${context || 'unknown context'}:`, error);
    }
  };
}

// Example 6: Performance logging
function measurePerformance(operation: string, fn: () => void) {
  const start = performance.now();
  try {
    fn();
    const duration = performance.now() - start;
    console.log(`Performance: ${operation} took ${duration.toFixed(2)}ms`);
  } catch (error) {
    console.error(`Performance: ${operation} failed`, error);
  }
}

// Usage
measurePerformance('Database query', () => {
  // Simulate some work
  for (let i = 0; i < 1000000; i++) {
    Math.sqrt(i);
  }
});