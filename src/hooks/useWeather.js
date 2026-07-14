import { useState, useEffect } from "react";

// ============================================
// Хук для получения данных о погоде
// Использует геолокацию + OpenWeatherMap API
// Ключ API: пользователь должен вставить свой
// ============================================

const API_KEY = "d4a630ee061671daf29cf73bc2ab2255"; 

export default function useWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");

  const fetchByCoords = async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error("Ошибка получения погоды");
      const data = await res.json();
      setWeather({
        temp: Math.round(data.main.temp),
        weather: data.weather[0].main.toLowerCase(),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        city: data.name,
        humidity: data.main.humidity,
        wind: data.wind.speed,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchByCity = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=metric&lang=ru&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error("Город не найден");
      const data = await res.json();
      setWeather({
        temp: Math.round(data.main.temp),
        weather: data.weather[0].main.toLowerCase(),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        city: data.name,
        humidity: data.main.humidity,
        wind: data.wind.speed,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError("Геолокация не поддерживается");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchByCoords(pos.coords.latitude, pos.coords.longitude),
      () => setError("Разрешите доступ к геолокации или введите город")
    );
  };

  return { weather, loading, error, city, setCity, fetchByCity, detectLocation };
}
