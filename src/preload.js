const { contextBridge, ipcRenderer } = require("electron");

let userData = {
  switchToMain: (data) => ipcRenderer.on("switch-to-main", (data))
}

contextBridge.exposeInMainWorld("electronAPI", userData);