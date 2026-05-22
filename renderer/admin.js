// ============================================
// ZSA AI - Admin Dashboard
// ============================================

class AdminPanel {
  constructor() {
    this.isLoggedIn = false;
    this.models = [];
    this.activeModelId = null;
    this.plans = [];
    this.users = [];
    this.platform = {};
    this.pages = {};
    this.smtp = {};
    this.gateways = {};
    this.init();
  }

  async init() {
    this.setupTitlebar();
    this.setupLogin();
    this.setupSidebar();
    this.setupNavigation();
    this.setupEventListeners();
    await this.checkSession();
  }

  // ============ TITLEBAR ============
  setupTitlebar() {
    document.getElementById('btn-minimize').addEventListener('click', () => window.electronAPI.minimize());
    document.getElementById('btn-maximize').addEventListener('click', () => window.electronAPI.maximize());
    document.getElementById('btn-close').addEventListener('click', () => window.electronAPI.close());
  }


  // ============ SESSION ============
  async checkSession() {
    const session = await window.electronAPI.getStore('admin.session');
    if (session && session.loggedIn) {
      this.isLoggedIn = true;
      this.showDashboard();
    }
  }

  // ============ LOGIN ============
  setupLogin() {
    const loginBtn = document.getElementById('btn-login');
    const passwordInput = document.getElementById('login-password');

    loginBtn.addEventListener('click', () => this.handleLogin());
    passwordInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.handleLogin();
    });
  }

  async handleLogin() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    const errorEl = document.getElementById('login-error');

    if (!username || !password) {
      errorEl.textContent = 'Please fill in all fields';
      errorEl.style.display = 'block';
      return;
    }

    // Check credentials
    let storedHash = await window.electronAPI.getStore('admin.password');
    if (!storedHash) {
      // First time - set default password
      storedHash = this.hashPassword('admin123');
      await window.electronAPI.setStore('admin.password', storedHash);
    }

    if (username === 'admin' && this.hashPassword(password) === storedHash) {
      this.isLoggedIn = true;
      await window.electronAPI.setStore('admin.session', { loggedIn: true, time: Date.now() });
      errorEl.style.display = 'none';
      this.showDashboard();
    } else {
      errorEl.textContent = 'Invalid username or password';
      errorEl.style.display = 'block';
    }
  }

  hashPassword(password) {
    // Simple hash for local storage (not for production security)
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return 'h_' + Math.abs(hash).toString(36) + '_' + password.length;
  }


  async showDashboard() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('admin-layout').classList.remove('hidden');
    await this.loadAllData();
    this.renderDashboard();
  }

  async logout() {
    await window.electronAPI.setStore('admin.session', { loggedIn: false });
    this.isLoggedIn = false;
    document.getElementById('admin-layout').classList.add('hidden');
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
  }

  // ============ DATA LOADING ============
  async loadAllData() {
    this.models = (await window.electronAPI.getStore('models')) || [];
    this.activeModelId = await window.electronAPI.getStore('activeModelId');
    this.plans = (await window.electronAPI.getStore('admin.pricing')) || [];
    this.users = (await window.electronAPI.getStore('admin.users')) || [];
    this.platform = (await window.electronAPI.getStore('admin.platform')) || {
      name: 'ZSA AI',
      description: 'Chat to Code - Professional AI Code Generator',
      color: '#6366f1',
      language: 'ar'
    };
    this.pages = (await window.electronAPI.getStore('admin.pages')) || {
      privacy: '',
      about: '',
      terms: ''
    };
    this.smtp = (await window.electronAPI.getStore('admin.smtp')) || {
      host: '',
      port: 587,
      username: '',
      password: '',
      fromEmail: '',
      fromName: '',
      tls: true
    };
    this.gateways = (await window.electronAPI.getStore('admin.gateways')) || {
      paypal: '',
      stripe: '',
      customName: '',
      customUrl: ''
    };
  }


  // ============ SIDEBAR ============
  setupSidebar() {
    document.getElementById('btn-sidebar-toggle').addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('collapsed');
    });

    document.getElementById('btn-back-app').addEventListener('click', () => {
      window.electronAPI.openMainApp();
    });
  }

  // ============ NAVIGATION ============
  setupNavigation() {
    document.querySelectorAll('.sidebar-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const page = item.dataset.page;
        this.navigate(page);
      });
    });
  }

  navigate(page) {
    // Update sidebar active state
    document.querySelectorAll('.sidebar-nav-item').forEach(i => i.classList.remove('active'));
    const activeItem = document.querySelector(`.sidebar-nav-item[data-page="${page}"]`);
    if (activeItem) activeItem.classList.add('active');

    // Show page
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const pageEl = document.getElementById(`page-${page}`);
    if (pageEl) pageEl.classList.add('active');

    // Render page content
    this.renderPage(page);
  }

  renderPage(page) {
    switch(page) {
      case 'dashboard': this.renderDashboard(); break;
      case 'platform': this.renderPlatform(); break;
      case 'models': this.renderModels(); break;
      case 'pricing': this.renderPricing(); break;
      case 'pages': this.renderPages(); break;
      case 'smtp': this.renderSmtp(); break;
      case 'users': this.renderUsers(); break;
    }
  }


  // ============ EVENT LISTENERS ============
  setupEventListeners() {
    // Logout
    document.getElementById('btn-logout').addEventListener('click', () => this.logout());

    // Change Password
    document.getElementById('btn-change-password').addEventListener('click', () => this.showChangePasswordModal());

    // Platform
    document.getElementById('btn-save-platform').addEventListener('click', () => this.savePlatform());

    // Models
    document.getElementById('btn-add-model').addEventListener('click', () => this.showModelModal());

    // Pricing
    document.getElementById('btn-add-plan').addEventListener('click', () => this.showPlanModal());
    document.getElementById('btn-save-gateways').addEventListener('click', () => this.saveGateways());

    // Pages
    document.getElementById('btn-save-pages').addEventListener('click', () => this.savePages());

    // SMTP
    document.getElementById('btn-save-smtp').addEventListener('click', () => this.saveSmtp());
    document.getElementById('btn-test-smtp').addEventListener('click', () => this.testSmtp());

    // Users
    document.getElementById('btn-add-user').addEventListener('click', () => this.showUserModal());

    // Modal close
    document.getElementById('modal-overlay').addEventListener('click', (e) => {
      if (e.target === document.getElementById('modal-overlay')) {
        this.closeModal();
      }
    });
  }

  // ============ DASHBOARD ============
  renderDashboard() {
    document.getElementById('stat-models').textContent = this.models.length;
    document.getElementById('stat-users').textContent = this.users.length;
    document.getElementById('stat-plans').textContent = this.plans.length;
    const pagesCount = [this.pages.privacy, this.pages.about, this.pages.terms].filter(p => p && p.trim()).length;
    document.getElementById('stat-pages').textContent = pagesCount;
  }


  // ============ PLATFORM SETTINGS ============
  renderPlatform() {
    document.getElementById('platform-name').value = this.platform.name || 'ZSA AI';
    document.getElementById('platform-description').value = this.platform.description || '';
    document.getElementById('platform-color').value = this.platform.color || '#6366f1';
    document.getElementById('platform-language').value = this.platform.language || 'ar';
  }

  async savePlatform() {
    this.platform = {
      name: document.getElementById('platform-name').value.trim() || 'ZSA AI',
      description: document.getElementById('platform-description').value.trim(),
      color: document.getElementById('platform-color').value,
      language: document.getElementById('platform-language').value
    };
    await window.electronAPI.setStore('admin.platform', this.platform);
    this.showToast('Platform settings saved!', 'success');
  }

  // ============ MODELS ============
  renderModels() {
    const tbody = document.getElementById('models-table-body');
    if (this.models.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:30px;">No models configured</td></tr>';
      return;
    }
    tbody.innerHTML = this.models.map(model => `
      <tr>
        <td><strong>${this.escapeHtml(model.name)}</strong></td>
        <td>${this.escapeHtml(model.provider || 'openai-compatible')}</td>
        <td><code style="font-size:11px;color:var(--text-accent)">${this.escapeHtml(model.model)}</code></td>
        <td>${model.type === 'local' ? '<span class="badge badge-active">Local</span>' : '<span class="badge badge-default">Online</span>'}</td>
        <td>${model.id === this.activeModelId ? '<span class="badge badge-active">Default</span>' : '<button class="btn btn-sm btn-secondary" onclick="admin.setDefaultModel(\''+model.id+'\')">Set Default</button>'}</td>
        <td>
          <button class="btn btn-sm btn-secondary" onclick="admin.showModelModal('${model.id}')">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="admin.deleteModel('${model.id}')">Delete</button>
        </td>
      </tr>
    `).join('');
  }


  showModelModal(editId = null) {
    const model = editId ? this.models.find(m => m.id === editId) : null;
    const title = model ? 'Edit Model' : 'Add New Model';

    this.openModal(`
      <h3>${title}</h3>
      <div class="form-group">
        <label>Provider</label>
        <select id="modal-model-provider">
          <option value="openai-compatible" ${model?.provider === 'openai-compatible' ? 'selected' : ''}>OpenAI Compatible</option>
          <option value="anthropic" ${model?.provider === 'anthropic' ? 'selected' : ''}>Anthropic (Claude)</option>
          <option value="ollama" ${model?.provider === 'ollama' ? 'selected' : ''}>Ollama (Local)</option>
          <option value="custom" ${model?.provider === 'custom' ? 'selected' : ''}>Other</option>
        </select>
      </div>
      <div class="form-group">
        <label>Display Name</label>
        <input type="text" id="modal-model-name" placeholder="e.g., GPT-4o" value="${model ? this.escapeHtml(model.name) : ''}">
      </div>
      <div class="form-group">
        <label>Model Name</label>
        <input type="text" id="modal-model-model" placeholder="e.g., gpt-4o" value="${model ? this.escapeHtml(model.model) : ''}">
      </div>
      <div class="form-group">
        <label>Base URL</label>
        <input type="text" id="modal-model-url" placeholder="https://api.openai.com/v1" value="${model ? this.escapeHtml(model.baseUrl || '') : ''}">
      </div>
      <div class="form-group">
        <label>API Key</label>
        <input type="password" id="modal-model-key" placeholder="sk-..." value="${model ? this.escapeHtml(model.apiKey || '') : ''}">
      </div>
      <div class="form-group" style="display:flex;align-items:center;gap:12px;">
        <label style="margin-bottom:0;">Type: Local Model</label>
        <label class="toggle">
          <input type="checkbox" id="modal-model-local" ${model?.type === 'local' ? 'checked' : ''}>
          <span class="toggle-slider"></span>
        </label>
      </div>
      <div class="form-actions">
        <button class="btn btn-secondary" onclick="admin.closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="admin.saveModel('${editId || ''}')">Save Model</button>
      </div>
    `);
  }

  async saveModel(editId) {
    const provider = document.getElementById('modal-model-provider').value;
    const name = document.getElementById('modal-model-name').value.trim();
    const model = document.getElementById('modal-model-model').value.trim();
    const baseUrl = document.getElementById('modal-model-url').value.trim();
    const apiKey = document.getElementById('modal-model-key').value.trim();
    const isLocal = document.getElementById('modal-model-local').checked;

    if (!name || !model) {
      this.showToast('Name and Model are required', 'error');
      return;
    }

    if (editId) {
      const idx = this.models.findIndex(m => m.id === editId);
      if (idx !== -1) {
        this.models[idx] = { ...this.models[idx], provider, name, model, baseUrl, apiKey, type: isLocal ? 'local' : 'online' };
      }
    } else {
      this.models.push({
        id: 'model_' + Date.now(),
        provider, name, model, baseUrl, apiKey,
        type: isLocal ? 'local' : 'online'
      });
    }

    await window.electronAPI.setStore('models', this.models);
    this.closeModal();
    this.renderModels();
    this.showToast('Model saved!', 'success');
  }


  async setDefaultModel(id) {
    this.activeModelId = id;
    await window.electronAPI.setStore('activeModelId', id);
    this.renderModels();
    this.showToast('Default model updated!', 'success');
  }

  async deleteModel(id) {
    if (!confirm('Are you sure you want to delete this model?')) return;
    this.models = this.models.filter(m => m.id !== id);
    if (this.activeModelId === id) {
      this.activeModelId = this.models.length > 0 ? this.models[0].id : null;
      await window.electronAPI.setStore('activeModelId', this.activeModelId);
    }
    await window.electronAPI.setStore('models', this.models);
    this.renderModels();
    this.showToast('Model deleted', 'info');
  }

  // ============ PRICING ============
  renderPricing() {
    const container = document.getElementById('plans-list');
    if (this.plans.length === 0) {
      container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:20px;">No pricing plans. Click "+ Add Plan" to create one.</p>';
    } else {
      container.innerHTML = this.plans.map((plan, idx) => `
        <div class="plan-card ${plan.isPopular ? 'popular' : ''}">
          <div class="plan-card-header">
            <h4>${this.escapeHtml(plan.name)} ${plan.isPopular ? '<span class="badge badge-popular">Popular</span>' : ''}</h4>
          </div>
          <div class="plan-price">${this.escapeHtml(plan.currency || '$')}${plan.price}/${plan.period || 'month'}</div>
          <ul class="plan-features">
            ${(plan.features || []).map(f => `<li>${this.escapeHtml(f)}</li>`).join('')}
          </ul>
          <div class="plan-card-actions">
            <button class="btn btn-sm btn-secondary" onclick="admin.showPlanModal(${idx})">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="admin.deletePlan(${idx})">Delete</button>
          </div>
        </div>
      `).join('');
    }

    // Render gateways
    document.getElementById('gateway-paypal').value = this.gateways.paypal || '';
    document.getElementById('gateway-stripe').value = this.gateways.stripe || '';
    document.getElementById('gateway-custom-name').value = this.gateways.customName || '';
    document.getElementById('gateway-custom-url').value = this.gateways.customUrl || '';
  }


  showPlanModal(editIdx = null) {
    const plan = editIdx !== null ? this.plans[editIdx] : null;
    const title = plan ? 'Edit Plan' : 'Add New Plan';
    const features = plan ? (plan.features || []) : [''];

    this.openModal(`
      <h3>${title}</h3>
      <div class="form-group">
        <label>Plan Name</label>
        <input type="text" id="modal-plan-name" placeholder="e.g., Pro" value="${plan ? this.escapeHtml(plan.name) : ''}">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Price</label>
          <input type="number" id="modal-plan-price" placeholder="9.99" value="${plan ? plan.price : ''}">
        </div>
        <div class="form-group">
          <label>Currency</label>
          <input type="text" id="modal-plan-currency" placeholder="$" value="${plan ? this.escapeHtml(plan.currency || '$') : '$'}">
        </div>
      </div>
      <div class="form-group">
        <label>Billing Period</label>
        <select id="modal-plan-period">
          <option value="month" ${plan?.period === 'month' ? 'selected' : ''}>Monthly</option>
          <option value="year" ${plan?.period === 'year' ? 'selected' : ''}>Yearly</option>
          <option value="lifetime" ${plan?.period === 'lifetime' ? 'selected' : ''}>Lifetime</option>
        </select>
      </div>
      <div class="form-group">
        <label>Features</label>
        <div class="features-list-editor" id="modal-features-list">
          ${features.map((f, i) => `
            <div class="feature-item">
              <input type="text" class="feature-input" value="${this.escapeHtml(f)}" placeholder="Feature ${i+1}">
              <button class="remove-feature" onclick="this.parentElement.remove()">×</button>
            </div>
          `).join('')}
        </div>
        <button class="add-feature-btn" onclick="admin.addFeatureInput()">+ Add Feature</button>
      </div>
      <div class="form-group" style="display:flex;align-items:center;gap:12px;">
        <label style="margin-bottom:0;">Mark as Popular</label>
        <label class="toggle">
          <input type="checkbox" id="modal-plan-popular" ${plan?.isPopular ? 'checked' : ''}>
          <span class="toggle-slider"></span>
        </label>
      </div>
      <div class="form-actions">
        <button class="btn btn-secondary" onclick="admin.closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="admin.savePlan(${editIdx !== null ? editIdx : -1})">Save Plan</button>
      </div>
    `);
  }

  addFeatureInput() {
    const list = document.getElementById('modal-features-list');
    const div = document.createElement('div');
    div.className = 'feature-item';
    div.innerHTML = `<input type="text" class="feature-input" placeholder="New feature"><button class="remove-feature" onclick="this.parentElement.remove()">×</button>`;
    list.appendChild(div);
  }


  async savePlan(editIdx) {
    const name = document.getElementById('modal-plan-name').value.trim();
    const price = parseFloat(document.getElementById('modal-plan-price').value) || 0;
    const currency = document.getElementById('modal-plan-currency').value.trim() || '$';
    const period = document.getElementById('modal-plan-period').value;
    const isPopular = document.getElementById('modal-plan-popular').checked;
    const featureInputs = document.querySelectorAll('#modal-features-list .feature-input');
    const features = Array.from(featureInputs).map(i => i.value.trim()).filter(f => f);

    if (!name) {
      this.showToast('Plan name is required', 'error');
      return;
    }

    const planData = { name, price, currency, period, features, isPopular };

    if (editIdx >= 0) {
      this.plans[editIdx] = planData;
    } else {
      this.plans.push(planData);
    }

    await window.electronAPI.setStore('admin.pricing', this.plans);
    this.closeModal();
    this.renderPricing();
    this.showToast('Plan saved!', 'success');
  }

  async deletePlan(idx) {
    if (!confirm('Delete this plan?')) return;
    this.plans.splice(idx, 1);
    await window.electronAPI.setStore('admin.pricing', this.plans);
    this.renderPricing();
    this.showToast('Plan deleted', 'info');
  }

  async saveGateways() {
    this.gateways = {
      paypal: document.getElementById('gateway-paypal').value.trim(),
      stripe: document.getElementById('gateway-stripe').value.trim(),
      customName: document.getElementById('gateway-custom-name').value.trim(),
      customUrl: document.getElementById('gateway-custom-url').value.trim()
    };
    await window.electronAPI.setStore('admin.gateways', this.gateways);
    this.showToast('Gateway settings saved!', 'success');
  }

  // ============ PAGES ============
  renderPages() {
    document.getElementById('page-privacy').value = this.pages.privacy || '';
    document.getElementById('page-about').value = this.pages.about || '';
    document.getElementById('page-terms').value = this.pages.terms || '';
  }

  async savePages() {
    this.pages = {
      privacy: document.getElementById('page-privacy').value,
      about: document.getElementById('page-about').value,
      terms: document.getElementById('page-terms').value
    };
    await window.electronAPI.setStore('admin.pages', this.pages);
    this.showToast('Pages saved!', 'success');
  }


  // ============ SMTP ============
  renderSmtp() {
    document.getElementById('smtp-host').value = this.smtp.host || '';
    document.getElementById('smtp-port').value = this.smtp.port || 587;
    document.getElementById('smtp-username').value = this.smtp.username || '';
    document.getElementById('smtp-password').value = this.smtp.password || '';
    document.getElementById('smtp-from-email').value = this.smtp.fromEmail || '';
    document.getElementById('smtp-from-name').value = this.smtp.fromName || '';
    document.getElementById('smtp-tls').checked = this.smtp.tls !== false;
  }

  async saveSmtp() {
    this.smtp = {
      host: document.getElementById('smtp-host').value.trim(),
      port: parseInt(document.getElementById('smtp-port').value) || 587,
      username: document.getElementById('smtp-username').value.trim(),
      password: document.getElementById('smtp-password').value,
      fromEmail: document.getElementById('smtp-from-email').value.trim(),
      fromName: document.getElementById('smtp-from-name').value.trim(),
      tls: document.getElementById('smtp-tls').checked
    };
    await window.electronAPI.setStore('admin.smtp', this.smtp);
    this.showToast('SMTP settings saved!', 'success');
  }

  testSmtp() {
    if (!this.smtp.host) {
      this.showToast('Please configure SMTP settings first', 'error');
      return;
    }
    this.showToast('Test email sent successfully! (simulated)', 'success');
  }

  // ============ USERS ============
  renderUsers() {
    const tbody = document.getElementById('users-table-body');
    if (this.users.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:30px;">No users. Click "+ Add User" to add mock users.</td></tr>';
    } else {
      tbody.innerHTML = this.users.map((user, idx) => `
        <tr>
          <td><strong>${this.escapeHtml(user.name)}</strong></td>
          <td>${this.escapeHtml(user.email)}</td>
          <td>
            <select onchange="admin.changeUserPlan(${idx}, this.value)" style="padding:4px 8px;border:1px solid var(--border);border-radius:4px;background:var(--bg-input);color:var(--text-primary);font-size:11px;">
              <option value="Free" ${user.plan === 'Free' ? 'selected' : ''}>Free</option>
              <option value="Pro" ${user.plan === 'Pro' ? 'selected' : ''}>Pro</option>
              <option value="Enterprise" ${user.plan === 'Enterprise' ? 'selected' : ''}>Enterprise</option>
            </select>
          </td>
          <td>
            <span class="badge ${user.status === 'active' ? 'badge-active' : 'badge-inactive'}" style="cursor:pointer" onclick="admin.toggleUserStatus(${idx})">
              ${user.status === 'active' ? 'Active' : 'Inactive'}
            </span>
          </td>
          <td style="font-size:11px;color:var(--text-muted)">${user.joined || '—'}</td>
          <td>
            <button class="btn btn-sm btn-danger" onclick="admin.deleteUser(${idx})">Delete</button>
          </td>
        </tr>
      `).join('');
    }

    // Update stats
    const activeUsers = this.users.filter(u => u.status === 'active').length;
    const proUsers = this.users.filter(u => u.plan === 'Pro' || u.plan === 'Enterprise').length;
    const inactiveUsers = this.users.filter(u => u.status === 'inactive').length;
    document.getElementById('stat-active-users').textContent = activeUsers;
    document.getElementById('stat-pro-users').textContent = proUsers;
    document.getElementById('stat-inactive-users').textContent = inactiveUsers;
  }


  showUserModal() {
    this.openModal(`
      <h3>Add New User</h3>
      <div class="form-group">
        <label>Name</label>
        <input type="text" id="modal-user-name" placeholder="John Doe">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" id="modal-user-email" placeholder="john@example.com">
      </div>
      <div class="form-group">
        <label>Plan</label>
        <select id="modal-user-plan">
          <option value="Free">Free</option>
          <option value="Pro">Pro</option>
          <option value="Enterprise">Enterprise</option>
        </select>
      </div>
      <div class="form-group">
        <label>Status</label>
        <select id="modal-user-status">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div class="form-actions">
        <button class="btn btn-secondary" onclick="admin.closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="admin.saveUser()">Add User</button>
      </div>
    `);
  }

  async saveUser() {
    const name = document.getElementById('modal-user-name').value.trim();
    const email = document.getElementById('modal-user-email').value.trim();
    const plan = document.getElementById('modal-user-plan').value;
    const status = document.getElementById('modal-user-status').value;

    if (!name || !email) {
      this.showToast('Name and email are required', 'error');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    this.users.push({ name, email, plan, status, joined: today });
    await window.electronAPI.setStore('admin.users', this.users);
    this.closeModal();
    this.renderUsers();
    this.showToast('User added!', 'success');
  }

  async changeUserPlan(idx, plan) {
    this.users[idx].plan = plan;
    await window.electronAPI.setStore('admin.users', this.users);
    this.renderUsers();
    this.showToast(`User plan changed to ${plan}`, 'success');
  }

  async toggleUserStatus(idx) {
    this.users[idx].status = this.users[idx].status === 'active' ? 'inactive' : 'active';
    await window.electronAPI.setStore('admin.users', this.users);
    this.renderUsers();
  }

  async deleteUser(idx) {
    if (!confirm('Delete this user?')) return;
    this.users.splice(idx, 1);
    await window.electronAPI.setStore('admin.users', this.users);
    this.renderUsers();
    this.showToast('User deleted', 'info');
  }


  // ============ CHANGE PASSWORD ============
  showChangePasswordModal() {
    this.openModal(`
      <h3>Change Password</h3>
      <div class="form-group">
        <label>Current Password</label>
        <input type="password" id="modal-current-pw" placeholder="Enter current password">
      </div>
      <div class="form-group">
        <label>New Password</label>
        <input type="password" id="modal-new-pw" placeholder="Enter new password">
      </div>
      <div class="form-group">
        <label>Confirm New Password</label>
        <input type="password" id="modal-confirm-pw" placeholder="Confirm new password">
      </div>
      <div class="form-actions">
        <button class="btn btn-secondary" onclick="admin.closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="admin.changePassword()">Change Password</button>
      </div>
    `);
  }

  async changePassword() {
    const current = document.getElementById('modal-current-pw').value;
    const newPw = document.getElementById('modal-new-pw').value;
    const confirm = document.getElementById('modal-confirm-pw').value;

    const storedHash = await window.electronAPI.getStore('admin.password');
    if (this.hashPassword(current) !== storedHash) {
      this.showToast('Current password is incorrect', 'error');
      return;
    }

    if (newPw.length < 4) {
      this.showToast('New password must be at least 4 characters', 'error');
      return;
    }

    if (newPw !== confirm) {
      this.showToast('Passwords do not match', 'error');
      return;
    }

    await window.electronAPI.setStore('admin.password', this.hashPassword(newPw));
    this.closeModal();
    this.showToast('Password changed successfully!', 'success');
  }

  // ============ MODAL ============
  openModal(html) {
    document.getElementById('modal-box').innerHTML = html;
    document.getElementById('modal-overlay').classList.add('active');
  }

  closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
  }

  // ============ TOAST ============
  showToast(message, type = 'info') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  // ============ UTILS ============
  escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
}

// Initialize
const admin = new AdminPanel();
