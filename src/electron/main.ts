import { app, BrowserWindow, globalShortcut, ipcMain } from "electron";
import path from "path";
import url from "url";
import { isDev } from "./util.js";
import {
  closeStrictBreakWindow,
  createStrictBreakWindow,
} from "./windows/strict-break-window.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow: BrowserWindow | null = null;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "dist-react/index.html"));
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createMainWindow);

app.on("activate", () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  globalShortcut.unregisterAll();
});

// IPC listeners
ipcMain.on("start-strict-break", () => {
  if (mainWindow) {
    mainWindow.setFocusable(false);
  }
  createStrictBreakWindow();
});

ipcMain.on("end-strict-break", () => {
  if (mainWindow) {
    mainWindow.setFocusable(true);
    mainWindow.focus();
  }
  closeStrictBreakWindow();
});
