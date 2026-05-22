# ZSA AI — Chat to Code

Professional desktop application that generates code from natural language using AI, with a live preview panel. Supports **any AI model** — online APIs, local models, and multi-model providers.

![Platform](https://img.shields.io/badge/platform-Windows%207%2B-blue)
![Electron](https://img.shields.io/badge/electron-28.x-brightgreen)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Chat Interface** — Describe what you want to build in natural language
- **Live Preview** — See your generated code rendered in real-time
- **Editable Code Editor** — Edit code directly with live preview updates
- **Split View** — See code and preview side-by-side
- **Admin Dashboard** — Full platform management panel (models, pricing, users, pages, SMTP)
- **Any AI Model** — OpenAI, Anthropic, Ollama, OpenRouter, DeepSeek, Groq, Together, Mistral, LM Studio, and any OpenAI-compatible endpoint
- **File Attachments** — Upload images, code files, or entire project folders
- **Image-to-Code (Vision)** — Attach mockups and AI converts them to code
- **Game Development** — Build 2D/3D browser games with Canvas/WebGL
- **Multi-Project Tabs** — Work on multiple projects simultaneously
- **Chat History** — Save and restore past conversations
- **Templates Library** — Pre-built starters for common project types
- **Design Tools** — Color picker, font selector, dark/light theme
- **Plugin System** — One-click CDN injection (Tailwind, Three.js, GSAP, Chart.js, Phaser)
- **Deploy** — Export deploy-ready ZIP with Netlify/Vercel configs
- **Undo/Redo** — Track code changes with version history
- **Download as ZIP** — Export projects as organized file structure
- **i18n** — Arabic/English interface
- **Windows 7+ Support** — Works on 32-bit and 64-bit systems

---

## Supported AI Providers

ZSA AI works with **any AI provider**. Here's how to configure each:

### Online API Providers

| Provider | Base URL | API Key Required | Models |
|----------|----------|-----------------|--------|
| **OpenAI** | `https://api.openai.com/v1` | Yes | gpt-4o, gpt-4o-mini, gpt-4-turbo |
| **OpenRouter** | `https://openrouter.ai/api/v1` | Yes | Any model (google/gemini-pro, meta-llama/llama-3.1-70b, etc.) |
| **DeepSeek** | `https://api.deepseek.com/v1` | Yes | deepseek-chat, deepseek-coder |
| **Groq** | `https://api.groq.com/openai/v1` | Yes | llama-3.1-70b-versatile, mixtral-8x7b-32768 |
| **Together AI** | `https://api.together.xyz/v1` | Yes | meta-llama/Llama-3.1-70B-Instruct, etc. |
| **Mistral** | `https://api.mistral.ai/v1` | Yes | mistral-large-latest, codestral-latest |
| **Anthropic** | `https://api.anthropic.com/v1` | Yes | claude-sonnet-4-20250514, claude-3-5-haiku |
| **Cohere** | `https://api.cohere.ai/v1` | Yes | command-r-plus |
| **Fireworks** | `https://api.fireworks.ai/inference/v1` | Yes | accounts/fireworks/models/llama-v3p1-70b |

### Local AI Models

| Provider | Base URL | Setup |
|----------|----------|-------|
| **Ollama** | `http://localhost:11434` | Install Ollama + pull model |
| **LM Studio** | `http://localhost:1234/v1` | Download model in LM Studio |
| **LocalAI** | `http://localhost:8080/v1` | Run LocalAI container |
| **text-generation-webui** | `http://localhost:5000/v1` | Start with --api flag |
| **vLLM** | `http://localhost:8000/v1` | Start vLLM server |
| **Jan** | `http://localhost:1337/v1` | Enable API server in Jan |

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) 18+ (for development)
- [Git](https://git-scm.com/)

### Development Setup

```bash
# Clone the repository
git clone https://github.com/sun9shine/zsa-ai.git
cd zsa-ai

# Install dependencies
npm install

# Run the application
npm start
```

### Build Installer

```bash
# Build for Windows 32-bit
npm run build:win32

# Build for Windows 64-bit
npm run build:win64

# Build for both architectures
npm run build:win
```

The installer will be created in the `dist/` folder.

---

## Setting Up Local Models

### Option 1: Ollama (Recommended - Easiest)

1. **Install Ollama:** Download from [ollama.com](https://ollama.com/download)

2. **Pull a model:**
```bash
# For code generation (recommended)
ollama pull deepseek-coder-v2
# or
ollama pull codellama
# or
ollama pull llama3.1
```

3. **Configure in ZSA AI:**
   - Open Settings → Add Model
   - Type: **Local**
   - Provider: **Ollama**
   - Model Name: `deepseek-coder-v2` (or whichever you pulled)
   - Base URL: `http://localhost:11434` (default, can leave empty)

### Option 2: LM Studio (GUI-based)

1. **Download** [LM Studio](https://lmstudio.ai/)
2. **Download a model** (search for: `DeepSeek Coder`, `CodeLlama`, `Mistral`)
3. **Start the local server** (click "Local Server" tab → Start)
4. **Configure in ZSA AI:**
   - Type: **Local**
   - Provider: **OpenAI Compatible**
   - Model Name: (whatever appears in LM Studio)
   - Base URL: `http://localhost:1234/v1`

### Option 3: Jan App

1. **Download** [Jan](https://jan.ai/)
2. **Download a model** from the model hub
3. **Enable API** in Settings → Advanced → Enable API Server
4. **Configure in ZSA AI:**
   - Base URL: `http://localhost:1337/v1`
   - Model Name: (as shown in Jan)

---

## Setting Up Multi-Model Providers

### OpenRouter (Access 100+ models with one API key)

1. Get API key from [openrouter.ai/keys](https://openrouter.ai/keys)
2. **Configure in ZSA AI:**
   - Type: **Online**
   - Provider: **OpenAI Compatible**
   - Display Name: `OpenRouter - GPT-4o`
   - Model Name: `openai/gpt-4o` (or any from [openrouter.ai/models](https://openrouter.ai/models))
   - Base URL: `https://openrouter.ai/api/v1`
   - API Key: `sk-or-...`

**Popular OpenRouter Models:**
- `openai/gpt-4o` — Best overall
- `anthropic/claude-sonnet-4-20250514` — Best for code
- `google/gemini-2.0-flash-001` — Fast & free
- `meta-llama/llama-3.1-405b-instruct` — Open source large
- `deepseek/deepseek-chat` — Great for code, cheap

### Groq (Ultra-fast inference)

1. Get API key from [console.groq.com](https://console.groq.com/keys)
2. **Configure:**
   - Base URL: `https://api.groq.com/openai/v1`
   - Model: `llama-3.1-70b-versatile`

### Together AI

1. Get API key from [api.together.xyz](https://api.together.xyz/settings/api-keys)
2. **Configure:**
   - Base URL: `https://api.together.xyz/v1`
   - Model: `meta-llama/Llama-3.1-70B-Instruct-Turbo`

---

## Usage

1. **Launch** the application (`npm start`)
2. **Add a model** — Click model name in header → Manage Models → Add
3. **Choose your provider** — Fill in Base URL, Model Name, and API Key
4. **Start chatting!** — Describe what you want to build
5. **See live preview** — Code renders instantly on the right
6. **Edit code** — Switch to Code view and edit directly
7. **Attach files** — Use 📎 to upload images/code/projects
8. **Switch models** — Click model name dropdown to switch between configured models
9. **Export** — Download as HTML, ZIP, or deploy-ready package

---

## Admin Dashboard

The app includes a full admin panel for platform management. Access it via the **Admin** button in the titlebar.

### Default Admin Credentials

| Field    | Value      |
|----------|------------|
| Username | `admin`    |
| Password | `admin123` |

### Admin Features

- **Platform Settings** — Change app name, description, accent color, default language
- **Models Management** — Add/edit/delete AI models, set default
- **Pricing Plans** — Create subscription plans with features, set payment gateways (PayPal, Stripe, custom)
- **Pages Editor** — Edit Privacy Policy, About Us, Terms of Service
- **SMTP Settings** — Configure email sending (host, port, TLS)
- **Users Management** — Add mock users, change plans, toggle active/inactive status
- **Password Management** — Change admin password from the dashboard

---

## Architecture

```
zsa-ai/
├── main.js           # Electron main process (native fetch, file dialogs, admin IPC)
├── preload.js        # Secure IPC bridge (includes openAdmin)
├── renderer/
│   ├── index.html    # Main UI (modals, panels, buttons)
│   ├── styles.css    # Professional dark/light theme
│   ├── app.js        # Application logic (1400+ lines)
│   ├── admin.html    # Admin Dashboard UI
│   ├── admin.css     # Admin Dashboard styles
│   └── admin.js      # Admin Dashboard logic
├── assets/           # App icons
├── package.json      # Config & build settings
└── README.md         # This file
```

## System Requirements

- **OS:** Windows 7 SP1 (32-bit) or later
- **RAM:** 512MB minimum (4GB+ recommended for local models)
- **Disk:** 200MB for installation (+ model sizes for local AI)
- **Network:** Required for online AI models only
- **GPU:** Optional, speeds up local model inference

## License

MIT
