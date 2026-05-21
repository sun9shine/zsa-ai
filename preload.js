const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Window controls
  minimize: () => ipcRenderer.invoke('window:minimize'),
  maximize: () => ipcRenderer.invoke('window:maximize'),
  close: () => ipcRenderer.invoke('window:close'),
  isMaximized: () => ipcRenderer.invoke('window:isMaximized'),

  // Store
  getStore: (key) => ipcRenderer.invoke('store:get', key),
  setStore: (key, value) => ipcRenderer.invoke('store:set', key, value),

  // AI calls
  callAI: (config) => ipcRenderer.invoke('ai:call', config),

  // File operations
  openFileDialog: (options) => ipcRenderer.invoke('dialog:openFile', options),
  readFileAsBase64: (filePath) => ipcRenderer.invoke('file:readBase64', filePath),
  readFileAsText: (filePath) => ipcRenderer.invoke('file:readText', filePath),
  getFileInfo: (filePath) => ipcRenderer.invoke('file:getInfo', filePath),
  openFolderDialog: () => ipcRenderer.invoke('dialog:openFolder'),
  readFolderStructure: (folderPath) => ipcRenderer.invoke('folder:readStructure', folderPath)
});
