import { create } from "zustand";
import dishes from "../data/dishes";

// ============================================
// Zustand-стор для управления состоянием приложения
// Хранит: выбранное настроение, погоду, цвет, историю выбора
// ============================================

const loadHistory = () => {
  try {
    const saved = localStorage.getItem("flavor-map-history");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveHistory = (history) => {
  try {
    localStorage.setItem("flavor-map-history", JSON.stringify(history));
  } catch {}
};

const useStore = create((set, get) => ({
  // --- Состояние фильтров ---
  selectedMood: null,
  selectedColor: null,
  weatherData: null,
  activeTab: "mood", // "mood" | "weather" | "time"
  isDarkTheme: false,

  // --- Результаты ---
  filteredDishes: [],
  currentDish: null,

  // --- История ---
  history: loadHistory(),

  // --- Действия ---
  setActiveTab: (tab) => set({ activeTab: tab }),

  setSelectedMood: (mood) => {
    set({ selectedMood: mood, selectedColor: null });
    const filtered = dishes.filter((d) => d.moods.includes(mood));
    set({ filteredDishes: filtered });
  },

  setSelectedColor: (color) => {
    const currentMood = get().selectedMood;
    set({ selectedColor: color });
    let filtered = dishes;
    if (currentMood) {
      filtered = filtered.filter((d) => d.moods.includes(currentMood));
    }
    filtered = filtered.filter((d) => d.color === color);
    set({ filteredDishes: filtered });
  },

  setWeatherData: (data) => {
    set({ weatherData: data });
    if (!data) return;
    const temp = data.temp;
    const weatherMain = data.weather;

    let filtered = dishes.filter((d) => {
      if (weatherMain === "rain" || weatherMain === "snow") {
        return d.weather.includes("rain");
      }
      if (temp > 28) {
        return d.weather.includes("hot");
      }
      if (weatherMain === "clouds") {
        return d.weather.includes("clouds");
      }
      return d.weather.includes("clear");
    });

    const currentColor = get().selectedColor;
    if (currentColor) {
      filtered = filtered.filter((d) => d.color === currentColor);
    }

    set({ filteredDishes: filtered });
  },

  setTimeDishes: (timeKey) => {
    let filtered = dishes.filter((d) => d.timeOfDay.includes(timeKey));
    const currentColor = get().selectedColor;
    if (currentColor) {
      filtered = filtered.filter((d) => d.color === currentColor);
    }
    set({ filteredDishes: filtered });
  },

  setCurrentDish: (dish) => {
    if (!dish) {
      set({ currentDish: null });
      return;
    }
    set({ currentDish: dish });
    const history = get().history;
    const newHistory = [dish, ...history.filter((d) => d.id !== dish.id)].slice(0, 10);
    set({ history: newHistory });
    saveHistory(newHistory);
  },

  getRandomDish: () => {
    const pool = get().filteredDishes.length > 0 ? get().filteredDishes : dishes;
    const random = pool[Math.floor(Math.random() * pool.length)];
    get().setCurrentDish(random);
  },

  toggleTheme: () => set((s) => ({ isDarkTheme: !s.isDarkTheme })),
}));

export default useStore;
