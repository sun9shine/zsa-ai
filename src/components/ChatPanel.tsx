'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Bot, User, Loader2 } from 'lucide-react';
import { useStore, Message } from '@/store/useStore';
import { generateResponse } from '@/lib/ai-service';

export default function ChatPanel() {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    messages,
    addMessage,
    clearMessages,
    models,
    activeModelId,
    isGenerating,
    setIsGenerating,
    setCurrentCode,
    setShowAdmin,
  } = useStore();

  const activeModel = models.find((m) => m.id === activeModelId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    if (!activeModel) {
      addMessage({
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Please configure an AI model first. Click the settings icon to open the admin panel.',
        timestamp: Date.now(),
      });
      setShowAdmin(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    addMessage(userMessage);
    setInput('');
    setIsGenerating(true);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        content: m.code ? `${m.content}\n\`\`\`html\n${m.code}\n\`\`\`` : m.content,
      }));

      const response = await generateResponse(input.trim(), activeModel, history);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        code: response.code,
        timestamp: Date.now(),
      };

      addMessage(assistantMessage);

      if (response.code) {
        setCurrentCode(response.code);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error: ${errorMessage}. Please check your model configuration.`,
        timestamp: Date.now(),
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-[var(--primary)]" />
          <h2 className="text-sm font-semibold">Chat to Code</h2>
        </div>
        <div className="flex items-center gap-2">
          {activeModel && (
            <span className="text-xs px-2 py-1 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]">
              {activeModel.name}
            </span>
          )}
          <button
            onClick={clearMessages}
            className="p-1.5 rounded-md hover:bg-[var(--muted)] transition-colors text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            title="Clear chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[var(--muted)] flex items-center justify-center">
              <Bot className="w-8 h-8 text-[var(--primary)]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Chat to Code</h3>
              <p className="text-sm text-[var(--muted-foreground)] max-w-xs">
                Describe what you want to build and I will generate the code for you with a live preview.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2 w-full max-w-xs">
              {[
                'Build a landing page with a hero section',
                'Create a todo app with dark theme',
                'Design a pricing table with 3 plans',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="text-xs text-left px-3 py-2 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--muted)] transition-all text-[var(--muted-foreground)]"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 animate-fade-in ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-[var(--primary)] flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                msg.role === 'user'
                  ? 'bg-[var(--primary)] text-white rounded-br-md'
                  : 'bg-[var(--secondary)] text-[var(--foreground)] rounded-bl-md'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
              {msg.code && (
                <button
                  onClick={() => setCurrentCode(msg.code!)}
                  className="mt-2 text-xs px-2 py-1 rounded bg-[var(--muted)] hover:bg-[var(--border)] transition-colors"
                >
                  Show in Preview
                </button>
              )}
            </div>
            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-full bg-[var(--muted)] flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-[var(--muted-foreground)]" />
              </div>
            )}
          </div>
        ))}

        {isGenerating && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-7 h-7 rounded-full bg-[var(--primary)] flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-[var(--secondary)] rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex items-center gap-1">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[var(--border)]">
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                autoResize();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Describe what you want to build..."
              className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--secondary)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors"
              rows={1}
              disabled={isGenerating}
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isGenerating}
            className="flex-shrink-0 w-10 h-10 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
