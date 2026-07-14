import { motion } from "framer-motion";
import useTimeOfDay from "../../hooks/useTimeOfDay";
import useStore from "../../store/useStore";
import styles from "./TimeOfDay.module.css";

// ============================================
// Блок времени суток
// Определяет время автоматически, предлагает фильтрацию
// ============================================

const TIMES = [
  { key: "morning", emoji: "🌅", label: "Утро", range: "6:00 – 11:00" },
  { key: "day", emoji: "☀️", label: "День", range: "11:00 – 17:00" },
  { key: "evening", emoji: "🌙", label: "Вечер", range: "17:00 – 23:00" },
  { key: "night", emoji: "🌃", label: "Ночь", range: "23:00 – 6:00" },
];

export default function TimeOfDayBlock() {
  const { timeOfDay: current } = useTimeOfDay();
  const setTimeDishes = useStore((s) => s.setTimeDishes);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Какое время суток?</h2>
      <p className={styles.autoDetect}>
        Сейчас: <strong>{TIMES.find((t) => t.key === current)?.emoji} {TIMES.find((t) => t.key === current)?.label}</strong>
      </p>

      <div className={styles.grid}>
        {TIMES.map((time) => (
          <motion.button
            key={time.key}
            className={`${styles.timeBtn} ${current === time.key ? styles.current : ""}`}
            onClick={() => setTimeDishes(time.key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={styles.emoji}>{time.emoji}</span>
            <span className={styles.label}>{time.label}</span>
            <span className={styles.range}>{time.range}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
