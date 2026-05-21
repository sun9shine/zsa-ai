'use client';

import { useState, useRef, useCallback } from 'react';
import { Settings, GripVertical } from 'lucide-react';
import ChatPanel from '@/components/ChatPanel';
import RightPanel from '@/components/RightPanel';
import AdminPanel from '@/components/AdminPanel';
import { useStore } from '@/store/useStore';

export default function Home() {
  const { showAdmin, setShowAdmin } = useStore();
  const [leftWidth, setLeftWidth] = useState(35); // percentage
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newWidth = ((e.clientX - rect.left) / rect.width) * 100;
    if (newWidth >= 20 && newWidth <= 60) {
      setLeftWidth(newWidth);
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen flex relative"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Left Panel - Chat */}
      <div
        className="h-full border-r border-[var(--border)] flex-shrink-0"
        style={{ width: `${leftWidth}%` }}
      >
        <ChatPanel />
      </div>

      {/* Resize Handle */}
      <div
        className="resize-handle flex items-center justify-center group"
        onMouseDown={handleMouseDown}
      >
        <GripVertical className="w-3 h-3 text-[var(--muted-foreground)] opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Right Panel - Code/Preview */}
      <div className="h-full flex-1 min-w-0">
        <RightPanel />
      </div>

      {/* Admin Settings Button */}
      <button
        onClick={() => setShowAdmin(true)}
        className="fixed bottom-4 right-4 z-40 w-12 h-12 rounded-full bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/25 flex items-center justify-center hover:scale-105 transition-transform"
        title="AI Model Settings"
      >
        <Settings className="w-5 h-5" />
      </button>

      {/* Admin Panel Modal */}
      {showAdmin && <AdminPanel />}
    </div>
  );
}
