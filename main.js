const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const Store = require('electron-store');

// Support Windows 7
app.disableHardwareAcceleration();

const store = new Store({
  defaults: {
    models: [],
    activeModelId: null,
    windowBounds: { width: 1400, height: 900 },
    chatHistory: [],
    language: 'ar',
    'admin.password': null,
    'admin.session': { loggedIn: false },
    'admin.platform': {
      name: 'ZSA AI',
      description: 'Chat to Code - Professional AI Code Generator',
      color: '#6366f1',
      language: 'ar'
    },
    'admin.pricing': [],
    'admin.pages': { privacy: '', about: '', terms: '' },
    'admin.smtp': { host: '', port: 587, username: '', password: '', fromEmail: '', fromName: '', tls: true },
    'admin.users': [],
    'admin.gateways': { paypal: '', stripe: '', customName: '', customUrl: '' }
  }
});

let mainWindow;

function createWindow() {
  const { width, height } = store.get('windowBounds');

  mainWindow = new BrowserWindow({
    width,
    height,
    minWidth: 900,
    minHeight: 600,
    frame: false,
    titleBarStyle: 'hidden',
    backgroundColor: '#0f0f1a',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true
    },
    icon: path.join(__dirname, 'assets', 'icon.png'),
    show: false
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('resize', () => {
    const { width, height } = mainWindow.getBounds();
    store.set('windowBounds', { width, height });
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// ============ WINDOW IPC ============

ipcMain.handle('window:minimize', () => {
  mainWindow?.minimize();
});

ipcMain.handle('window:maximize', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});

ipcMain.handle('window:close', () => {
  mainWindow?.close();
});

ipcMain.handle('window:isMaximized', () => {
  return mainWindow?.isMaximized();
});

// ============ STORE IPC ============

ipcMain.handle('store:get', (event, key) => {
  return store.get(key);
});

ipcMain.handle('store:set', (event, key, value) => {
  store.set(key, value);
});

ipcMain.handle('store:delete', (event, key) => {
  store.delete(key);
});

// ============ AI API CALL ============

ipcMain.handle('ai:call', async (event, { url, method, headers, body }) => {
  try {
    // Use native fetch (available in Electron 28+/Node 18+)
    const response = await fetch(url, {
      method: method || 'POST',
      headers: headers || {},
      body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { error: true, message: errorText, status: response.status };
    }

    const data = await response.json();
    return { error: false, data };
  } catch (err) {
    return { error: true, message: err.message };
  }
});

// ============ FILE DIALOG IPC ============

ipcMain.handle('dialog:openFile', async (event, options) => {
  const filters = options?.filters || [
    { name: 'All Files', extensions: ['*'] },
    { name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'ico'] },
    { name: 'Videos', extensions: ['mp4', 'webm', 'avi', 'mov'] },
    { name: 'Code', extensions: ['html', 'css', 'js', 'ts', 'jsx', 'tsx', 'json', 'py', 'java', 'php', 'rb'] },
    { name: 'Archives', extensions: ['zip', 'rar', '7z', 'tar', 'gz'] }
  ];

  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
    filters
  });

  if (result.canceled) return { canceled: true, files: [] };

  const files = result.filePaths.map(filePath => {
    const stats = fs.statSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    return {
      path: filePath,
      name: path.basename(filePath),
      ext,
      size: stats.size,
      isImage: ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico'].includes(ext),
      isVideo: ['.mp4', '.webm', '.avi', '.mov'].includes(ext),
      isCode: ['.html', '.css', '.js', '.ts', '.jsx', '.tsx', '.json', '.py', '.java', '.php', '.rb', '.vue', '.svelte'].includes(ext),
      isArchive: ['.zip', '.rar', '.7z', '.tar', '.gz'].includes(ext)
    };
  });

  return { canceled: false, files };
});

// ============ FOLDER DIALOG IPC ============

ipcMain.handle('dialog:openFolder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });

  if (result.canceled) return { canceled: true, path: null };
  return { canceled: false, path: result.filePaths[0] };
});

// ============ FILE READ IPC ============

ipcMain.handle('file:readBase64', async (event, filePath) => {
  try {
    const data = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    let mimeType = 'application/octet-stream';

    const mimeMap = {
      '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
      '.gif': 'image/gif', '.svg': 'image/svg+xml', '.webp': 'image/webp',
      '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.webm': 'video/webm',
      '.avi': 'video/x-msvideo', '.mov': 'video/quicktime'
    };

    if (mimeMap[ext]) mimeType = mimeMap[ext];

    return { error: false, data: data.toString('base64'), mimeType, name: path.basename(filePath) };
  } catch (err) {
    return { error: true, message: err.message };
  }
});

ipcMain.handle('file:readText', async (event, filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return { error: false, content, name: path.basename(filePath) };
  } catch (err) {
    return { error: true, message: err.message };
  }
});

ipcMain.handle('file:getInfo', async (event, filePath) => {
  try {
    const stats = fs.statSync(filePath);
    return {
      error: false,
      name: path.basename(filePath),
      ext: path.extname(filePath),
      size: stats.size,
      modified: stats.mtime
    };
  } catch (err) {
    return { error: true, message: err.message };
  }
});

// ============ FOLDER STRUCTURE IPC ============

ipcMain.handle('folder:readStructure', async (event, folderPath) => {
  try {
    const structure = readDirRecursive(folderPath, 0, 3); // max depth 3
    return { error: false, structure, rootPath: folderPath, rootName: path.basename(folderPath) };
  } catch (err) {
    return { error: true, message: err.message };
  }
});

function readDirRecursive(dirPath, currentDepth, maxDepth) {
  if (currentDepth >= maxDepth) return [];

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const result = [];

  // Skip common non-essential directories
  const skipDirs = ['node_modules', '.git', '.next', 'dist', 'build', '__pycache__', '.venv', 'vendor'];

  for (const entry of entries) {
    if (entry.name.startsWith('.') && entry.name !== '.env') continue;
    if (skipDirs.includes(entry.name)) continue;

    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      result.push({
        name: entry.name,
        type: 'folder',
        path: fullPath,
        children: readDirRecursive(fullPath, currentDepth + 1, maxDepth)
      });
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      const stats = fs.statSync(fullPath);
      result.push({
        name: entry.name,
        type: 'file',
        path: fullPath,
        ext,
        size: stats.size
      });
    }
  }

  return result;
}



// ============ ADMIN IPC ============

ipcMain.handle('admin:open', () => {
  if (mainWindow) {
    mainWindow.loadFile(path.join(__dirname, 'renderer', 'admin.html'));
  }
});

ipcMain.handle('admin:backToApp', () => {
  if (mainWindow) {
    mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
  }
});
