import { app, BrowserWindow, globalShortcut, screen } from "electron";
import path from "path";
import { isDev } from "../util.js";

let strictBreakWindows: BrowserWindow[] = [];

// Create a window for each display
export function createStrictBreakWindow() {
  if (strictBreakWindows.length > 0) return;

  const displays = screen.getAllDisplays();

  for (const display of displays) {
    const { x, y, width, height } = display.bounds;

    const strictBreakWindow = new BrowserWindow({
      x,
      y,
      width,
      height,
      frame: false,
      kiosk: process.platform !== "darwin",
      fullscreen: process.platform === "darwin",
      alwaysOnTop: true,
      skipTaskbar: true,
      movable: false,
      resizable: false,
      enableLargerThanScreen: true,
      webPreferences: {},
      transparent: true,
      backgroundColor: "#00000000",
    });

    strictBreakWindow.setIgnoreMouseEvents(true);

    if (isDev) {
      strictBreakWindow.loadURL("http://localhost:5123");
    } else {
      strictBreakWindow.loadFile(
        path.join(app.getAppPath(), "dist-react/index.html"),
        { hash: "strict-break" }
      );
    }

    strictBreakWindow.webContents.on("did-finish-load", () => {
      strictBreakWindow.setIgnoreMouseEvents(false);
      strictBreakWindow.focus(); // Explicitly focus the window
    });

    strictBreakWindows.push(strictBreakWindow);
  }

  // Register shortcuts only once
  try {
    globalShortcut.registerAll(
      [
        "CommandOrControl+W",
        "CommandOrControl+Q",
        "Alt+F4",
        "CommandOrControl+R",
        "F5",
      ],
      () => {
        console.log("Blocked a global shortcut attempt.");
      }
    );
  } catch (e) {
    console.error("Failed to register global shortcuts", e);
  }
}

export function closeStrictBreakWindow() {
  globalShortcut.unregisterAll();
  for (const win of strictBreakWindows) {
    win.close();
  }
  strictBreakWindows = [];
}
