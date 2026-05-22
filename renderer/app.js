// ============================================
// ZSA AI - Chat to Code
// Main Application Logic
// ============================================

// ============ i18n TRANSLATIONS ============
const translations = {
  ar: {
    appTitle: 'ZSA AI — محادثة إلى كود',
    noModel: 'لا يوجد نموذج',
    switchModel: 'تبديل النموذج',
    manageModels: 'إدارة النماذج',
    newChat: 'محادثة جديدة',
    settings: 'الإعدادات',
    chatHistory: 'سجل المحادثات',
    preview: 'معاينة',
    code: 'كود',
    split: 'مقسم',
    refresh: 'تحديث',
    copyCode: 'نسخ الكود',
    downloadHtml: 'تحميل HTML',
    downloadZip: 'تحميل ZIP',
    deploy: 'نشر',
    templates: 'القوالب',
    designTools: 'أدوات التصميم',
    addLibrary: 'إضافة مكتبة',
    accentColor: 'لون التمييز',
    font: 'الخط',
    theme: 'المظهر',
    dark: 'داكن',
    light: 'فاتح',
    placeholder: 'صف ما تريد بناءه... (منصات، تطبيقات جوال، تطبيقات ويب)',
    welcome: 'ZSA AI',
    welcomeDesc: 'قم ببناء منصات كاملة وتطبيقات جوال وتطبيقات ويب من وصف بسيط',
    modelSettings: 'إعدادات نموذج الذكاء الاصطناعي',
    addModel: 'إضافة نموذج ذكاء اصطناعي',
    noModels: 'لا توجد نماذج مكوّنة',
    undo: 'تراجع',
    redo: 'إعادة',
    analyzedByAI: 'سيتم تحليلها بواسطة الذكاء الاصطناعي',
    deleteChat: 'حذف',
    loadChat: 'تحميل'
  },
  en: {
    appTitle: 'ZSA AI — Chat to Code',
    noModel: 'No Model',
    switchModel: 'Switch Model',
    manageModels: 'Manage Models',
    newChat: 'New Chat',
    settings: 'Settings',
    chatHistory: 'Chat History',
    preview: 'Preview',
    code: 'Code',
    split: 'Split',
    refresh: 'Refresh',
    copyCode: 'Copy Code',
    downloadHtml: 'Download HTML',
    downloadZip: 'Download ZIP',
    deploy: 'Deploy',
    templates: 'Templates',
    designTools: 'Design Tools',
    addLibrary: 'Add Library',
    accentColor: 'Accent Color',
    font: 'Font',
    theme: 'Theme',
    dark: 'Dark',
    light: 'Light',
    placeholder: 'Describe what you want to build... (platforms, mobile apps, web apps)',
    welcome: 'ZSA AI',
    welcomeDesc: 'Build complete platforms, mobile apps, web apps, and more from a simple description',
    modelSettings: 'AI Model Settings',
    addModel: 'Add AI Model',
    noModels: 'No models configured',
    undo: 'Undo',
    redo: 'Redo',
    analyzedByAI: 'Will be analyzed by AI',
    deleteChat: 'Delete',
    loadChat: 'Load'
  }
};


