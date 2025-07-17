// This tells TypeScript that the 'window' object has a property called 'electronAPI'
// with the methods we defined in our preload script.

export interface IElectronAPI {
  startStrictBreak: () => void;
  endStrictBreak: () => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
