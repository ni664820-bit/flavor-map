import { motion } from "framer-motion";
import useStore from "../../store/useStore";
import styles from "./MoodSelector.module.css";

// ============================================
// Блок выбора настроения
// 6 эмодзи-кнопок с анимацией при клике
// ============================================

const MOODS = [
  { key: "happy", emoji: "😊", label: "Счастливый" },
  { key: "relaxed", emoji: "😌", label: "Расслабленный" },
  { key: "excited", emoji: "🔥", label: "Взволнованный" },
  { key: "sad", emoji: "😔", label: "Грустный" },
  { key: "inspired", emoji: "🤩", label: "Вдохновлённый" },
  { key: "tired", emoji: "🥱", label: "Уставший" },
];

export default function MoodSelector() {
  const selectedMood = useStore((s) => s.selectedMood);
  const setSelectedMood = useStore((s) => s.setSelectedMood);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Как ваше настроение?</h2>
      <div className={styles.grid}>
        {MOODS.map((mood) => (
          <motion.button
            key={mood.key}
            className={`${styles.moodBtn} ${selectedMood === mood.key ? styles.active : ""}`}
            onClick={() => setSelectedMood(mood.key)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className={styles.emoji}>{mood.emoji}</span>
            <span className={styles.label}>{mood.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