// ============ TEMPLATES DATA ============
const templatesData = {
  'Landing Page': [
    { name: 'SaaS Landing', description: 'Modern SaaS product landing page with hero, features, pricing', code: '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>SaaS Landing</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:system-ui,sans-serif;background:#0f172a;color:#e2e8f0}nav{display:flex;justify-content:space-between;align-items:center;padding:1.5rem 5%;max-width:1200px;margin:auto}.logo{font-size:1.5rem;font-weight:700;background:linear-gradient(135deg,#6366f1,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent}nav ul{display:flex;list-style:none;gap:2rem}nav a{color:#94a3b8;text-decoration:none;transition:color .2s}nav a:hover{color:#e2e8f0}.hero{text-align:center;padding:8rem 2rem 4rem;max-width:800px;margin:auto}.hero h1{font-size:3.5rem;line-height:1.1;margin-bottom:1.5rem;background:linear-gradient(135deg,#fff,#6366f1);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.hero p{font-size:1.2rem;color:#94a3b8;margin-bottom:2rem}.btn{display:inline-block;padding:1rem 2.5rem;background:linear-gradient(135deg,#6366f1,#a855f7);color:#fff;border-radius:12px;text-decoration:none;font-weight:600;transition:transform .2s,box-shadow .2s}.btn:hover{transform:translateY(-2px);box-shadow:0 10px 40px rgba(99,102,241,.3)}.features{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;padding:4rem 5%;max-width:1200px;margin:auto}.feature{background:#1e293b;border:1px solid #334155;border-radius:16px;padding:2rem;transition:transform .2s}.feature:hover{transform:translateY(-4px)}.feature h3{margin-bottom:.5rem;color:#6366f1}.feature p{color:#94a3b8;font-size:.9rem}</style></head><body><nav><div class="logo">ProductAI</div><ul><li><a href="#">Features</a></li><li><a href="#">Pricing</a></li><li><a href="#">About</a></li></ul></nav><section class="hero"><h1>Build Amazing Products with AI Power</h1><p>Supercharge your workflow with intelligent automation that understands your needs.</p><a href="#" class="btn">Get Started Free</a></section><section class="features"><div class="feature"><h3>Smart Automation</h3><p>Let AI handle the repetitive tasks so you can focus on what matters.</p></div><div class="feature"><h3>Real-time Analytics</h3><p>Get instant insights into your product performance and user behavior.</p></div><div class="feature"><h3>Team Collaboration</h3><p>Work together seamlessly with built-in collaboration tools.</p></div></section></body></html>' },
    { name: 'Agency Portfolio', description: 'Creative agency homepage with sections and animations', code: '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Agency</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:system-ui,sans-serif;background:#000;color:#fff}.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:2rem;background:radial-gradient(ellipse at center,#1a1a2e 0%,#000 70%)}.hero h1{font-size:5rem;font-weight:800;margin-bottom:1rem;background:linear-gradient(90deg,#ff6b6b,#feca57,#48dbfb,#ff9ff3);-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:gradient 3s ease infinite;background-size:200%}@keyframes gradient{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}.hero p{font-size:1.3rem;color:#888;max-width:600px}</style></head><body><section class="hero"><h1>Creative Agency</h1><p>We craft digital experiences that inspire and engage.</p></section></body></html>' }
  ],
  'Dashboard': [
    { name: 'Admin Dashboard', description: 'Full admin panel with sidebar, charts, and tables', code: '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Dashboard</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:system-ui,sans-serif;background:#0f172a;color:#e2e8f0;display:flex;min-height:100vh}.sidebar{width:250px;background:#1e293b;padding:1.5rem;border-right:1px solid #334155}.sidebar h2{font-size:1.2rem;margin-bottom:2rem;color:#6366f1}.nav-item{display:block;padding:.75rem 1rem;color:#94a3b8;text-decoration:none;border-radius:8px;margin-bottom:.25rem;transition:all .2s}.nav-item:hover,.nav-item.active{background:#334155;color:#fff}.main{flex:1;padding:2rem}.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem}.header h1{font-size:1.5rem}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:2rem}.stat-card{background:#1e293b;border:1px solid #334155;border-radius:12px;padding:1.5rem}.stat-card h3{font-size:.85rem;color:#94a3b8;margin-bottom:.5rem}.stat-card .value{font-size:1.8rem;font-weight:700}.stat-card .change{font-size:.8rem;color:#22c55e;margin-top:.25rem}</style></head><body><aside class="sidebar"><h2>Dashboard</h2><a href="#" class="nav-item active">Overview</a><a href="#" class="nav-item">Analytics</a><a href="#" class="nav-item">Users</a><a href="#" class="nav-item">Settings</a></aside><main class="main"><div class="header"><h1>Overview</h1></div><div class="stats"><div class="stat-card"><h3>Total Revenue</h3><div class="value">$45,231</div><div class="change">+12.5%</div></div><div class="stat-card"><h3>Active Users</h3><div class="value">2,350</div><div class="change">+8.2%</div></div><div class="stat-card"><h3>Conversions</h3><div class="value">1,247</div><div class="change">+3.1%</div></div><div class="stat-card"><h3>Bounce Rate</h3><div class="value">24.5%</div><div class="change">-2.3%</div></div></div></main></body></html>' }
  ],
  'E-commerce': [
    { name: 'Product Store', description: 'E-commerce store with product grid and cart', code: '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Store</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:system-ui,sans-serif;background:#0f172a;color:#e2e8f0}header{display:flex;justify-content:space-between;align-items:center;padding:1rem 2rem;background:#1e293b;border-bottom:1px solid #334155}header h1{font-size:1.3rem;color:#6366f1}.cart-btn{padding:.5rem 1rem;background:#6366f1;color:#fff;border:none;border-radius:8px;cursor:pointer}.products{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:1.5rem;padding:2rem;max-width:1200px;margin:auto}.product{background:#1e293b;border:1px solid #334155;border-radius:16px;overflow:hidden;transition:transform .2s}.product:hover{transform:translateY(-4px)}.product-img{height:200px;background:linear-gradient(135deg,#6366f1,#a855f7);display:flex;align-items:center;justify-content:center;font-size:3rem}.product-info{padding:1.5rem}.product-info h3{margin-bottom:.5rem}.product-info .price{font-size:1.2rem;color:#6366f1;font-weight:700;margin-bottom:1rem}.add-btn{width:100%;padding:.75rem;background:#6366f1;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:500;transition:background .2s}.add-btn:hover{background:#7c7ff7}</style></head><body><header><h1>TechStore</h1><button class="cart-btn">Cart (0)</button></header><div class="products"><div class="product"><div class="product-img">💻</div><div class="product-info"><h3>MacBook Pro</h3><div class="price">$1,299</div><button class="add-btn">Add to Cart</button></div></div><div class="product"><div class="product-img">📱</div><div class="product-info"><h3>iPhone 15</h3><div class="price">$999</div><button class="add-btn">Add to Cart</button></div></div><div class="product"><div class="product-img">⌚</div><div class="product-info"><h3>Apple Watch</h3><div class="price">$399</div><button class="add-btn">Add to Cart</button></div></div><div class="product"><div class="product-img">🎧</div><div class="product-info"><h3>AirPods Max</h3><div class="price">$549</div><button class="add-btn">Add to Cart</button></div></div></div></body></html>' }
  ],
  'Game': [
    { name: 'Snake Game', description: 'Classic snake game with keyboard controls and scoring', code: '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Snake</title><style>*{margin:0;padding:0;box-sizing:border-box}body{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;background:#0f172a;color:#fff;font-family:system-ui,sans-serif}canvas{border:2px solid #334155;border-radius:8px;background:#1e293b}.score{margin-top:1rem;font-size:1.2rem;color:#6366f1}.info{margin-top:.5rem;font-size:.8rem;color:#94a3b8}</style></head><body><canvas id="game" width="400" height="400"></canvas><div class="score">Score: <span id="score">0</span></div><div class="info">Use arrow keys to play. Press Space to restart.</div><script>const canvas=document.getElementById("game"),ctx=canvas.getContext("2d"),grid=20;let snake=[{x:10,y:10}],food={x:15,y:15},dir={x:0,y:0},score=0,gameOver=false,speed=150,lastTime=0;function draw(){ctx.fillStyle="#1e293b";ctx.fillRect(0,0,400,400);ctx.fillStyle="#22c55e";snake.forEach(s=>{ctx.fillRect(s.x*grid+1,s.y*grid+1,grid-2,grid-2)});ctx.fillStyle="#ef4444";ctx.fillRect(food.x*grid+1,food.y*grid+1,grid-2,grid-2);if(gameOver){ctx.fillStyle="rgba(0,0,0,.7)";ctx.fillRect(0,0,400,400);ctx.fillStyle="#fff";ctx.font="30px system-ui";ctx.textAlign="center";ctx.fillText("Game Over!",200,200)}}function update(){if(gameOver||(!dir.x&&!dir.y))return;const head={x:snake[0].x+dir.x,y:snake[0].y+dir.y};if(head.x<0||head.x>=20||head.y<0||head.y>=20||snake.some(s=>s.x===head.x&&s.y===head.y)){gameOver=true;return}snake.unshift(head);if(head.x===food.x&&head.y===food.y){score++;document.getElementById("score").textContent=score;food={x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*20)}}else{snake.pop()}}function loop(time){if(time-lastTime>speed){lastTime=time;update();draw()}requestAnimationFrame(loop)}document.addEventListener("keydown",e=>{if(e.key===" "){snake=[{x:10,y:10}];dir={x:0,y:0};score=0;gameOver=false;document.getElementById("score").textContent=0}if(e.key==="ArrowUp"&&dir.y!==1)dir={x:0,y:-1};if(e.key==="ArrowDown"&&dir.y!==-1)dir={x:0,y:1};if(e.key==="ArrowLeft"&&dir.x!==1)dir={x:-1,y:0};if(e.key==="ArrowRight"&&dir.x!==-1)dir={x:1,y:0}});draw();requestAnimationFrame(loop)</script></body></html>' }
  ],
  'Mobile App': [
    { name: 'Chat App UI', description: 'Mobile chat app interface with messages and contacts', code: '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Chat App</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:system-ui,sans-serif;background:#0f172a;display:flex;justify-content:center;align-items:center;min-height:100vh}.phone{width:375px;height:700px;background:#1e293b;border-radius:40px;overflow:hidden;border:3px solid #334155;display:flex;flex-direction:column}.status-bar{display:flex;justify-content:space-between;padding:12px 24px;font-size:12px;color:#94a3b8}.chat-header{display:flex;align-items:center;gap:12px;padding:12px 20px;border-bottom:1px solid #334155}.avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#a855f7);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px}.chat-header h3{font-size:14px;color:#e2e8f0}.chat-header p{font-size:11px;color:#22c55e}.messages{flex:1;padding:16px;overflow-y:auto;display:flex;flex-direction:column;gap:8px}.msg{max-width:75%;padding:10px 14px;border-radius:16px;font-size:13px;line-height:1.4}.msg.sent{align-self:flex-end;background:#6366f1;color:#fff;border-bottom-right-radius:4px}.msg.received{align-self:flex-start;background:#334155;color:#e2e8f0;border-bottom-left-radius:4px}.input-bar{display:flex;align-items:center;gap:8px;padding:12px 16px;border-top:1px solid #334155}.input-bar input{flex:1;padding:10px 16px;border-radius:20px;border:1px solid #334155;background:#0f172a;color:#e2e8f0;font-size:13px;outline:none}.input-bar button{width:36px;height:36px;border-radius:50%;background:#6366f1;border:none;color:#fff;font-size:16px;cursor:pointer}</style></head><body><div class="phone"><div class="status-bar"><span>9:41</span><span>5G 100%</span></div><div class="chat-header"><div class="avatar">J</div><div><h3>John</h3><p>Online</p></div></div><div class="messages"><div class="msg received">Hey! How are you?</div><div class="msg sent">Im good! Working on the new project</div><div class="msg received">Thats great! Can you share the design?</div><div class="msg sent">Sure, sending it now 📎</div><div class="msg received">Thanks! 🙌</div></div><div class="input-bar"><input placeholder="Type a message..."><button>↑</button></div></div></body></html>' }
  ]
};


// ============ CDN LIBRARY LINKS ============
const cdnLibraries = {
  tailwind: '<script src="https://cdn.tailwindcss.com"><\/script>',
  threejs: '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>',
  gsap: '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"><\/script>',
  chartjs: '<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js"><\/script>',
  phaser: '<script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.60.0/phaser.min.js"><\/script>'
};

