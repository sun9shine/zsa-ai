'use client';

import { useStore } from '@/store/useStore';
import { Code, Eye, Columns } from 'lucide-react';
import CodeEditor from './CodeEditor';
import PreviewPanel from './PreviewPanel';

export default function RightPanel() {
  const { viewMode, setViewMode } = useStore();

  return (
    <div className="h-full flex flex-col">
      {/* Tab bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)] bg-[var(--background)]">
        <div className="flex items-center gap-1 bg-[var(--secondary)] rounded-lg p-0.5">
          <button
            onClick={() => setViewMode('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              viewMode === 'preview'
                ? 'bg-[var(--primary)] text-white shadow-sm'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Preview
          </button>
          <button
            onClick={() => setViewMode('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              viewMode === 'code'
                ? 'bg-[var(--primary)] text-white shadow-sm'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            Code
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              viewMode === 'split'
                ? 'bg-[var(--primary)] text-white shadow-sm'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            Split
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {viewMode === 'preview' && <PreviewPanel />}
        {viewMode === 'code' && <CodeEditor />}
        {viewMode === 'split' && (
          <div className="flex h-full">
            <div className="w-1/2 border-r border-[var(--border)]">
              <CodeEditor />
            </div>
            <div className="w-1/2">
              <PreviewPanel />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
