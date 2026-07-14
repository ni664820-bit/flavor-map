import { useState, useEffect } from "react";

// ============================================
// Хук для определения времени суток
// Возвращает: morning, day, evening, night
// ============================================

const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 11) return "morning";
  if (hour >= 11 && hour < 17) return "day";
  if (hour >= 17 && hour < 23) return "evening";
  return "night";
};

const TIME_LABELS = {
  morning: { label: "Утро", emoji: "🌅", range: "6:00 – 11:00" },
  day: { label: "День", emoji: "☀️", range: "11:00 – 17:00" },
  evening: { label: "Вечер", emoji: "🌙", range: "17:00 – 23:00" },
  night: { label: "Ночь", emoji: "🌃", range: "23:00 – 6:00" },
};

export default function useTimeOfDay() {
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 60000); // Обновляем каждую минуту
    return () => clearInterval(interval);
  }, []);

  return { timeOfDay, ...TIME_LABELS[timeOfDay] };
}
