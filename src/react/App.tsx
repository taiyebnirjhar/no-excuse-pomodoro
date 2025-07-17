import { useEffect } from "react";
import PomodoroTimer from "./components/others/pomodoro-timer/pomodoro-timer";
import { ThemeProvider } from "./contexts/theme-context";
import "./index.css";

function App() {
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);
  return (
    <ThemeProvider>
      <PomodoroTimer />
    </ThemeProvider>
  );
}

export default App;
