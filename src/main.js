const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadFile('./pages/index.html');
}

// Launch app
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit application when all windows closed (Windows/Linux)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});