class App {
  constructor() {
    this.messages = [];
    this.models = [];
    this.activeModelId = null;
    this.currentCode = this.getDefaultCode();
    this.isGenerating = false;
    this.currentView = 'preview';
    this.deviceMode = 'desktop';
    this.attachments = [];
    this.language = 'ar';

    // Feature 3: Undo/Redo
    this.codeHistory = [this.currentCode];
    this.codeHistoryIndex = 0;

    // Feature 7: Multi-project tabs
    this.projects = [{ id: 'default', name: 'Project 1', code: this.currentCode, messages: [] }];
    this.activeProjectId = 'default';

    // Feature 2: Chat history
    this.chatHistoryList = [];

    this.init();
  }

  async init() {
    await this.loadModels();
    await this.loadLanguage();
    await this.loadChatHistory();
    this.setupTitlebar();
    this.setupResizeHandle();
    this.setupChat();
    this.setupAttachments();
    this.setupModelSwitcher();
    this.setupTabs();
    this.setupDeviceToggle();
    this.setupActions();
    this.setupSettings();
    this.setupHistory();
    this.setupTemplates();
    this.setupDesignTools();
    this.setupPlugins();
    this.setupProjectTabs();
    this.setupUndoRedo();
    this.setupCodeEditor();
    this.setupI18n();
    this.updatePreview();
    this.updateModelIndicator();
    this.updateCodeView();
    this.renderProjectTabs();
    this.applyLanguage();
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

  async loadLanguage() {
    try {
      const lang = await window.electronAPI.getStore('language');
      if (lang) this.language = lang;
    } catch (e) { /* default ar */ }
  }

  async loadChatHistory() {
    try {
      this.chatHistoryList = (await window.electronAPI.getStore('chatHistory')) || [];
    } catch (e) {
      this.chatHistoryList = [];
    }
  }

  async saveChatHistory() {
    await window.electronAPI.setStore('chatHistory', this.chatHistoryList);
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
    body { font-family: 'Segoe UI', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; }
    .container { padding: 3rem; animation: fadeIn 0.8s ease; }
    h1 { font-size: 3rem; margin-bottom: 1rem; text-shadow: 0 2px 10px rgba(0,0,0,0.2); }
    p { font-size: 1.3rem; opacity: 0.9; max-width: 500px; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
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

  // ============ i18n ============

  setupI18n() {
    const langBtn = document.getElementById('btn-lang-toggle');
    langBtn.addEventListener('click', () => {
      this.language = this.language === 'ar' ? 'en' : 'ar';
      window.electronAPI.setStore('language', this.language);
      this.applyLanguage();
    });
  }

  applyLanguage() {
    const t = translations[this.language];
    const langBtn = document.getElementById('btn-lang-toggle');
    langBtn.textContent = this.language === 'ar' ? 'EN' : 'AR';
    document.querySelector('.titlebar-title').textContent = t.appTitle;
    document.getElementById('chat-input').placeholder = t.placeholder;

    // Update data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t[key]) el.textContent = t[key];
    });
  }

  t(key) {
    return translations[this.language][key] || key;
  }


  // ============ TITLEBAR ============

  setupTitlebar() {
    document.getElementById('btn-minimize').addEventListener('click', () => window.electronAPI.minimize());
    document.getElementById('btn-maximize').addEventListener('click', () => window.electronAPI.maximize());
    document.getElementById('btn-close').addEventListener('click', () => window.electronAPI.close());
  }

  // ============ RESIZE HANDLE ============

  setupResizeHandle() {
    const handle = document.getElementById('resize-handle');
    const chatPanel = document.getElementById('chat-panel');
    let isDragging = false;
    handle.addEventListener('mousedown', (e) => { isDragging = true; handle.classList.add('dragging'); document.body.style.cursor = 'col-resize'; document.body.style.userSelect = 'none'; e.preventDefault(); });
    document.addEventListener('mousemove', (e) => { if (!isDragging) return; const appWidth = document.getElementById('app').offsetWidth; const newWidth = (e.clientX / appWidth) * 100; if (newWidth >= 20 && newWidth <= 60) chatPanel.style.width = newWidth + '%'; });
    document.addEventListener('mouseup', () => { if (isDragging) { isDragging = false; handle.classList.remove('dragging'); document.body.style.cursor = ''; document.body.style.userSelect = ''; } });
  }

  // ============ MODEL SWITCHER ============

  setupModelSwitcher() {
    const btn = document.getElementById('btn-model-switcher');
    const dropdown = document.getElementById('model-dropdown');
    const settingsBtn = document.getElementById('btn-dropdown-settings');

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('hidden');
      if (!dropdown.classList.contains('hidden')) this.renderModelDropdown();
    });

    settingsBtn.addEventListener('click', () => {
      dropdown.classList.add('hidden');
      this.openSettings();
    });

