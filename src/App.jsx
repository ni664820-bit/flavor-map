import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "./store/useStore";
import Hero from "./components/Hero/Hero";
import MoodSelector from "./components/MoodSelector/MoodSelector";
import WeatherBlock from "./components/WeatherBlock/WeatherBlock";
import TimeOfDayBlock from "./components/TimeOfDay/TimeOfDay";
import ColorFilter from "./components/ColorFilter/ColorFilter";
import DishCard from "./components/DishCard/DishCard";
import History from "./components/History/History";
import styles from "./App.module.css";

// ============================================
// Главный компонент приложения Flavor Map
// Управляет вкладками и сборкой всех блоков
// ============================================

const TABS = [
  { key: "mood", label: "По настроению", emoji: "😊" },
  { key: "weather", label: "По погоде", emoji: "🌦️" },
  { key: "time", label: "По времени", emoji: "⏰" },
];

export default function App() {
  const activeTab = useStore((s) => s.activeTab);
  const setActiveTab = useStore((s) => s.setActiveTab);
  const getRandomDish = useStore((s) => s.getRandomDish);
  const isDarkTheme = useStore((s) => s.isDarkTheme);
  const toggleTheme = useStore((s) => s.toggleTheme);

  return (
    <div className={`${styles.app} ${isDarkTheme ? styles.dark : ""}`}>
      {/* Hero */}
      <Hero />

      {/* Переключатель темы */}
      <button className={styles.themeToggle} onClick={toggleTheme}>
        {isDarkTheme ? "☀️ Светлая" : "🌙 Тёмная"}
      </button>

      {/* Вкладки */}
      <nav className={styles.tabs}>
        {TABS.map((tab) => (
          <motion.button
            key={tab.key}
            className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ""}`}
            onClick={() => setActiveTab(tab.key)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className={styles.tabEmoji}>{tab.emoji}</span>
            <span className={styles.tabLabel}>{tab.label}</span>
          </motion.button>
        ))}
      </nav>

      {/* Контент вкладок */}
      <main className={styles.main}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "mood" && <MoodSelector />}
            {activeTab === "weather" && <WeatherBlock />}
            {activeTab === "time" && <TimeOfDayBlock />}
          </motion.div>
        </AnimatePresence>

        {/* Фильтр по цвету */}
        <ColorFilter />

        {/* Кнопка «Мне повезёт» */}
        <div className={styles.luckyWrap}>
          <motion.button
            className={styles.luckyBtn}
            onClick={getRandomDish}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95, rotate: -2 }}
          >
            🎲 Мне повезёт!
          </motion.button>
        </div>

        {/* Карточки блюд */}
        <DishCard />

        {/* История */}
        <History />
      </main>

      {/* Футер */}
      <footer className={styles.footer}>
        <p>Flavor Map — гид для гурманов © 2026</p>
      </footer>
    </div>
  );
}
