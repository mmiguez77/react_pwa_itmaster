import { useState, useEffect } from "react";
import Loading from "../Loading/Loading"
import WeatherForm from "../WeaterForm/WeatherForm";
import WeatherMainInfo from "../WeatherMainInfo/WeatherMainInfo";

import styles from "./weatherApp.module.css";

export default function WeatherApp({ isReadyForInstall, downloadApp }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    loadInfo();
  }, []);

  useEffect(() => {
    document.title = "Weather | " + weather?.location?.name ?? "";
  }, [weather]);

  async function loadInfo(city = "london") {
    try {
      const request = await fetch(
        `${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`
      );
      const json = await request.json();

      setTimeout(() => {
        setWeather({ ...json });
      }, 2000);
    } catch (e) {
      console.error(e);
    }
  }

  function handleOnChangeCity(city) {
    setWeather(null);
    loadInfo(city);
  }

  return (
    <div className={styles.weatherContainer}>
      <div className={styles.weatherLogoContainer}>
        <img 
          src="./logo512.png" 
          alt="logo weather" 
          className={styles.weatherLogo}
          />
      </div>
        <h2 className={styles.weatherTitle}>Weather App</h2>
        {isReadyForInstall && (
          <button onClick={downloadApp}> Download App</button>
        )}
      <WeatherForm onChangeCity={handleOnChangeCity} />
      {weather ? <WeatherMainInfo weather={weather} /> : <Loading />}
    </div>
  );
}
