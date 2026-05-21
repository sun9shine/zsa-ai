// ============================================
// ZSA AI - Chat to Code
// Main Application Logic
// ============================================

class App {
  constructor() {
    this.messages = [];
    this.models = [];
    this.activeModelId = null;
    this.currentCode = this.getDefaultCode();
    this.isGenerating = false;
    this.currentView = 'preview';
    this.deviceMode = 'desktop';

    this.init();
  }

  async init() {
    // Load saved models
    await this.loadModels();

    // Setup UI
    this.setupTitlebar();
    this.setupResizeHandle();
    this.setupChat();
    this.setupTabs();
    this.setupDeviceToggle();
    this.setupActions();
    this.setupSettings();

    // Render initial state
    this.updatePreview();
    this.updateModelIndicator();
  }

  // ============ DATA ============

  async loadModels() {
    try {
      this.models = (await window.electronAPI.getStore('models')) || [];
      this.activeModelId = await window.electronAPI.getStore('activeModelId');
    } catch (e) {
      this.models = [];
      this.activeModelId = null;
    }
  }

  async saveModels() {
    await window.electronAPI.setStore('models', this.models);
    await window.electronAPI.setStore('activeModelId', this.activeModelId);
  }

  getActiveModel() {
    return this.models.find(m => m.id === this.activeModelId) || null;
  }

