'use client';

import { useStore } from '@/store/useStore';
import { useEffect, useRef } from 'react';
import { RefreshCw, ExternalLink, Smartphone, Monitor } from 'lucide-react';
import { useState } from 'react';

export default function PreviewPanel() {
  const { currentCode } = useStore();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(currentCode);
        doc.close();
      }
    }
  }, [currentCode, key]);

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
  };

  const handleOpenExternal = () => {
    const blob = new Blob([currentCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className="h-full flex flex-col bg-[var(--background)]">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--muted-foreground)]">Preview</span>
          <div className="flex items-center gap-0.5 ml-2 bg-[var(--secondary)] rounded-md p-0.5">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-1 rounded ${
                deviceMode === 'desktop'
                  ? 'bg-[var(--muted)] text-[var(--foreground)]'
                  : 'text-[var(--muted-foreground)]'
              } transition-colors`}
              title="Desktop view"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-1 rounded ${
                deviceMode === 'mobile'
                  ? 'bg-[var(--muted)] text-[var(--foreground)]'
                  : 'text-[var(--muted-foreground)]'
              } transition-colors`}
              title="Mobile view"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleRefresh}
            className="p-1.5 rounded-md hover:bg-[var(--muted)] transition-colors text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            title="Refresh preview"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleOpenExternal}
            className="p-1.5 rounded-md hover:bg-[var(--muted)] transition-colors text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preview iframe */}
      <div className="flex-1 flex items-center justify-center bg-[#1a1a2e] p-2">
        <div
          className={`h-full bg-white rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ${
            deviceMode === 'mobile' ? 'w-[375px]' : 'w-full'
          }`}
        >
          <iframe
            key={key}
            ref={iframeRef}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin"
            title="Preview"
          />
        </div>
      </div>
    </div>
  );
}
