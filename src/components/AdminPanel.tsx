'use client';

import { useState } from 'react';
import { X, Plus, Trash2, Check, Server, Cloud, Cpu } from 'lucide-react';
import { useStore, AIModelConfig } from '@/store/useStore';

export default function AdminPanel() {
  const { models, addModel, updateModel, removeModel, activeModelId, setActiveModel, setShowAdmin } =
    useStore();

  const [isAdding, setIsAdding] = useState(false);
  const [newModel, setNewModel] = useState<Partial<AIModelConfig>>({
    name: '',
    type: 'online',
    provider: 'openai',
    apiKey: '',
    baseUrl: '',
    model: '',
    isActive: true,
  });

  const handleAddModel = () => {
    if (!newModel.name || !newModel.model) return;

    const model: AIModelConfig = {
      id: Date.now().toString(),
      name: newModel.name!,
      type: newModel.type as 'online' | 'local',
      provider: newModel.provider as AIModelConfig['provider'],
      apiKey: newModel.apiKey || undefined,
      baseUrl: newModel.baseUrl || undefined,
      model: newModel.model!,
      isActive: true,
    };

    addModel(model);

    if (!activeModelId) {
      setActiveModel(model.id);
    }

    setNewModel({
      name: '',
      type: 'online',
      provider: 'openai',
      apiKey: '',
      baseUrl: '',
      model: '',
      isActive: true,
    });
    setIsAdding(false);
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'openai':
      case 'anthropic':
        return <Cloud className="w-4 h-4" />;
      case 'ollama':
        return <Cpu className="w-4 h-4" />;
      case 'custom':
        return <Server className="w-4 h-4" />;
      default:
        return <Cloud className="w-4 h-4" />;
    }
  };

  const getDefaultBaseUrl = (provider: string) => {
    switch (provider) {
      case 'openai':
        return 'https://api.openai.com/v1';
      case 'anthropic':
        return 'https://api.anthropic.com/v1';
      case 'ollama':
        return 'http://localhost:11434';
      default:
        return '';
    }
  };

  const getModelSuggestions = (provider: string) => {
    switch (provider) {
      case 'openai':
        return ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'];
      case 'anthropic':
        return ['claude-sonnet-4-20250514', 'claude-3-5-haiku-20241022', 'claude-3-opus-20240229'];
      case 'ollama':
        return ['llama3.1', 'codellama', 'mistral', 'deepseek-coder'];
      default:
        return [];
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[var(--card)] rounded-2xl shadow-2xl border border-[var(--border)] w-full max-w-2xl max-h-[85vh] overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
          <div>
            <h2 className="text-lg font-semibold">AI Model Configuration</h2>
            <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
              Configure online APIs or local AI models
            </p>
          </div>
          <button
            onClick={() => setShowAdmin(false)}
            className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 max-h-[calc(85vh-130px)]">
          {/* Existing models */}
          {models.length > 0 && (
            <div className="space-y-3 mb-6">
              <h3 className="text-sm font-medium text-[var(--muted-foreground)]">Configured Models</h3>
              {models.map((model) => (
                <div
                  key={model.id}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                    activeModelId === model.id
                      ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                      : 'border-[var(--border)] hover:border-[var(--muted-foreground)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        model.type === 'local'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      {getProviderIcon(model.provider)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{model.name}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        {model.provider} / {model.model}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {activeModelId === model.id ? (
                      <span className="text-xs px-2 py-1 rounded-full bg-[var(--primary)] text-white">
                        Active
                      </span>
                    ) : (
                      <button
                        onClick={() => setActiveModel(model.id)}
                        className="text-xs px-2 py-1 rounded-full border border-[var(--border)] hover:border-[var(--primary)] transition-colors"
                      >
                        Activate
                      </button>
                    )}
                    <button
                      onClick={() => removeModel(model.id)}
                      className="p-1.5 rounded-md hover:bg-[var(--destructive)]/20 text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add new model */}
          {!isAdding ? (
            <button
              onClick={() => setIsAdding(true)}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-[var(--border)] hover:border-[var(--primary)] text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-all"
            >
              <Plus className="w-5 h-5" />
              <span className="text-sm font-medium">Add AI Model</span>
            </button>
          ) : (
            <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--secondary)] space-y-4">
              <h3 className="text-sm font-semibold">Add New Model</h3>

              {/* Type selection */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setNewModel({ ...newModel, type: 'online', provider: 'openai' })}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                    newModel.type === 'online'
                      ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]'
                      : 'border-[var(--border)] text-[var(--muted-foreground)]'
                  }`}
                >
                  <Cloud className="w-5 h-5 mx-auto mb-1" />
                  Online API
                </button>
                <button
                  onClick={() => setNewModel({ ...newModel, type: 'local', provider: 'ollama' })}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                    newModel.type === 'local'
                      ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]'
                      : 'border-[var(--border)] text-[var(--muted-foreground)]'
                  }`}
                >
                  <Cpu className="w-5 h-5 mx-auto mb-1" />
                  Local Model
                </button>
              </div>

              {/* Provider */}
              <div>
                <label className="text-xs text-[var(--muted-foreground)] mb-1 block">Provider</label>
                <select
                  value={newModel.provider}
                  onChange={(e) =>
                    setNewModel({
                      ...newModel,
                      provider: e.target.value as AIModelConfig['provider'],
                      baseUrl: getDefaultBaseUrl(e.target.value),
                    })
                  }
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--primary)]"
                >
                  {newModel.type === 'online' ? (
                    <>
                      <option value="openai">OpenAI</option>
                      <option value="anthropic">Anthropic</option>
                      <option value="custom">Custom (OpenAI Compatible)</option>
                    </>
                  ) : (
                    <>
                      <option value="ollama">Ollama</option>
                      <option value="custom">Custom Local</option>
                    </>
                  )}
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="text-xs text-[var(--muted-foreground)] mb-1 block">Display Name</label>
                <input
                  type="text"
                  value={newModel.name}
                  onChange={(e) => setNewModel({ ...newModel, name: e.target.value })}
                  placeholder="e.g., GPT-4o, Local Llama"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--primary)]"
                />
              </div>

              {/* Model */}
              <div>
                <label className="text-xs text-[var(--muted-foreground)] mb-1 block">Model Name</label>
                <input
                  type="text"
                  value={newModel.model}
                  onChange={(e) => setNewModel({ ...newModel, model: e.target.value })}
                  placeholder="e.g., gpt-4o, llama3.1"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--primary)]"
                  list="model-suggestions"
                />
                <datalist id="model-suggestions">
                  {getModelSuggestions(newModel.provider || '').map((m) => (
                    <option key={m} value={m} />
                  ))}
                </datalist>
              </div>

              {/* Base URL */}
              <div>
                <label className="text-xs text-[var(--muted-foreground)] mb-1 block">
                  Base URL {newModel.provider !== 'custom' && '(optional)'}
                </label>
                <input
                  type="text"
                  value={newModel.baseUrl}
                  onChange={(e) => setNewModel({ ...newModel, baseUrl: e.target.value })}
                  placeholder={getDefaultBaseUrl(newModel.provider || '')}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--primary)] font-mono text-xs"
                />
              </div>

              {/* API Key */}
              {newModel.type === 'online' && (
                <div>
                  <label className="text-xs text-[var(--muted-foreground)] mb-1 block">API Key</label>
                  <input
                    type="password"
                    value={newModel.apiKey}
                    onChange={(e) => setNewModel({ ...newModel, apiKey: e.target.value })}
                    placeholder="sk-..."
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--primary)] font-mono"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 rounded-lg text-sm border border-[var(--border)] hover:bg-[var(--muted)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddModel}
                  disabled={!newModel.name || !newModel.model}
                  className="px-4 py-2 rounded-lg text-sm bg-[var(--primary)] text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Add Model
                </button>
              </div>
            </div>
          )}

          {/* Info box */}
          <div className="mt-6 p-4 rounded-xl bg-[var(--muted)]/50 border border-[var(--border)]">
            <h4 className="text-xs font-semibold text-[var(--muted-foreground)] mb-2">Supported Providers</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-[var(--muted-foreground)]">
              <div className="flex items-center gap-2">
                <Cloud className="w-3 h-3 text-blue-400" />
                <span>OpenAI (GPT-4, GPT-3.5)</span>
              </div>
              <div className="flex items-center gap-2">
                <Cloud className="w-3 h-3 text-purple-400" />
                <span>Anthropic (Claude)</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-3 h-3 text-emerald-400" />
                <span>Ollama (Local Models)</span>
              </div>
              <div className="flex items-center gap-2">
                <Server className="w-3 h-3 text-amber-400" />
                <span>Custom Endpoints</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
