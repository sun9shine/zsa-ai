import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  code?: string;
  timestamp: number;
}

export interface AIModelConfig {
  id: string;
  name: string;
  type: 'online' | 'local';
  provider: 'openai' | 'anthropic' | 'ollama' | 'custom';
  apiKey?: string;
  baseUrl?: string;
  model: string;
  isActive: boolean;
}

interface AppState {
  // Messages
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;

  // Current code
  currentCode: string;
  setCurrentCode: (code: string) => void;

  // View mode
  viewMode: 'code' | 'preview' | 'split';
  setViewMode: (mode: 'code' | 'preview' | 'split') => void;

  // AI Models
  models: AIModelConfig[];
  activeModelId: string | null;
  addModel: (model: AIModelConfig) => void;
  updateModel: (id: string, updates: Partial<AIModelConfig>) => void;
  removeModel: (id: string) => void;
  setActiveModel: (id: string) => void;

  // Loading
  isGenerating: boolean;
  setIsGenerating: (val: boolean) => void;

  // Admin panel
  showAdmin: boolean;
  setShowAdmin: (val: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Messages
      messages: [],
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      clearMessages: () => set({ messages: [] }),

      // Current code
      currentCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
    }
    .container {
      padding: 2rem;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.2rem;
      opacity: 0.9;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to Chat to Code</h1>
    <p>Start chatting to generate your code!</p>
  </div>
</body>
</html>`,
      setCurrentCode: (code) => set({ currentCode: code }),

      // View mode
      viewMode: 'preview',
      setViewMode: (mode) => set({ viewMode: mode }),

      // AI Models
      models: [],
      activeModelId: null,
      addModel: (model) =>
        set((state) => ({ models: [...state.models, model] })),
      updateModel: (id, updates) =>
        set((state) => ({
          models: state.models.map((m) =>
            m.id === id ? { ...m, ...updates } : m
          ),
        })),
      removeModel: (id) =>
        set((state) => ({
          models: state.models.filter((m) => m.id !== id),
          activeModelId: state.activeModelId === id ? null : state.activeModelId,
        })),
      setActiveModel: (id) => set({ activeModelId: id }),

      // Loading
      isGenerating: false,
      setIsGenerating: (val) => set({ isGenerating: val }),

      // Admin panel
      showAdmin: false,
      setShowAdmin: (val) => set({ showAdmin: val }),
    }),
    {
      name: 'chat-to-code-storage',
      partialize: (state) => ({
        models: state.models,
        activeModelId: state.activeModelId,
      }),
    }
  )
);
