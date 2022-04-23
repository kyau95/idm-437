const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron");
const path = require("path");
const fs = require("fs");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadFile('./pages/index.html');
}

// Creates the User's settings JSON file for later use if it does not exist already
if (!fs.existsSync("./resources/options.json")) {
  try {
    fs.writeFile("./resources/options.json", '{"categories": {}}', (err) => {
      if (err) {
        console.log("An error ocurred while creating User settings file: " + err.message);
      }
      console.log("User file settings have been created");
    });
  }
  catch (e) {
    console.log("Failed to save user settings file. Restart the application.");
  }
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