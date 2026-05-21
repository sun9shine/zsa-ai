'use client';

import { useStore } from '@/store/useStore';
import { Copy, Check, Download } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function CodeEditor() {
  const { currentCode } = useStore();
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Simple syntax highlighting
  const highlightCode = (code: string) => {
    return code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // HTML tags
      .replace(/(&lt;\/?)([\w-]+)/g, '$1<span style="color: #f472b6">$2</span>')
      // Attributes
      .replace(/([\w-]+)(=)/g, '<span style="color: #93c5fd">$1</span>$2')
      // Strings
      .replace(/(".*?"|'.*?')/g, '<span style="color: #86efac">$1</span>')
      // Comments
      .replace(/(&lt;!--.*?--&gt;)/g, '<span style="color: #6b7280">$1</span>')
      // CSS properties
      .replace(/([\w-]+)(\s*:)/g, '<span style="color: #c4b5fd">$1</span>$2')
      // Numbers
      .replace(/\b(\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw|s|ms)?)\b/g, '<span style="color: #fbbf24">$1</span>');
  };

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.innerHTML = highlightCode(currentCode);
    }
  }, [currentCode]);

  return (
    <div className="h-full flex flex-col bg-[#1e1e2e]">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)] bg-[#181825]">
        <span className="text-xs text-[var(--muted-foreground)] font-mono">index.html</span>
        <div className="flex items-center gap-1">
          <button
            onClick={handleDownload}
            className="p-1.5 rounded-md hover:bg-[var(--muted)] transition-colors text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            title="Download HTML"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md hover:bg-[var(--muted)] transition-colors text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            title="Copy code"
          >
            {copied ? (
              <Check className="w-4 h-4 text-[var(--success)]" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Code area */}
      <div className="flex-1 overflow-auto p-4">
        <div className="flex">
          {/* Line numbers */}
          <div className="pr-4 text-right select-none text-[var(--muted-foreground)] text-xs font-mono leading-5 flex-shrink-0">
            {currentCode.split('\n').map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          {/* Code */}
          <pre
            ref={codeRef}
            className="text-xs font-mono leading-5 text-[var(--foreground)] whitespace-pre overflow-x-auto flex-1"
          />
        </div>
      </div>
    </div>
  );
}
