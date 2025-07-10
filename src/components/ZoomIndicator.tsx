import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useZoom } from '@/lib/useZoom';

interface ZoomIndicatorProps {
  className?: string;
}

/**
 * Zoom indicator component that shows current zoom level and provides zoom controls
 * Automatically hides after a period of inactivity
 */
export const ZoomIndicator: React.FC<ZoomIndicatorProps> = ({ className = '' }) => {
  const { scale, zoomIn, zoomOut, resetZoom, canZoomIn, canZoomOut, zoomPercentage } = useZoom();
  const [isVisible, setIsVisible] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  // Show indicator and set auto-hide timer
  const showIndicator = () => {
    setIsVisible(true);
    
    // Clear existing timeout
    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }
    
    // Set new timeout to hide after 3 seconds
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
    
    setHideTimeout(timeout);
  };

  // Listen for zoom changes to show indicator
  React.useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) {
        showIndicator();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && ['0', '+', '=', '-'].includes(event.key)) {
        showIndicator();
      }
    };

    document.addEventListener('wheel', handleWheel);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [hideTimeout]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className={`fixed bottom-4 right-4 z-50 zoom-fixed ${className}`}
          onMouseEnter={() => {
            // Keep visible while hovering
            if (hideTimeout) {
              clearTimeout(hideTimeout);
              setHideTimeout(null);
            }
          }}
          onMouseLeave={() => {
            // Resume auto-hide when not hovering
            showIndicator();
          }}
        >
          <div className="bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
            <div className="flex items-center gap-2">
              {/* Zoom Out Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  zoomOut();
                  showIndicator();
                }}
                disabled={!canZoomOut}
                className="h-8 w-8 p-0"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>

              {/* Zoom Percentage Display */}
              <div className="flex items-center gap-1 min-w-[60px] justify-center">
                <span className="text-sm font-medium tabular-nums">
                  {zoomPercentage}%
                </span>
              </div>

              {/* Zoom In Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  zoomIn();
                  showIndicator();
                }}
                disabled={!canZoomIn}
                className="h-8 w-8 p-0"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>

              {/* Reset Zoom Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  resetZoom();
                  showIndicator();
                }}
                disabled={scale === 1}
                className="h-8 w-8 p-0"
                title="Reset zoom (Ctrl+0)"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {/* Keyboard hint */}
            <div className="text-xs text-muted-foreground mt-1 text-center">
              Ctrl + 滾輪縮放
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
