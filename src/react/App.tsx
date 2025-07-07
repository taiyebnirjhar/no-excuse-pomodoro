import PomodoroTimer from "./components/view/pomodoro-timer/pomodoro-timer";
import { ThemeProvider } from "./contexts/theme-context";
import "./index.css";

function App() {
  return (
    <ThemeProvider>
      <PomodoroTimer />
    </ThemeProvider>
  );
}

export default App;
