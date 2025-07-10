import { useState, useEffect } from 'react';

interface ZoomSettings {
  scale: number;
  minScale: number;
  maxScale: number;
  scaleStep: number;
}

const DEFAULT_ZOOM_SETTINGS: ZoomSettings = {
  scale: 1,
  minScale: 0.25,
  maxScale: 5,
  scaleStep: 0.1,
};

/**
 * Custom hook for handling zoom functionality with Ctrl + mouse wheel
 * Similar to Chrome's zoom behavior
 */
export const useZoom = (initialSettings: Partial<ZoomSettings> = {}) => {
  const [settings, setSettings] = useState<ZoomSettings>({
    ...DEFAULT_ZOOM_SETTINGS,
    ...initialSettings,
  });

  // Load saved zoom level from localStorage
  useEffect(() => {
    const savedScale = localStorage.getItem('claudia-zoom-scale');
    if (savedScale) {
      const scale = parseFloat(savedScale);
      if (!isNaN(scale) && scale >= settings.minScale && scale <= settings.maxScale) {
        setSettings(prev => ({ ...prev, scale }));
      }
    }
  }, [settings.minScale, settings.maxScale]);

  // Save zoom level to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('claudia-zoom-scale', settings.scale.toString());
    
    // Apply zoom to the document body
    document.body.style.transform = `scale(${settings.scale})`;
    document.body.style.transformOrigin = 'top left';
    
    // Adjust body dimensions to prevent scrollbars when zoomed out
    if (settings.scale < 1) {
      document.body.style.width = `${100 / settings.scale}%`;
      document.body.style.height = `${100 / settings.scale}%`;
    } else {
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    }
  }, [settings.scale]);

  // Handle wheel event for zoom
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      // Only handle if Ctrl key is pressed
      if (!event.ctrlKey && !event.metaKey) return;
      
      event.preventDefault();
      
      const delta = event.deltaY;
      const direction = delta > 0 ? -1 : 1; // Negative delta = zoom in, positive = zoom out
      
      setSettings(prev => {
        const newScale = prev.scale + (direction * prev.scaleStep);
        const clampedScale = Math.max(prev.minScale, Math.min(prev.maxScale, newScale));
        
        // Round to 2 decimal places to avoid floating point precision issues
        return {
          ...prev,
          scale: Math.round(clampedScale * 100) / 100,
        };
      });
    };

    // Add event listener to document
    document.addEventListener('wheel', handleWheel, { passive: false });
    
    // Cleanup
    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Handle keyboard shortcuts for zoom
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;
      
      switch (event.key) {
        case '0':
          // Ctrl+0: Reset zoom to 100%
          event.preventDefault();
          setSettings(prev => ({ ...prev, scale: 1 }));
          break;
        case '+':
        case '=':
          // Ctrl++: Zoom in
          event.preventDefault();
          setSettings(prev => {
            const newScale = prev.scale + prev.scaleStep;
            return {
              ...prev,
              scale: Math.min(prev.maxScale, Math.round(newScale * 100) / 100),
            };
          });
          break;
        case '-':
          // Ctrl+-: Zoom out
          event.preventDefault();
          setSettings(prev => {
            const newScale = prev.scale - prev.scaleStep;
            return {
              ...prev,
              scale: Math.max(prev.minScale, Math.round(newScale * 100) / 100),
            };
          });
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const zoomIn = () => {
    setSettings(prev => {
      const newScale = prev.scale + prev.scaleStep;
      return {
        ...prev,
        scale: Math.min(prev.maxScale, Math.round(newScale * 100) / 100),
      };
    });
  };

  const zoomOut = () => {
    setSettings(prev => {
      const newScale = prev.scale - prev.scaleStep;
      return {
        ...prev,
        scale: Math.max(prev.minScale, Math.round(newScale * 100) / 100),
      };
    });
  };

  const resetZoom = () => {
    setSettings(prev => ({ ...prev, scale: 1 }));
  };

  const setZoom = (scale: number) => {
    const clampedScale = Math.max(settings.minScale, Math.min(settings.maxScale, scale));
    setSettings(prev => ({ ...prev, scale: Math.round(clampedScale * 100) / 100 }));
  };

  return {
    scale: settings.scale,
    zoomIn,
    zoomOut,
    resetZoom,
    setZoom,
    canZoomIn: settings.scale < settings.maxScale,
    canZoomOut: settings.scale > settings.minScale,
    zoomPercentage: Math.round(settings.scale * 100),
  };
};
