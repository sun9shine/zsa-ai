# ZSA AI — Chat to Code

Professional desktop application that generates code from natural language using AI, with a live preview panel.

![Platform](https://img.shields.io/badge/platform-Windows%207%2B-blue)
![Electron](https://img.shields.io/badge/electron-28.x-brightgreen)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Chat Interface** — Describe what you want to build in natural language
- **Live Preview** — See your generated code rendered in real-time
- **Code Editor** — View syntax-highlighted code with line numbers
- **Split View** — See code and preview side-by-side
- **Multiple AI Providers** — OpenAI, Anthropic, Ollama (local), and custom endpoints
- **Desktop/Mobile Preview** — Toggle between device views
- **Copy & Download** — Export your code instantly
- **Windows 7+ Support** — Works on 32-bit and 64-bit Windows systems

## Supported AI Models

| Provider | Models | Type |
|----------|--------|------|
| **OpenAI** | GPT-4o, GPT-4, GPT-3.5 | Online API |
| **Anthropic** | Claude Sonnet, Haiku, Opus | Online API |
| **Ollama** | Llama, CodeLlama, Mistral, DeepSeek | Local |
| **Custom** | Any OpenAI-compatible endpoint | Local/Online |

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

## Usage

1. Launch the application
2. Click the ⚙️ settings icon to configure an AI model
3. Choose your provider (OpenAI, Anthropic, Ollama, or Custom)
4. Enter your API key (for online models) or base URL (for local models)
5. Start chatting! Describe what you want to build
6. See the live preview update in real-time
7. Switch between Preview, Code, and Split views
8. Copy or download the generated code

## Architecture

```
zsa-ai/
├── main.js           # Electron main process
├── preload.js        # Secure bridge between main/renderer
├── renderer/
│   ├── index.html    # Main UI
│   ├── styles.css    # Professional dark theme
│   └── app.js        # Application logic
├── assets/           # App icons
└── package.json      # Config & build settings
```

## System Requirements

- **OS:** Windows 7 SP1 (32-bit) or later
- **RAM:** 512MB minimum
- **Disk:** 200MB for installation
- **Network:** Required for online AI models only

## License

MIT
