import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";

/**
 * This event fires when Electron has completed
 * initialization and is ready to create browser windows.
 */
app.on("ready", () => {
  /**
   * Create the main application window.
   * @type {BrowserWindow}
   */
  const mainWindow = new BrowserWindow({
    /**
     * Enables fullscreen mode, allowing the window to occupy the entire screen space,
     * hiding the OS menu bar and dock (especially on macOS). Ideal for distraction-free apps.
     */
    fullscreen: true,

    /**
     * Configuration for the browser window's web page.
     */
    webPreferences: {
      /**
       * Allows Node.js integration inside the renderer process.
       * Use with caution — this grants full system access from the frontend.
       */
      nodeIntegration: true,

      /**
       * When false, disables Electron’s default isolation of context between
       * the preload script and the renderer. This allows shared global access
       * but weakens security — only acceptable in local/trusted apps.
       */
      contextIsolation: false,
    },
  });

  /**
   * Load the app based on environment:
   * - In development: loads from local dev server (e.g., Vite, Webpack).
   * - In production: loads the bundled static HTML file.
   */
  if (isDev) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "dist-react/index.html"));
  }
});
