import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { logger, LogConfig } from '@/lib/logger';
import { RefreshCw, Download, Trash2, FileText, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function LogViewer() {
  const { t } = useTranslation();
  const [logFiles, setLogFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [logContent, setLogContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [logConfig, setLogConfig] = useState<LogConfig>(logger.getConfig());
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [activeTab, setActiveTab] = useState('viewer');

  // Load log files on mount
  useEffect(() => {
    loadLogFiles();
  }, []);

  // Auto-refresh log content
  useEffect(() => {
    if (!autoRefresh || !selectedFile) return;

    const interval = setInterval(() => {
      loadLogContent(selectedFile);
    }, 2000);

    return () => clearInterval(interval);
  }, [autoRefresh, selectedFile]);

  const loadLogFiles = async () => {
    try {
      const files = await logger.getLogFiles();
      setLogFiles(files);
      
      // Auto-select the most recent file
      if (files.length > 0 && !selectedFile) {
        setSelectedFile(files[0]);
        await loadLogContent(files[0]);
      }
    } catch (error) {
      console.error('Failed to load log files:', error);
    }
  };

  const loadLogContent = async (fileName: string) => {
    if (!fileName) return;
    
    setLoading(true);
    try {
      const content = await logger.readLogFile(fileName);
      setLogContent(content);
    } catch (error) {
      console.error('Failed to load log content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (fileName: string) => {
    setSelectedFile(fileName);
    loadLogContent(fileName);
  };

  const handleClearLogs = async () => {
    if (!confirm(t('logs.confirmClear', 'Are you sure you want to clear all log files?'))) {
      return;
    }

    try {
      await logger.clearLogs();
      setLogFiles([]);
      setSelectedFile('');
      setLogContent('');
    } catch (error) {
      console.error('Failed to clear logs:', error);
    }
  };

  const handleConfigUpdate = async (newConfig: LogConfig) => {
    try {
      await logger.updateConfig(newConfig);
      setLogConfig(newConfig);
    } catch (error) {
      console.error('Failed to update log config:', error);
    }
  };

  const downloadLogFile = () => {
    if (!logContent || !selectedFile) return;

    const blob = new Blob([logContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getLogLevelBadge = (level: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      'ERROR': 'destructive',
      'WARN': 'secondary',
      'INFO': 'default',
      'DEBUG': 'outline'
    };

    return <Badge variant={variants[level] || 'default'}>{level}</Badge>;
  };

  const highlightedContent = useCallback(() => {
    if (!searchTerm || !logContent) return logContent;

    const lines = logContent.split('\n');
    return lines.map((line, index) => {
      if (line.toLowerCase().includes(searchTerm.toLowerCase())) {
        // Parse log line to extract level
        const match = line.match(/\[([^\]]+)\]\s*\[([^\]]+)\]/);
        if (match) {
          const [, timestamp, level] = match;
          const message = line.substring(match[0].length).trim();
          
          return (
            <div key={index} className="bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded">
              <span className="text-xs text-gray-500">{timestamp}</span>
              {' '}
              {getLogLevelBadge(level)}
              {' '}
              <span className="font-mono text-sm">{message}</span>
            </div>
          );
        }
      }
      
      // Regular line parsing
      const match = line.match(/\[([^\]]+)\]\s*\[([^\]]+)\]/);
      if (match) {
        const [, timestamp, level] = match;
        const message = line.substring(match[0].length).trim();
        
        return (
          <div key={index} className="px-2 py-0.5">
            <span className="text-xs text-gray-500">{timestamp}</span>
            {' '}
            {getLogLevelBadge(level)}
            {' '}
            <span className="font-mono text-sm">{message}</span>
          </div>
        );
      }
      
      return <div key={index} className="font-mono text-sm px-2">{line}</div>;
    });
  }, [logContent, searchTerm]);

  return (
    <div className="h-full flex flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList>
          <TabsTrigger value="viewer">{t('logs.viewer', 'Log Viewer')}</TabsTrigger>
          <TabsTrigger value="settings">{t('logs.settings', 'Settings')}</TabsTrigger>
        </TabsList>

        <TabsContent value="viewer" className="flex-1 flex flex-col mt-4">
          <div className="flex items-center gap-4 mb-4">
            <Select value={selectedFile} onValueChange={handleFileSelect}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder={t('logs.selectFile', 'Select a log file')} />
              </SelectTrigger>
              <SelectContent>
                {logFiles.map(file => (
                  <SelectItem key={file} value={file}>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      {file}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder={t('logs.search', 'Search logs...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <Switch
                checked={autoRefresh}
                onCheckedChange={setAutoRefresh}
                id="auto-refresh"
              />
              <Label htmlFor="auto-refresh">{t('logs.autoRefresh', 'Auto-refresh')}</Label>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => loadLogContent(selectedFile)}
              disabled={!selectedFile || loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={downloadLogFile}
              disabled={!selectedFile || !logContent}
            >
              <Download className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={handleClearLogs}
              disabled={logFiles.length === 0}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <Card className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 p-4">
              {loading ? (
                <div className="text-center py-8 text-gray-500">
                  {t('logs.loading', 'Loading logs...')}
                </div>
              ) : logContent ? (
                <div className="space-y-1">
                  {highlightedContent()}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {selectedFile 
                    ? t('logs.empty', 'No log content')
                    : t('logs.selectPrompt', 'Select a log file to view')}
                </div>
              )}
            </ScrollArea>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('logs.configTitle', 'Logging Configuration')}</CardTitle>
              <CardDescription>
                {t('logs.configDescription', 'Configure how frontend logs are captured and stored')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={logConfig.enabled}
                  onCheckedChange={(enabled) => 
                    handleConfigUpdate({ ...logConfig, enabled })
                  }
                  id="logging-enabled"
                />
                <Label htmlFor="logging-enabled">
                  {t('logs.enableLogging', 'Enable frontend logging')}
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-file-size">
                  {t('logs.maxFileSize', 'Max file size (MB)')}
                </Label>
                <Input
                  id="max-file-size"
                  type="number"
                  min="1"
                  max="100"
                  value={logConfig.max_file_size_mb}
                  onChange={(e) => 
                    handleConfigUpdate({ 
                      ...logConfig, 
                      max_file_size_mb: parseFloat(e.target.value) || 10 
                    })
                  }
                  disabled={!logConfig.enabled}
                />
                <p className="text-sm text-gray-500">
                  {t('logs.maxFileSizeHelp', 'Log files will be rotated when they exceed this size')}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-files">
                  {t('logs.maxFiles', 'Max number of log files')}
                </Label>
                <Input
                  id="max-files"
                  type="number"
                  min="1"
                  max="20"
                  value={logConfig.max_files}
                  onChange={(e) => 
                    handleConfigUpdate({ 
                      ...logConfig, 
                      max_files: parseInt(e.target.value) || 5 
                    })
                  }
                  disabled={!logConfig.enabled}
                />
                <p className="text-sm text-gray-500">
                  {t('logs.maxFilesHelp', 'Older log files will be deleted when this limit is reached')}
                </p>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">{t('logs.testTitle', 'Test Logging')}</h4>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => console.log('Test log message')}
                  >
                    Log
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => console.info('Test info message')}
                  >
                    Info
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => console.warn('Test warning message')}
                  >
                    Warn
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => console.error('Test error message')}
                  >
                    Error
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}