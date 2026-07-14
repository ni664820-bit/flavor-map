import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useWeather from "../../hooks/useWeather";
import useStore from "../../store/useStore";
import styles from "./WeatherBlock.module.css";

// ============================================
// Блок погоды — определение геолокации / ввод города
// Автоматически фильтрует блюда по погоде
// ============================================

const WEATHER_ICONS = {
  clear: "☀️",
  clouds: "☁️",
  rain: "🌧️",
  snow: "❄️",
  thunderstorm: "⛈️",
  drizzle: "🌦️",
  mist: "🌫️",
};

export default function WeatherBlock() {
  const { weather, loading, error, city, setCity, fetchByCity, detectLocation } = useWeather();
  const setWeatherData = useStore((s) => s.setWeatherData);
  const [inputValue, setInputValue] = useState("");

  const handleDetect = () => {
    detectLocation();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      fetchByCity(inputValue.trim());
    }
  };

  // Когда погода загружена — передаём в store
  if (weather && !useStore.getState().weatherData) {
    setWeatherData(weather);
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Какая погода за окном?</h2>

      <div className={styles.actions}>
        <button
          className={styles.detectBtn}
          onClick={handleDetect}
          disabled={loading}
        >
          📍 Определить автоматически
        </button>

        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input
            type="text"
            className={styles.input}
            placeholder="Введите город..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className={styles.searchBtn} disabled={loading}>
            🔍
          </button>
        </form>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <AnimatePresence>
        {weather && (
          <motion.div
            className={styles.weatherCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.weatherIcon}>
              {WEATHER_ICONS[weather.weather] || "🌤️"}
            </div>
            <div className={styles.weatherInfo}>
              <div className={styles.temp}>{weather.temp}°C</div>
              <div className={styles.city}>{weather.city}</div>
              <div className={styles.desc}>{weather.description}</div>
              <div className={styles.details}>
                💧 {weather.humidity}% &nbsp; 💨 {weather.wind} м/с
              </div>
            </div>

            {/* Анимация осадков */}
            {(weather.weather === "rain" || weather.weather === "snow") && (
              <div className={styles.precipitation}>
                {Array.from({ length: weather.weather === "rain" ? 20 : 15 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className={weather.weather === "rain" ? styles.raindrop : styles.snowflake}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 100, opacity: [0, 1, 0] }}
                    transition={{
                      duration: weather.weather === "rain" ? 0.8 : 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "linear",
                    }}
                    style={{ left: `${Math.random() * 100}%` }}
                  >
                    {weather.weather === "rain" ? "💧" : "❄️"}
                  </motion.span>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {loading && <p className={styles.loading}>Загружаем данные о погоде...</p>}
    </div>
  );
}