    document.addEventListener('click', (e) => {
      if (!document.getElementById('model-switcher').contains(e.target)) {
        dropdown.classList.add('hidden');
      }
    });
  }

  renderModelDropdown() {
    const list = document.getElementById('model-dropdown-list');
    list.innerHTML = '';
    if (this.models.length === 0) {
      list.innerHTML = '<div class="model-dropdown-empty">No models configured</div>';
      return;
    }
    this.models.forEach(model => {
      const item = document.createElement('button');
      item.className = `model-dropdown-item ${model.id === this.activeModelId ? 'active' : ''}`;
      item.innerHTML = `<span class="mdi-dot ${model.type === 'local' ? 'local' : 'online'}"></span><span class="mdi-name">${this.escapeHtml(model.name)}</span><span class="mdi-model">${model.model}</span>`;
      item.addEventListener('click', () => {
        this.activeModelId = model.id;
        this.saveModels();
        this.updateModelIndicator();
        this.renderModelDropdown();
        document.getElementById('model-dropdown').classList.add('hidden');
        this.showToast(`Switched to ${model.name}`, 'success');
      });
      list.appendChild(item);
    });
  }


  // ============ ATTACHMENTS ============

  setupAttachments() {
    document.getElementById('btn-attach').addEventListener('click', () => this.openFileAttach());
    document.getElementById('btn-attach-folder').addEventListener('click', () => this.openFolderAttach());
  }

  async openFileAttach() {
    const result = await window.electronAPI.openFileDialog();
    if (result.canceled) return;
    for (const file of result.files) {
      this.attachments.push(file);
    }
    this.renderAttachmentsPreviews();
  }

  async openFolderAttach() {
    const result = await window.electronAPI.openFolderDialog();
    if (result.canceled) return;
    const structure = await window.electronAPI.readFolderStructure(result.path);
    if (!structure.error) {
      this.attachments.push({ type: 'folder', name: structure.rootName, path: result.path, structure: structure.structure });
      this.renderAttachmentsPreviews();
    }
  }

  renderAttachmentsPreviews() {
    const container = document.getElementById('attachments-preview');
    const list = document.getElementById('attachments-list');
    if (this.attachments.length === 0) { container.classList.add('hidden'); return; }
    container.classList.remove('hidden');
    list.innerHTML = '';
    this.attachments.forEach((att, idx) => {
      const item = document.createElement('div');
      item.className = 'attachment-item';
      const icon = att.type === 'folder' ? '📁' : (att.isImage ? '🖼️' : (att.isVideo ? '🎬' : (att.isCode ? '📄' : '📎')));
      // Feature 9: Vision note for images
      const visionNote = (att.isImage && this.isVisionModel()) ? `<span class="att-vision-note">${this.t('analyzedByAI')}</span>` : '';
      item.innerHTML = `<span class="att-icon">${icon}</span><span class="att-name">${att.name}</span>${visionNote}<button class="att-remove" data-idx="${idx}">&times;</button>`;
      list.appendChild(item);
    });
    list.querySelectorAll('.att-remove').forEach(btn => {
      btn.addEventListener('click', () => { this.attachments.splice(parseInt(btn.dataset.idx), 1); this.renderAttachmentsPreviews(); });
    });
  }

  // Feature 9: Check if current model supports vision
  isVisionModel() {
    const model = this.getActiveModel();
    if (!model) return false;
    const visionModels = ['gpt-4o', 'gpt-4-vision', 'gpt-4o-mini', 'claude-3', 'claude-3.5', 'claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'];
    return visionModels.some(v => model.model.toLowerCase().includes(v.toLowerCase()));
  }

  async buildAttachmentContext() {
    let context = '';
    let imageAttachments = [];
    for (const att of this.attachments) {
      if (att.type === 'folder') {
        context += `\n[Attached Project Folder: ${att.name}]\nStructure:\n${this.formatStructure(att.structure, 0)}\n`;
        const keyFiles = this.findKeyFiles(att.structure, att.path);
        for (const kf of keyFiles.slice(0, 5)) {
          const result = await window.electronAPI.readFileAsText(kf.path);
          if (!result.error && result.content.length < 5000) {
            context += `\n--- File: ${kf.name} ---\n${result.content}\n`;
          }
        }
      } else if (att.isImage) {
        const result = await window.electronAPI.readFileAsBase64(att.path);
        if (!result.error) {
          context += `\n[Attached Image: ${att.name} (${this.formatSize(att.size)})]\n`;
          if (this.isVisionModel()) {
            imageAttachments.push({ base64: result.data, mimeType: result.mimeType, name: att.name });
          }
        }
      } else if (att.isCode || att.ext === '.txt' || att.ext === '.md' || att.ext === '.json') {
        const result = await window.electronAPI.readFileAsText(att.path);
        if (!result.error) context += `\n[Attached File: ${att.name}]\n\`\`\`\n${result.content.substring(0, 8000)}\n\`\`\`\n`;
      } else {
        context += `\n[Attached File: ${att.name} (${this.formatSize(att.size)}, type: ${att.ext})]\n`;
      }
    }
    return { context, imageAttachments };
  }

  formatStructure(items, depth) {
    let result = '';
    const indent = '  '.repeat(depth);
    for (const item of items) {
      if (item.type === 'folder') { result += `${indent}📁 ${item.name}/\n`; if (item.children) result += this.formatStructure(item.children, depth + 1); }
      else { result += `${indent}📄 ${item.name}\n`; }
    }
    return result;
  }

  findKeyFiles(items, basePath) {
    const keyFiles = [];
    const keyNames = ['index.html', 'package.json', 'app.js', 'main.js', 'style.css', 'styles.css', 'app.py', 'main.py', 'index.js', 'App.tsx', 'App.jsx'];
    const walk = (list) => { for (const item of list) { if (item.type === 'file' && keyNames.includes(item.name)) keyFiles.push(item); if (item.children) walk(item.children); } };
    walk(items);
    return keyFiles;
  }

  formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }


  // ============ CHAT ============

  setupChat() {
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('btn-send');
    const newChatBtn = document.getElementById('btn-new-chat');

    input.addEventListener('input', () => { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 120) + 'px'; sendBtn.disabled = !input.value.trim(); });
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.sendMessage(); } });
    sendBtn.addEventListener('click', () => this.sendMessage());
    newChatBtn.addEventListener('click', () => this.clearChat());

    document.querySelectorAll('.suggestion-btn').forEach(btn => {
      btn.addEventListener('click', () => { input.value = btn.dataset.prompt; input.dispatchEvent(new Event('input')); this.sendMessage(); });
    });
  }

  async sendMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text || this.isGenerating) return;

    const model = this.getActiveModel();
    if (!model) { this.showToast('Please configure an AI model first', 'error'); this.openSettings(); return; }

    const welcome = document.getElementById('welcome-screen');
    if (welcome) welcome.style.display = 'none';

    // Build attachment context
    let attachContext = '';
    let imageAttachments = [];
    if (this.attachments.length > 0) {
      const attachResult = await this.buildAttachmentContext();
      attachContext = attachResult.context;
      imageAttachments = attachResult.imageAttachments;
      this.attachments = [];
      this.renderAttachmentsPreviews();
    }

    this.addMessage('user', text);
    input.value = ''; input.style.height = 'auto';
    document.getElementById('btn-send').disabled = true;

    this.isGenerating = true;
    this.showTyping();

    try {
      const fullPrompt = attachContext ? `${text}\n\n${attachContext}` : text;
      const response = await this.callAI(fullPrompt, model, imageAttachments);
      this.hideTyping();

      const code = this.extractCode(response);
      const cleanText = response.replace(/```html[\s\S]*?```/g, '').replace(/```[\s\S]*?```/g, '').trim();
      this.addMessage('assistant', cleanText || 'Here is your code:', code);

      if (code) {
        this.currentCode = code;
        this.pushCodeHistory(code);
        this.updatePreview();
        this.updateCodeView();
        // Save to active project
        const proj = this.projects.find(p => p.id === this.activeProjectId);
        if (proj) proj.code = code;
      }
      // Auto-save chat to history
      this.autoSaveChat();
    } catch (error) {
      this.hideTyping();
      this.addMessage('assistant', `Error: ${error.message}. Please check your model settings.`);
    } finally { this.isGenerating = false; }
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
    let codeBtn = msg.code ? `<button class="show-code-btn" onclick="app.showCodeInPreview('${msg.id}')">Show in Preview</button>` : '';
    div.innerHTML = `<div class="message-avatar">${avatarSvg}</div><div class="message-content">${this.escapeHtml(msg.content)}${codeBtn}</div>`;
    container.appendChild(div);
  }

  showCodeInPreview(msgId) {
    const msg = this.messages.find(m => m.id === msgId);
    if (msg && msg.code) {
      this.currentCode = msg.code;
      this.pushCodeHistory(msg.code);
      this.updatePreview();
      this.updateCodeView();
    }
  }

  showTyping() { const container = document.getElementById('chat-messages'); const div = document.createElement('div'); div.id = 'typing-msg'; div.className = 'message assistant'; div.innerHTML = `<div class="message-avatar"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div><div class="message-content"><div class="typing-indicator"><span></span><span></span><span></span></div></div>`; container.appendChild(div); this.scrollToBottom(); }
  hideTyping() { const t = document.getElementById('typing-msg'); if (t) t.remove(); }

  clearChat() {
    // Save current chat to history before clearing
    if (this.messages.length > 0) this.autoSaveChat();
    this.messages = [];
    const c = document.getElementById('chat-messages');
    c.innerHTML = '';
    const w = document.getElementById('welcome-screen');
    if (w) { w.style.display = ''; c.appendChild(w); }
  }

  scrollToBottom() { const c = document.getElementById('chat-messages'); c.scrollTop = c.scrollHeight; }

  // Feature 2: Auto-save chat
  autoSaveChat() {
    if (this.messages.length === 0) return;
    const firstMsg = this.messages.find(m => m.role === 'user');
    const name = firstMsg ? firstMsg.content.substring(0, 50) : 'Untitled';
    const lastCode = [...this.messages].reverse().find(m => m.code);
    const existing = this.chatHistoryList.find(h => h.id === this.activeProjectId);
    const entry = {
      id: existing ? existing.id : Date.now().toString(),
      name,
      messages: [...this.messages],
      lastCode: lastCode ? lastCode.code : null,
      timestamp: Date.now()
    };
    if (existing) {
      Object.assign(existing, entry);
    } else {
      this.chatHistoryList.unshift(entry);
    }
    // Keep max 50
    if (this.chatHistoryList.length > 50) this.chatHistoryList = this.chatHistoryList.slice(0, 50);
    this.saveChatHistory();
  }


  // ============ AI SERVICE (BUG FIXED: removed duplicate let url, headers, body) ============

  async callAI(prompt, model, imageAttachments = []) {
    const systemPrompt = `You are an expert full-stack developer and game developer AI assistant capable of building:
- Complete web platforms (e-commerce, SaaS, social media, CMS)
- Mobile app UIs (iOS/Android style with responsive design)
- Web applications (dashboards, admin panels, CRUD apps)
- Landing pages and marketing sites
- Interactive tools and utilities
- Browser games (2D/3D using Canvas, WebGL, Phaser-style)
- Mobile games (touch-based, puzzle, arcade, platformer)
- Desktop-style games (RPG, strategy, card games, board games)
- Game UIs (menus, HUDs, inventories, leaderboards)

When the user asks you to create something, you MUST respond with:
1. A brief explanation of what you built
2. The complete HTML code wrapped in \`\`\`html code blocks

IMPORTANT RULES:
- Always provide complete, self-contained HTML files
- Include all CSS inline in a <style> tag
- Include all JavaScript inline in a <script> tag
- For mobile apps, use mobile-first responsive design with app-like UI patterns
- For platforms, include multiple pages/views using tab navigation or routing
- For games, use HTML5 Canvas or DOM-based rendering with requestAnimationFrame
- For games, include keyboard/mouse/touch controls, collision detection, scoring, and game states (menu, playing, game over)
- Make games smooth at 60fps with proper game loops
- Use sprite-based or vector graphics for game visuals
- Include sound effects descriptions as comments where applicable
- Make designs modern, professional, and production-ready
- Use CSS Grid/Flexbox, animations, gradients, and shadows
- Include interactive elements: forms, modals, dropdowns, tabs
- If the user attaches files/images/projects, analyze them and modify/improve accordingly
- If the user asks for modifications, provide the COMPLETE updated code
- Respond in the same language the user uses
- For complex platforms, organize with clear sections and components`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...this.messages.slice(-10).map(m => ({
        role: m.role,
        content: m.code ? `${m.content}\n\`\`\`html\n${m.code}\n\`\`\`` : m.content
      })),
      { role: 'user', content: prompt }
    ];

    // Universal provider support - works with any AI model
    const isAnthropic = model.provider === 'anthropic' || (model.baseUrl && model.baseUrl.includes('anthropic'));
    const isOllama = model.provider === 'ollama' || (model.baseUrl && (model.baseUrl.includes('11434') || model.baseUrl.includes('ollama')));

    let url, headers, body;

    if (isAnthropic) {
      // Anthropic format
      url = (model.baseUrl || 'https://api.anthropic.com/v1') + '/messages';
      headers = { 'Content-Type': 'application/json', 'x-api-key': model.apiKey || '', 'anthropic-version': '2023-06-01' };
      const aMsgs = messages.filter(m => m.role !== 'system').map(m => ({ role: m.role, content: m.content }));

      // Feature 9: Vision support for Claude
      if (imageAttachments.length > 0 && this.isVisionModel()) {
        const lastIdx = aMsgs.length - 1;
        const contentParts = [{ type: 'text', text: aMsgs[lastIdx].content }];
        for (const img of imageAttachments) {
          contentParts.push({ type: 'image', source: { type: 'base64', media_type: img.mimeType, data: img.base64 } });
        }
        aMsgs[lastIdx] = { role: 'user', content: contentParts };
      }

      body = { model: model.model, system: systemPrompt, messages: aMsgs };
    } else if (isOllama) {
      // Ollama format
      url = (model.baseUrl || 'http://localhost:11434') + '/api/chat';
      headers = { 'Content-Type': 'application/json' };
      body = { model: model.model, messages, stream: false };
    } else {
      // OpenAI-compatible format (works with OpenAI, DeepSeek, Groq, Together, Mistral, LM Studio, LocalAI, vLLM, any OpenAI-compatible endpoint)
      url = (model.baseUrl || 'https://api.openai.com/v1') + '/chat/completions';
      headers = { 'Content-Type': 'application/json' };
      if (model.apiKey) headers['Authorization'] = `Bearer ${model.apiKey}`;

      // Feature 9: Vision support for GPT-4o
      if (imageAttachments.length > 0 && this.isVisionModel()) {
        const lastIdx = messages.length - 1;
        const contentParts = [{ type: 'text', text: messages[lastIdx].content }];
        for (const img of imageAttachments) {
          contentParts.push({ type: 'image_url', image_url: { url: `data:${img.mimeType};base64,${img.base64}` } });
        }
        messages[lastIdx] = { role: 'user', content: contentParts };
      }

      body = { model: model.model, messages, temperature: 0.7 };
    }

    const result = await window.electronAPI.callAI({ url, method: 'POST', headers, body });
    if (result.error) throw new Error(result.message || 'API call failed');

    // Universal response parsing
    if (isAnthropic) {
      return result.data.content[0].text;
    } else if (isOllama) {
      return result.data.message.content;
    } else {
      return result.data.choices[0].message.content;
    }
  }

  extractCode(text) {
    const htmlMatch = text.match(/```html\s*([\s\S]*?)```/);
    if (htmlMatch) return htmlMatch[1].trim();
    const codeMatch = text.match(/```\s*([\s\S]*?)```/);
    if (codeMatch) return codeMatch[1].trim();
    if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) return text.trim();
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
    if (view === 'code' || view === 'split') this.updateCodeView();
    if (view === 'preview' || view === 'split') this.updatePreview();
  }

  // ============ PREVIEW ============

  updatePreview() {
    ['preview-iframe', 'split-preview-iframe'].forEach(id => {
      const frame = document.getElementById(id);
      if (frame) {
        const doc = frame.contentDocument || frame.contentWindow.document;
        doc.open();
        doc.write(this.currentCode);
        doc.close();
      }
    });
  }

  // ============ CODE VIEW (Feature 1: Editable Editor) ============

  setupCodeEditor() {
    const editor = document.getElementById('code-editor');
    const splitEditor = document.getElementById('split-code-editor');

    // Sync editor changes to preview
    const handleEditorChange = (editorEl) => {
      this.currentCode = editorEl.value;
      this.updatePreview();
      this.updateLineNumbers();
      // Sync other editor
      if (editorEl === editor && splitEditor) splitEditor.value = this.currentCode;
      if (editorEl === splitEditor && editor) editor.value = this.currentCode;
    };

    let debounceTimer = null;
    const debounceUpdate = (editorEl) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        handleEditorChange(editorEl);
        this.pushCodeHistory(this.currentCode);
      }, 500);
    };

    editor.addEventListener('input', () => {
      this.currentCode = editor.value;
      this.updateLineNumbers();
      if (splitEditor) splitEditor.value = this.currentCode;
      // Debounce preview update
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => this.updatePreview(), 300);
    });

    editor.addEventListener('blur', () => {
      if (this.currentCode !== this.codeHistory[this.codeHistoryIndex]) {
        this.pushCodeHistory(this.currentCode);
      }
    });

    splitEditor.addEventListener('input', () => {
      this.currentCode = splitEditor.value;
      this.updateLineNumbers();
      if (editor) editor.value = this.currentCode;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => this.updatePreview(), 300);
    });

    splitEditor.addEventListener('blur', () => {
      if (this.currentCode !== this.codeHistory[this.codeHistoryIndex]) {
        this.pushCodeHistory(this.currentCode);
      }
    });

    // Tab key support
    const handleTab = (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        e.target.value = e.target.value.substring(0, start) + '  ' + e.target.value.substring(end);
        e.target.selectionStart = e.target.selectionEnd = start + 2;
        e.target.dispatchEvent(new Event('input'));
      }
    };
    editor.addEventListener('keydown', handleTab);
    splitEditor.addEventListener('keydown', handleTab);

    // Scroll sync for line numbers
    editor.addEventListener('scroll', () => {
      const ln = document.getElementById('line-numbers');
      if (ln) ln.scrollTop = editor.scrollTop;
    });
    splitEditor.addEventListener('scroll', () => {
      const ln = document.getElementById('split-line-numbers');
      if (ln) ln.scrollTop = splitEditor.scrollTop;
    });
  }

  updateCodeView() {
    const code = this.currentCode;
    const editor = document.getElementById('code-editor');
    const splitEditor = document.getElementById('split-code-editor');
    if (editor) editor.value = code;
    if (splitEditor) splitEditor.value = code;
    this.updateLineNumbers();
  }

  updateLineNumbers() {
    const code = this.currentCode;
    const lines = code.split('\n');
    const lineHtml = lines.map((_, i) => `<div>${i + 1}</div>`).join('');
    const ln = document.getElementById('line-numbers');
    const sln = document.getElementById('split-line-numbers');
    if (ln) ln.innerHTML = lineHtml;
    if (sln) sln.innerHTML = lineHtml;
  }


  // ============ UNDO/REDO (Feature 3) ============

  setupUndoRedo() {
    document.getElementById('btn-undo').addEventListener('click', () => this.undo());
    document.getElementById('btn-redo').addEventListener('click', () => this.redo());

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        // Only if not focused on the editor
        if (document.activeElement.id !== 'code-editor' && document.activeElement.id !== 'split-code-editor') {
          e.preventDefault();
          this.undo();
        }
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        if (document.activeElement.id !== 'code-editor' && document.activeElement.id !== 'split-code-editor') {
          e.preventDefault();
          this.redo();
        }
      }
    });
  }

  pushCodeHistory(code) {
    // Remove any redo states
    this.codeHistory = this.codeHistory.slice(0, this.codeHistoryIndex + 1);
    // Don't push duplicates
    if (this.codeHistory[this.codeHistory.length - 1] === code) return;
    this.codeHistory.push(code);
    this.codeHistoryIndex = this.codeHistory.length - 1;
    this.updateUndoRedoButtons();
  }

  undo() {
    if (this.codeHistoryIndex > 0) {
      this.codeHistoryIndex--;
      this.currentCode = this.codeHistory[this.codeHistoryIndex];
      this.updatePreview();
      this.updateCodeView();
      this.updateUndoRedoButtons();
    }
  }

  redo() {
    if (this.codeHistoryIndex < this.codeHistory.length - 1) {
      this.codeHistoryIndex++;
      this.currentCode = this.codeHistory[this.codeHistoryIndex];
      this.updatePreview();
      this.updateCodeView();
      this.updateUndoRedoButtons();
    }
  }

  updateUndoRedoButtons() {
    document.getElementById('btn-undo').disabled = this.codeHistoryIndex <= 0;
    document.getElementById('btn-redo').disabled = this.codeHistoryIndex >= this.codeHistory.length - 1;
    document.getElementById('version-count').textContent = `v${this.codeHistoryIndex + 1}`;
  }

  // ============ DEVICE TOGGLE ============

  setupDeviceToggle() {
    const dBtn = document.getElementById('btn-device-desktop');
    const mBtn = document.getElementById('btn-device-mobile');
    const pc = document.getElementById('preview-container');
    dBtn.addEventListener('click', () => { dBtn.classList.add('active'); mBtn.classList.remove('active'); pc.classList.remove('mobile'); });
    mBtn.addEventListener('click', () => { mBtn.classList.add('active'); dBtn.classList.remove('active'); pc.classList.add('mobile'); });
  }


  // ============ ACTIONS ============

  setupActions() {
    document.getElementById('btn-refresh').addEventListener('click', () => { this.updatePreview(); this.showToast('Preview refreshed', 'success'); });
    document.getElementById('btn-copy-code').addEventListener('click', () => { navigator.clipboard.writeText(this.currentCode); this.showToast('Code copied to clipboard', 'success'); });
    document.getElementById('btn-download').addEventListener('click', () => { const blob = new Blob([this.currentCode], { type: 'text/html' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'index.html'; a.click(); URL.revokeObjectURL(url); });
    document.getElementById('btn-download-zip').addEventListener('click', () => this.downloadAsZip());
    document.getElementById('btn-deploy').addEventListener('click', () => this.deployProject());
  }

  async downloadAsZip() {
    try {
      const zip = new JSZip();
      const code = this.currentCode;
      const styleMatch = code.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
      const cssContent = styleMatch ? styleMatch[1].trim() : '';
      const scriptMatch = code.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
      const jsContent = scriptMatch ? scriptMatch[1].trim() : '';
      let cleanHtml = code;
      if (cssContent) cleanHtml = cleanHtml.replace(/<style[^>]*>[\s\S]*?<\/style>/i, '  <link rel="stylesheet" href="styles.css">');
      if (jsContent) cleanHtml = cleanHtml.replace(/<script[^>]*>[\s\S]*?<\/script>/i, '  <script src="script.js"><\/script>');
      zip.file('index.html', cleanHtml);
      if (cssContent) zip.file('styles.css', cssContent);
      if (jsContent) zip.file('script.js', jsContent);
      zip.file('index-full.html', code);
      zip.file('README.txt', `Generated by ZSA AI - Chat to Code\nDate: ${new Date().toLocaleString()}\n\nFiles:\n- index.html: Main HTML\n- styles.css: Stylesheet\n- script.js: JavaScript\n- index-full.html: Single-file version`);
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a'); a.href = url; a.download = 'project.zip'; a.click(); URL.revokeObjectURL(url);
      this.showToast('Project downloaded as ZIP', 'success');
    } catch (error) { this.showToast('Failed to create ZIP: ' + error.message, 'error'); }
  }

  // Feature 4: Deploy
  async deployProject() {
    try {
      const zip = new JSZip();
      const code = this.currentCode;
      const styleMatch = code.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
      const cssContent = styleMatch ? styleMatch[1].trim() : '';
      const scriptMatch = code.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
      const jsContent = scriptMatch ? scriptMatch[1].trim() : '';

      let cleanHtml = code;
      if (cssContent) cleanHtml = cleanHtml.replace(/<style[^>]*>[\s\S]*?<\/style>/i, '  <link rel="stylesheet" href="styles.css">');
      if (jsContent) cleanHtml = cleanHtml.replace(/<script[^>]*>[\s\S]*?<\/script>/i, '  <script src="script.js"><\/script>');

      zip.file('index.html', cleanHtml);
      if (cssContent) zip.file('styles.css', cssContent);
      if (jsContent) zip.file('script.js', jsContent);
      zip.file('index-full.html', code);

      // Package.json for static hosting
      zip.file('package.json', JSON.stringify({
        name: 'zsa-ai-project',
        version: '1.0.0',
        description: 'Generated by ZSA AI',
        scripts: { start: 'npx serve .' },
        license: 'MIT'
      }, null, 2));

      // Netlify config
      zip.file('netlify.toml', `[build]\n  publish = "."\n\n[[redirects]]\n  from = "/*"\n  to = "/index.html"\n  status = 200\n`);

      // Vercel config
      zip.file('vercel.json', JSON.stringify({
        version: 2,
        builds: [{ src: './**', use: '@vercel/static' }],
        routes: [{ src: '/(.*)', dest: '/$1' }]
      }, null, 2));

      // README
      zip.file('README.md', `# ZSA AI Generated Project\n\nGenerated on ${new Date().toLocaleString()}\n\n## Deploy\n\n### Netlify\n1. Drag and drop this folder to [Netlify Drop](https://app.netlify.com/drop)\n\n### Vercel\n1. \`npm i -g vercel\`\n2. \`vercel\`\n\n### Local\n1. \`npx serve .\`\n`);

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a'); a.href = url; a.download = 'deploy-ready.zip'; a.click(); URL.revokeObjectURL(url);
      this.showToast('Deploy-ready ZIP downloaded! Upload to Netlify/Vercel', 'success');
    } catch (error) { this.showToast('Failed to create deploy ZIP: ' + error.message, 'error'); }
  }


  // ============ CHAT HISTORY (Feature 2) ============

  setupHistory() {
    document.getElementById('btn-history').addEventListener('click', () => this.openHistory());
    document.getElementById('btn-close-history').addEventListener('click', () => this.closeHistory());
    document.querySelector('#history-modal .modal-overlay').addEventListener('click', () => this.closeHistory());
  }

  openHistory() {
    document.getElementById('history-modal').classList.remove('hidden');
    this.renderHistoryList();
  }

  closeHistory() {
    document.getElementById('history-modal').classList.add('hidden');
  }

  renderHistoryList() {
    const list = document.getElementById('history-list');
    list.innerHTML = '';
    if (this.chatHistoryList.length === 0) {
      list.innerHTML = '<div class="model-dropdown-empty">No chat history yet</div>';
      return;
    }
    this.chatHistoryList.forEach(entry => {
      const div = document.createElement('div');
      div.className = 'history-item';
      const date = new Date(entry.timestamp).toLocaleDateString();
      div.innerHTML = `<div class="history-item-info"><h4>${this.escapeHtml(entry.name)}</h4><p>${date} - ${entry.messages.length} messages</p></div><button class="btn-delete" data-id="${entry.id}" title="Delete"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button>`;
      div.querySelector('.history-item-info').addEventListener('click', () => this.loadChatFromHistory(entry));
      div.querySelector('.btn-delete').addEventListener('click', (e) => {
        e.stopPropagation();
        this.chatHistoryList = this.chatHistoryList.filter(h => h.id !== entry.id);
        this.saveChatHistory();
        this.renderHistoryList();
      });
      list.appendChild(div);
    });
  }

  loadChatFromHistory(entry) {
    this.messages = [...entry.messages];
    const container = document.getElementById('chat-messages');
    container.innerHTML = '';
    const welcome = document.getElementById('welcome-screen');
    if (welcome) welcome.style.display = 'none';
    this.messages.forEach(msg => this.renderMessage(msg));
    if (entry.lastCode) {
      this.currentCode = entry.lastCode;
      this.pushCodeHistory(entry.lastCode);
      this.updatePreview();
      this.updateCodeView();
    }
    this.closeHistory();
    this.showToast('Chat loaded', 'success');
  }

  // ============ TEMPLATES (Feature 5) ============

  setupTemplates() {
    document.getElementById('btn-templates').addEventListener('click', () => this.openTemplates());
    document.getElementById('btn-close-templates').addEventListener('click', () => this.closeTemplates());
    document.querySelector('#templates-modal .modal-overlay').addEventListener('click', () => this.closeTemplates());
  }

  openTemplates() {
    document.getElementById('templates-modal').classList.remove('hidden');
    this.renderTemplateCategories();
    const firstCat = Object.keys(templatesData)[0];
    this.renderTemplateGrid(firstCat);
  }

  closeTemplates() {
    document.getElementById('templates-modal').classList.add('hidden');
  }

  renderTemplateCategories() {
    const container = document.getElementById('template-categories');
    container.innerHTML = '';
    Object.keys(templatesData).forEach((cat, i) => {
      const btn = document.createElement('button');
      btn.className = `template-tab ${i === 0 ? 'active' : ''}`;
      btn.textContent = cat;
      btn.addEventListener('click', () => {
        container.querySelectorAll('.template-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderTemplateGrid(cat);
      });
      container.appendChild(btn);
    });
  }

  renderTemplateGrid(category) {
    const grid = document.getElementById('template-grid');
    grid.innerHTML = '';
    const templates = templatesData[category] || [];
    templates.forEach(tmpl => {
      const card = document.createElement('div');
      card.className = 'template-card';
      card.innerHTML = `<h4>${tmpl.name}</h4><p>${tmpl.description}</p>`;
      card.addEventListener('click', () => {
        this.currentCode = tmpl.code;
        this.pushCodeHistory(tmpl.code);
        this.updatePreview();
        this.updateCodeView();
        this.closeTemplates();
        this.showToast(`Template "${tmpl.name}" loaded`, 'success');
      });
      grid.appendChild(card);
    });
  }


  // ============ DESIGN TOOLS (Feature 6) ============

  setupDesignTools() {
    const panel = document.getElementById('design-tools-panel');
    document.getElementById('btn-design-tools').addEventListener('click', (e) => {
      e.stopPropagation();
      panel.classList.toggle('hidden');
      document.getElementById('plugins-panel').classList.add('hidden');
    });
    document.getElementById('btn-close-design').addEventListener('click', () => panel.classList.add('hidden'));

    // Color picker
    document.getElementById('design-color').addEventListener('input', (e) => {
      document.documentElement.style.setProperty('--accent', e.target.value);
      // Compute hover and glow variants
      document.documentElement.style.setProperty('--accent-hover', e.target.value + 'cc');
      document.documentElement.style.setProperty('--accent-glow', e.target.value + '4d');
      document.documentElement.style.setProperty('--accent-subtle', e.target.value + '1a');
      document.documentElement.style.setProperty('--border-accent', e.target.value + '66');
      document.documentElement.style.setProperty('--text-accent', e.target.value);
    });

    // Font selector
    document.getElementById('design-font').addEventListener('change', (e) => {
      document.body.style.fontFamily = e.target.value;
    });

    // Theme toggle
    document.getElementById('btn-theme-toggle').addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-theme');
      document.getElementById('btn-theme-toggle').textContent = isLight ? this.t('dark') : this.t('light');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target) && !document.getElementById('btn-design-tools').contains(e.target)) {
        panel.classList.add('hidden');
      }
    });
  }

  // ============ PLUGINS / LIBRARIES (Feature 8) ============

  setupPlugins() {
    const panel = document.getElementById('plugins-panel');
    document.getElementById('btn-plugins').addEventListener('click', (e) => {
      e.stopPropagation();
      panel.classList.toggle('hidden');
      document.getElementById('design-tools-panel').classList.add('hidden');
    });
    document.getElementById('btn-close-plugins').addEventListener('click', () => panel.classList.add('hidden'));

    panel.querySelectorAll('.plugin-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lib = btn.dataset.lib;
        this.injectLibrary(lib);
        panel.classList.add('hidden');
      });
    });

    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target) && !document.getElementById('btn-plugins').contains(e.target)) {
        panel.classList.add('hidden');
      }
    });
  }

  injectLibrary(lib) {
    const cdn = cdnLibraries[lib];
    if (!cdn) return;

    // Check if already injected
    if (this.currentCode.includes(cdn.replace('<script', '').replace('<\\/script>', ''))) {
      this.showToast(`${lib} is already included`, 'warning');
      return;
    }

    // Inject before </head>
    if (this.currentCode.includes('</head>')) {
      this.currentCode = this.currentCode.replace('</head>', `  ${cdn}\n</head>`);
    } else {
      // Inject at beginning
      this.currentCode = cdn + '\n' + this.currentCode;
    }

    this.pushCodeHistory(this.currentCode);
    this.updatePreview();
    this.updateCodeView();
    this.showToast(`${lib} added successfully`, 'success');
  }


  // ============ MULTI-PROJECT TABS (Feature 7) ============

  setupProjectTabs() {
    document.getElementById('btn-add-tab').addEventListener('click', () => this.addProjectTab());
  }

  renderProjectTabs() {
    const container = document.getElementById('project-tabs-list');
    container.innerHTML = '';
    this.projects.forEach(proj => {
      const tab = document.createElement('div');
      tab.className = `project-tab ${proj.id === this.activeProjectId ? 'active' : ''}`;
      tab.innerHTML = `<span class="tab-name">${this.escapeHtml(proj.name)}</span>${this.projects.length > 1 ? '<button class="tab-close">&times;</button>' : ''}`;

      tab.querySelector('.tab-name').addEventListener('click', () => this.switchProjectTab(proj.id));

      // Double-click to rename
      tab.querySelector('.tab-name').addEventListener('dblclick', (e) => {
        e.stopPropagation();
        const nameEl = tab.querySelector('.tab-name');
        const currentName = proj.name;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentName;
        input.style.cssText = 'width:80px;font-size:11px;padding:2px 4px;border:1px solid var(--accent);border-radius:3px;background:var(--bg-input);color:var(--text-primary);outline:none;';
        nameEl.replaceWith(input);
        input.focus();
        input.select();
        const finishRename = () => {
          proj.name = input.value.trim() || currentName;
          this.renderProjectTabs();
        };
        input.addEventListener('blur', finishRename);
        input.addEventListener('keydown', (ev) => { if (ev.key === 'Enter') finishRename(); });
      });

      const closeBtn = tab.querySelector('.tab-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.closeProjectTab(proj.id);
        });
      }
      container.appendChild(tab);
    });
  }

  addProjectTab() {
    const newId = Date.now().toString();
    const newProj = { id: newId, name: `Project ${this.projects.length + 1}`, code: this.getDefaultCode(), messages: [] };
    this.projects.push(newProj);
    this.switchProjectTab(newId);
  }

  switchProjectTab(id) {
    // Save current project state
    const currentProj = this.projects.find(p => p.id === this.activeProjectId);
    if (currentProj) {
      currentProj.code = this.currentCode;
      currentProj.messages = [...this.messages];
    }

    // Switch
    this.activeProjectId = id;
    const proj = this.projects.find(p => p.id === id);
    if (proj) {
      this.currentCode = proj.code;
      this.messages = proj.messages || [];
      this.codeHistory = [proj.code];
      this.codeHistoryIndex = 0;
      this.updatePreview();
      this.updateCodeView();
      this.updateUndoRedoButtons();

      // Reload chat messages UI
      const container = document.getElementById('chat-messages');
      container.innerHTML = '';
      if (this.messages.length === 0) {
        const welcome = document.getElementById('welcome-screen');
        if (welcome) { welcome.style.display = ''; container.appendChild(welcome); }
      } else {
        const welcome = document.getElementById('welcome-screen');
        if (welcome) welcome.style.display = 'none';
        this.messages.forEach(msg => this.renderMessage(msg));
      }
    }
    this.renderProjectTabs();
  }

  closeProjectTab(id) {
    if (this.projects.length <= 1) return;
    this.projects = this.projects.filter(p => p.id !== id);
    if (this.activeProjectId === id) {
      this.switchProjectTab(this.projects[0].id);
    } else {
      this.renderProjectTabs();
    }
  }


  // ============ SETTINGS ============

  setupSettings() {
    const modal = document.getElementById('settings-modal');
    document.getElementById('btn-settings').addEventListener('click', () => this.openSettings());
    document.getElementById('btn-close-settings').addEventListener('click', () => this.closeSettings());
    modal.querySelector('.modal-overlay').addEventListener('click', () => this.closeSettings());
    document.getElementById('btn-add-model').addEventListener('click', () => { document.getElementById('add-model-form').classList.remove('hidden'); document.getElementById('btn-add-model').classList.add('hidden'); });
    document.getElementById('btn-cancel-model').addEventListener('click', () => { document.getElementById('add-model-form').classList.add('hidden'); document.getElementById('btn-add-model').classList.remove('hidden'); this.resetModelForm(); });
    document.getElementById('btn-save-model').addEventListener('click', () => this.saveNewModel());
    document.querySelectorAll('.type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active');
        const provider = document.getElementById('model-provider'); const apiKeyRow = document.getElementById('api-key-row');
        if (btn.dataset.type === 'local') { provider.innerHTML = '<option value="ollama">Ollama</option><option value="openai-compatible">OpenAI Compatible</option><option value="custom">Other</option>'; apiKeyRow.classList.add('hidden'); }
        else { provider.innerHTML = '<option value="openai-compatible">OpenAI Compatible (OpenAI, DeepSeek, Groq, Together, Mistral...)</option><option value="anthropic">Anthropic (Claude)</option><option value="ollama">Ollama</option><option value="custom">Other</option>'; apiKeyRow.classList.remove('hidden'); }
      });
    });
  }

  openSettings() { document.getElementById('settings-modal').classList.remove('hidden'); this.renderModelsList(); }
  closeSettings() { document.getElementById('settings-modal').classList.add('hidden'); document.getElementById('add-model-form').classList.add('hidden'); document.getElementById('btn-add-model').classList.remove('hidden'); this.resetModelForm(); }

  renderModelsList() {
    const list = document.getElementById('models-list'); list.innerHTML = '';
    this.models.forEach(model => {
      const isActive = model.id === this.activeModelId;
      const div = document.createElement('div'); div.className = `model-item ${isActive ? 'active' : ''}`;
      const icon = model.type === 'local' ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1"/><circle cx="6" cy="18" r="1"/></svg>' : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>';
      div.innerHTML = `<div class="model-item-left"><div class="model-item-icon ${model.type === 'local' ? 'local' : 'online'}">${icon}</div><div class="model-item-info"><h4>${this.escapeHtml(model.name)}</h4><p>${model.provider} / ${model.model}</p></div></div><div class="model-item-actions">${isActive ? '<span class="badge badge-active">Active</span>' : `<button class="badge badge-activate" data-id="${model.id}">Activate</button>`}<button class="btn-edit" data-id="${model.id}" title="Edit"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button><button class="btn-delete" data-id="${model.id}" title="Delete"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button></div>`;
      list.appendChild(div);
    });
    list.querySelectorAll('.badge-activate').forEach(btn => { btn.addEventListener('click', () => { this.activeModelId = btn.dataset.id; this.saveModels(); this.renderModelsList(); this.updateModelIndicator(); this.showToast('Model activated', 'success'); }); });
    list.querySelectorAll('.btn-edit').forEach(btn => { btn.addEventListener('click', () => { this.editModel(btn.dataset.id); }); });
    list.querySelectorAll('.btn-delete').forEach(btn => { btn.addEventListener('click', () => { this.models = this.models.filter(m => m.id !== btn.dataset.id); if (this.activeModelId === btn.dataset.id) this.activeModelId = this.models.length > 0 ? this.models[0].id : null; this.saveModels(); this.renderModelsList(); this.updateModelIndicator(); }); });
  }

  editModel(modelId) {
    const model = this.models.find(m => m.id === modelId);
    if (!model) return;
    // Show the form pre-filled with model data
    document.getElementById('add-model-form').classList.remove('hidden');
    document.getElementById('btn-add-model').classList.add('hidden');
    document.getElementById('model-name').value = model.name || '';
    document.getElementById('model-model').value = model.model || '';
    document.getElementById('model-url').value = model.baseUrl || '';
    document.getElementById('model-key').value = model.apiKey || '';
    // Set editing flag
    this._editingModelId = modelId;
  }

  async saveNewModel() {
    const name = document.getElementById('model-name').value.trim();
    const model = document.getElementById('model-model').value.trim();
    const provider = document.getElementById('model-provider').value;
    const baseUrl = document.getElementById('model-url').value.trim();
    const apiKey = document.getElementById('model-key').value.trim();
    const type = document.querySelector('.type-btn.active').dataset.type;
    if (!name || !model) { this.showToast('Please fill in name and model fields', 'error'); return; }

    if (this._editingModelId) {
      // Update existing model
      const idx = this.models.findIndex(m => m.id === this._editingModelId);
      if (idx !== -1) {
        this.models[idx] = { ...this.models[idx], name, model, provider, baseUrl: baseUrl || undefined, apiKey: apiKey || undefined, type };
      }
      this._editingModelId = null;
      this.showToast('Model updated successfully', 'success');
    } else {
      // Add new model
      const newModel = { id: Date.now().toString(), name, model, provider, baseUrl: baseUrl || undefined, apiKey: apiKey || undefined, type, isActive: true };
      this.models.push(newModel);
      if (!this.activeModelId) this.activeModelId = newModel.id;
      this.showToast('Model added successfully', 'success');
    }

    await this.saveModels(); this.renderModelsList(); this.updateModelIndicator();
    document.getElementById('add-model-form').classList.add('hidden');
    document.getElementById('btn-add-model').classList.remove('hidden');
    this.resetModelForm();
  }

  resetModelForm() {
    ['model-name', 'model-model', 'model-url', 'model-key'].forEach(id => document.getElementById(id).value = '');
    this._editingModelId = null;
  }


  // ============ MODEL INDICATOR ============

  updateModelIndicator() {
    const model = this.getActiveModel();
    const nameEl = document.getElementById('active-model-name');
    const dot = document.querySelector('.model-dot');
    if (model) { nameEl.textContent = model.name; dot.classList.remove('disconnected'); }
    else { nameEl.textContent = this.t('noModel'); dot.classList.add('disconnected'); }
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
