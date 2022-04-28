const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const USER_SETTINGS_FP = "./resources/options.json";

// Creates the User's settings JSON file for later use if it does not exist already
if (!fs.existsSync(USER_SETTINGS_FP)) {
  try {
    fs.writeFile(USER_SETTINGS_FP, '{"categories": {}}', (err) => {
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

let userSettings = fs.readFile(USER_SETTINGS_FP, "utf-8", (err, data) => {
  if (err) {
    console.error(`${err.message}`);
    return;
  }
});

var win;
const createWindow = () => {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js")
    }
  });
  win.loadFile('./pages/index.html');
}

ipcMain.on("switch-to-main", () => {
  return userSettings;
})

// Launch app
app.whenReady().then(() => {
  createWindow();
  win.maximize();
  // win.setMenu(null);

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