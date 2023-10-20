import React, { useEffect } from "react";
import "./App.css";
import WeatherApp from "./components/Weather/WeatherApp/WeatherApp"

function App() {

  const [isReadyForInstall, setIsReadyForInstall] = React.useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      window.deferredPrompt = event;
      setIsReadyForInstall(true);
    });
  }, []);

  async function downloadApp() {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      return;
    }
    promptEvent.prompt();
    const result = await promptEvent.userChoice;
    window.deferredPrompt = null;
    setIsReadyForInstall(false);
  }

  return <WeatherApp isReadyForInstall = { isReadyForInstall } downloadApp = { downloadApp } />;
}

export default App;