  getDefaultCode() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
    }
    .container {
      padding: 3rem;
      animation: fadeIn 0.8s ease;
    }
    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      text-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }
    p {
      font-size: 1.3rem;
      opacity: 0.9;
      max-width: 500px;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>ZSA AI</h1>
    <p>Start chatting to generate code with a live preview</p>
  </div>
</body>
</html>`;
  }

  // ============ TITLEBAR ============

  setupTitlebar() {
    document.getElementById('btn-minimize').addEventListener('click', () => {
      window.electronAPI.minimize();
    });
    document.getElementById('btn-maximize').addEventListener('click', () => {
      window.electronAPI.maximize();
    });
    document.getElementById('btn-close').addEventListener('click', () => {
      window.electronAPI.close();
    });
  }

  // ============ RESIZE HANDLE ============

  setupResizeHandle() {
    const handle = document.getElementById('resize-handle');
    const chatPanel = document.getElementById('chat-panel');
    let isDragging = false;

    handle.addEventListener('mousedown', (e) => {
      isDragging = true;
      handle.classList.add('dragging');
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const appWidth = document.getElementById('app').offsetWidth;
      const newWidth = (e.clientX / appWidth) * 100;
      if (newWidth >= 20 && newWidth <= 60) {
        chatPanel.style.width = newWidth + '%';
      }
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        handle.classList.remove('dragging');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    });
  }

  // ============ CHAT ============

  setupChat() {
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('btn-send');
    const newChatBtn = document.getElementById('btn-new-chat');

    // Auto-resize textarea
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 120) + 'px';
      sendBtn.disabled = !input.value.trim();
    });

    // Send on Enter (Shift+Enter for newline)
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    sendBtn.addEventListener('click', () => this.sendMessage());
    newChatBtn.addEventListener('click', () => this.clearChat());

    // Suggestion buttons
    document.querySelectorAll('.suggestion-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        input.value = btn.dataset.prompt;
        input.dispatchEvent(new Event('input'));
        this.sendMessage();
      });
    });
  }

  async sendMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text || this.isGenerating) return;

    const model = this.getActiveModel();
    if (!model) {
      this.showToast('Please configure an AI model first', 'error');
      this.openSettings();
      return;
    }

    // Hide welcome screen
    const welcome = document.getElementById('welcome-screen');
    if (welcome) welcome.style.display = 'none';

    // Add user message
    this.addMessage('user', text);
    input.value = '';
    input.style.height = 'auto';
    document.getElementById('btn-send').disabled = true;

    // Show typing indicator
    this.isGenerating = true;
    this.showTyping();

    try {
      const response = await this.callAI(text, model);
      this.hideTyping();

      // Extract code
      const code = this.extractCode(response);
      const cleanText = response.replace(/```html[\s\S]*?```/g, '').replace(/```[\s\S]*?```/g, '').trim();

      this.addMessage('assistant', cleanText || 'Here is your code:', code);

      if (code) {
        this.currentCode = code;
        this.updatePreview();
        this.updateCodeView();
      }
    } catch (error) {
      this.hideTyping();
      this.addMessage('assistant', `Error: ${error.message}. Please check your model settings.`);
    } finally {
      this.isGenerating = false;
    }
  }

  addMessage(role, content, code = null) {
    const msg = { id: Date.now().toString(), role, content, code, timestamp: Date.now() };
    this.messages.push(msg);
    this.renderMessage(msg);
    this.scrollToBottom();
  }

  renderMessage(msg) {
    const container = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = `message ${msg.role}`;

    const avatarSvg = msg.role === 'assistant'
      ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'
      : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';

    let codeBtn = '';
    if (msg.code) {
      codeBtn = `<button class="show-code-btn" onclick="app.showCodeInPreview('${msg.id}')">Show in Preview</button>`;
    }

    div.innerHTML = `
      <div class="message-avatar">${avatarSvg}</div>
      <div class="message-content">
        ${this.escapeHtml(msg.content)}
        ${codeBtn}
      </div>
    `;

    container.appendChild(div);
  }

  showCodeInPreview(msgId) {
    const msg = this.messages.find(m => m.id === msgId);
    if (msg && msg.code) {
      this.currentCode = msg.code;
      this.updatePreview();
      this.updateCodeView();
    }
  }

  showTyping() {
    const container = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.id = 'typing-msg';
    div.className = 'message assistant';
    div.innerHTML = `
      <div class="message-avatar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
      </div>
      <div class="message-content">
        <div class="typing-indicator"><span></span><span></span><span></span></div>
      </div>
    `;
    container.appendChild(div);
    this.scrollToBottom();
  }

  hideTyping() {
    const typing = document.getElementById('typing-msg');
    if (typing) typing.remove();
  }

  clearChat() {
    this.messages = [];
    const container = document.getElementById('chat-messages');
    container.innerHTML = '';
    // Show welcome again
    const welcome = document.getElementById('welcome-screen');
    if (welcome) welcome.style.display = '';
    container.appendChild(welcome || this.createWelcomeScreen());
  }

  scrollToBottom() {
    const container = document.getElementById('chat-messages');
    container.scrollTop = container.scrollHeight;
  }

  // ============ AI SERVICE ============

  async callAI(prompt, model) {
    const systemPrompt = `You are an expert web developer AI assistant. When the user asks you to create something, you MUST respond with:
1. A brief explanation of what you built
2. The complete HTML code wrapped in \`\`\`html code blocks

IMPORTANT:
- Always provide complete, self-contained HTML files
- Include all CSS inline in a <style> tag
- Include all JavaScript inline in a <script> tag
- Make designs modern, responsive, and visually appealing
- Use gradients, shadows, and smooth animations
- If the user asks for modifications, provide the COMPLETE updated code
- Respond in the same language the user uses`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...this.messages.slice(-10).map(m => ({
        role: m.role,
        content: m.code ? `${m.content}\n\`\`\`html\n${m.code}\n\`\`\`` : m.content
      })),
      { role: 'user', content: prompt }
    ];

    let url, headers, body;

    switch (model.provider) {
      case 'openai':
        url = (model.baseUrl || 'https://api.openai.com/v1') + '/chat/completions';
        headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${model.apiKey}`
        };
        body = { model: model.model, messages, temperature: 0.7, max_tokens: 4096 };
        break;

      case 'anthropic':
        url = (model.baseUrl || 'https://api.anthropic.com/v1') + '/messages';
        headers = {
          'Content-Type': 'application/json',
          'x-api-key': model.apiKey,
          'anthropic-version': '2023-06-01'
        };
        const anthropicMsgs = messages.filter(m => m.role !== 'system').map(m => ({
          role: m.role,
          content: m.content
        }));
        body = {
          model: model.model,
          system: systemPrompt,
          messages: anthropicMsgs,
          max_tokens: 4096
        };
        break;

      case 'ollama':
        url = (model.baseUrl || 'http://localhost:11434') + '/api/chat';
        headers = { 'Content-Type': 'application/json' };
        body = { model: model.model, messages, stream: false };
        break;

      case 'custom':
        url = (model.baseUrl || '') + '/chat/completions';
        headers = {
          'Content-Type': 'application/json',
          ...(model.apiKey ? { 'Authorization': `Bearer ${model.apiKey}` } : {})
        };
        body = { model: model.model, messages, temperature: 0.7, max_tokens: 4096 };
        break;

      default:
        throw new Error('Unsupported provider');
    }

    const result = await window.electronAPI.callAI({ url, method: 'POST', headers, body });

    if (result.error) {
      throw new Error(result.message || 'API call failed');
    }

    // Extract response text based on provider
    switch (model.provider) {
      case 'openai':
      case 'custom':
        return result.data.choices[0].message.content;
      case 'anthropic':
        return result.data.content[0].text;
      case 'ollama':
        return result.data.message.content;
      default:
        return '';
    }
  }

  extractCode(text) {
    const htmlMatch = text.match(/```html\s*([\s\S]*?)```/);
    if (htmlMatch) return htmlMatch[1].trim();

    const codeMatch = text.match(/```\s*([\s\S]*?)```/);
    if (codeMatch) return codeMatch[1].trim();

    if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
      return text.trim();
    }

    return null;
  }

  // ============ TABS / VIEWS ============

  setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.switchView(btn.dataset.view);
      });
    });
  }

  switchView(view) {
    this.currentView = view;
    document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(`${view}-view`).classList.add('active');

    if (view === 'code' || view === 'split') {
      this.updateCodeView();
    }
    if (view === 'preview' || view === 'split') {
      this.updatePreview();
    }
  }

  // ============ PREVIEW ============

  updatePreview() {
    const iframe = document.getElementById('preview-iframe');
    const splitIframe = document.getElementById('split-preview-iframe');

    [iframe, splitIframe].forEach(frame => {
      if (frame) {
        const doc = frame.contentDocument || frame.contentWindow.document;
        doc.open();
        doc.write(this.currentCode);
        doc.close();
      }
    });
  }

  // ============ CODE VIEW ============

  updateCodeView() {
    const code = this.currentCode;
    const lines = code.split('\n');

    // Main code view
    const lineNumbers = document.getElementById('line-numbers');
    const codeHighlighted = document.getElementById('code-highlighted');
    if (lineNumbers && codeHighlighted) {
      lineNumbers.innerHTML = lines.map((_, i) => `<div>${i + 1}</div>`).join('');
      codeHighlighted.innerHTML = this.highlightSyntax(code);
    }

    // Split code view
    const splitLineNumbers = document.getElementById('split-line-numbers');
    const splitCodeHighlighted = document.getElementById('split-code-highlighted');
    if (splitLineNumbers && splitCodeHighlighted) {
      splitLineNumbers.innerHTML = lines.map((_, i) => `<div>${i + 1}</div>`).join('');
      splitCodeHighlighted.innerHTML = this.highlightSyntax(code);
    }
  }

  highlightSyntax(code) {
    return code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // Comments
      .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="hl-comment">$1</span>')
      // Tags
      .replace(/(&lt;\/?)([\w-]+)/g, '$1<span class="hl-tag">$2</span>')
      // Attributes
      .replace(/\s([\w-]+)(=)/g, ' <span class="hl-attr">$1</span>$2')
      // Strings
      .replace(/("[^"]*"|'[^']*')/g, '<span class="hl-string">$1</span>')
      // CSS properties
      .replace(/([\w-]+)(\s*:\s*)(?![/])/gm, '<span class="hl-property">$1</span>$2')
      // JS keywords
      .replace(/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|new|this)\b/g, '<span class="hl-keyword">$1</span>')
      // Functions
      .replace(/\b([\w]+)(\s*\()/g, '<span class="hl-function">$1</span>$2');
  }

  // ============ DEVICE TOGGLE ============

  setupDeviceToggle() {
    const desktopBtn = document.getElementById('btn-device-desktop');
    const mobileBtn = document.getElementById('btn-device-mobile');
    const previewContainer = document.getElementById('preview-container');

    desktopBtn.addEventListener('click', () => {
      desktopBtn.classList.add('active');
      mobileBtn.classList.remove('active');
      previewContainer.classList.remove('mobile');
      this.deviceMode = 'desktop';
    });

    mobileBtn.addEventListener('click', () => {
      mobileBtn.classList.add('active');
      desktopBtn.classList.remove('active');
      previewContainer.classList.add('mobile');
      this.deviceMode = 'mobile';
    });
  }

  // ============ ACTIONS ============

  setupActions() {
    document.getElementById('btn-refresh').addEventListener('click', () => {
      this.updatePreview();
      this.showToast('Preview refreshed', 'success');
    });

    document.getElementById('btn-copy-code').addEventListener('click', () => {
      navigator.clipboard.writeText(this.currentCode);
      this.showToast('Code copied to clipboard', 'success');
    });

    document.getElementById('btn-download').addEventListener('click', () => {
      const blob = new Blob([this.currentCode], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'index.html';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  // ============ SETTINGS ============

  setupSettings() {
    const modal = document.getElementById('settings-modal');
    const overlay = modal.querySelector('.modal-overlay');

    document.getElementById('btn-settings').addEventListener('click', () => this.openSettings());
    document.getElementById('btn-close-settings').addEventListener('click', () => this.closeSettings());
    overlay.addEventListener('click', () => this.closeSettings());

    document.getElementById('btn-add-model').addEventListener('click', () => {
      document.getElementById('add-model-form').classList.remove('hidden');
      document.getElementById('btn-add-model').classList.add('hidden');
    });

    document.getElementById('btn-cancel-model').addEventListener('click', () => {
      document.getElementById('add-model-form').classList.add('hidden');
      document.getElementById('btn-add-model').classList.remove('hidden');
      this.resetModelForm();
    });

    document.getElementById('btn-save-model').addEventListener('click', () => this.saveNewModel());

    // Type buttons
    document.querySelectorAll('.type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const provider = document.getElementById('model-provider');
        const apiKeyRow = document.getElementById('api-key-row');

        if (btn.dataset.type === 'local') {
          provider.innerHTML = '<option value="ollama">Ollama</option><option value="custom">Custom Local</option>';
          apiKeyRow.classList.add('hidden');
        } else {
          provider.innerHTML = '<option value="openai">OpenAI</option><option value="anthropic">Anthropic</option><option value="custom">Custom (OpenAI Compatible)</option>';
          apiKeyRow.classList.remove('hidden');
        }
      });
    });
  }

  openSettings() {
    document.getElementById('settings-modal').classList.remove('hidden');
    this.renderModelsList();
  }

  closeSettings() {
    document.getElementById('settings-modal').classList.add('hidden');
    document.getElementById('add-model-form').classList.add('hidden');
    document.getElementById('btn-add-model').classList.remove('hidden');
    this.resetModelForm();
  }

  renderModelsList() {
    const list = document.getElementById('models-list');
    list.innerHTML = '';

    this.models.forEach(model => {
      const isActive = model.id === this.activeModelId;
      const typeClass = model.type === 'local' ? 'local' : 'online';
      const icon = model.type === 'local'
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1"/><circle cx="6" cy="18" r="1"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>';

      const div = document.createElement('div');
      div.className = `model-item ${isActive ? 'active' : ''}`;
      div.innerHTML = `
        <div class="model-item-left">
          <div class="model-item-icon ${typeClass}">${icon}</div>
          <div class="model-item-info">
            <h4>${this.escapeHtml(model.name)}</h4>
            <p>${model.provider} / ${model.model}</p>
          </div>
        </div>
        <div class="model-item-actions">
          ${isActive
            ? '<span class="badge badge-active">Active</span>'
            : `<button class="badge badge-activate" data-id="${model.id}">Activate</button>`
          }
          <button class="btn-delete" data-id="${model.id}" title="Delete">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
          </button>
        </div>
      `;
      list.appendChild(div);
    });

    // Activate buttons
    list.querySelectorAll('.badge-activate').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeModelId = btn.dataset.id;
        this.saveModels();
        this.renderModelsList();
        this.updateModelIndicator();
        this.showToast('Model activated', 'success');
      });
    });

    // Delete buttons
    list.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        this.models = this.models.filter(m => m.id !== btn.dataset.id);
        if (this.activeModelId === btn.dataset.id) {
          this.activeModelId = this.models.length > 0 ? this.models[0].id : null;
        }
        this.saveModels();
        this.renderModelsList();
        this.updateModelIndicator();
      });
    });
  }

  async saveNewModel() {
    const name = document.getElementById('model-name').value.trim();
    const model = document.getElementById('model-model').value.trim();
    const provider = document.getElementById('model-provider').value;
    const baseUrl = document.getElementById('model-url').value.trim();
    const apiKey = document.getElementById('model-key').value.trim();
    const type = document.querySelector('.type-btn.active').dataset.type;

    if (!name || !model) {
      this.showToast('Please fill in name and model fields', 'error');
      return;
    }

    const newModel = {
      id: Date.now().toString(),
      name,
      model,
      provider,
      baseUrl: baseUrl || undefined,
      apiKey: apiKey || undefined,
      type,
      isActive: true
    };

    this.models.push(newModel);

    if (!this.activeModelId) {
      this.activeModelId = newModel.id;
    }

    await this.saveModels();
    this.renderModelsList();
    this.updateModelIndicator();

    // Reset form
    document.getElementById('add-model-form').classList.add('hidden');
    document.getElementById('btn-add-model').classList.remove('hidden');
    this.resetModelForm();

    this.showToast('Model added successfully', 'success');
  }

  resetModelForm() {
    document.getElementById('model-name').value = '';
    document.getElementById('model-model').value = '';
    document.getElementById('model-url').value = '';
    document.getElementById('model-key').value = '';
  }

  updateModelIndicator() {
    const model = this.getActiveModel();
    const nameEl = document.getElementById('active-model-name');
    const dot = document.querySelector('.model-dot');

    if (model) {
      nameEl.textContent = model.name;
      dot.classList.remove('disconnected');
    } else {
      nameEl.textContent = 'No Model';
      dot.classList.add('disconnected');
    }
  }

  // ============ UTILITIES ============

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML.replace(/\n/g, '<br>');
  }

  showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
  }
}

// Initialize app
const app = new App();
