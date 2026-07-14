import { motion } from "framer-motion";
import useStore from "../../store/useStore";
import { COLOR_MAP } from "../../data/dishes";
import styles from "./ColorFilter.module.css";

// ============================================
// Горизонтальный фильтр по цвету еды
// При выборе — плавное изменение фона страницы
// ============================================

export default function ColorFilter() {
  const selectedColor = useStore((s) => s.selectedColor);
  const setSelectedColor = useStore((s) => s.setSelectedColor);

  const handleColorClick = (colorKey) => {
    setSelectedColor(selectedColor === colorKey ? null : colorKey);
  };

  const activeBg = selectedColor ? COLOR_MAP[selectedColor]?.hex : null;

  return (
    <div
      className={styles.container}
      style={
        activeBg
          ? { background: `linear-gradient(135deg, ${activeBg}11, ${activeBg}22)` }
          : {}
      }
    >
      <h2 className={styles.heading}>Фильтр по цвету</h2>
      <p className={styles.hint}>Выберите доминирующий цвет блюда</p>

      <div className={styles.scrollRow}>
        {Object.entries(COLOR_MAP).map(([key, val]) => (
          <motion.button
            key={key}
            className={`${styles.colorBtn} ${selectedColor === key ? styles.active : ""}`}
            onClick={() => handleColorClick(key)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            style={{ background: val.hex }}
          >
            <span className={styles.emoji}>{val.emoji}</span>
          </motion.button>
        ))}
      </div>

      {selectedColor && (
        <motion.p
          className={styles.activeLabel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Активный фильтр: {COLOR_MAP[selectedColor].emoji} {COLOR_MAP[selectedColor].label}
          <button className={styles.clearBtn} onClick={() => setSelectedColor(null)}>
            ✕ Сбросить
          </button>
        </motion.p>
      )}
    </div>
  );
}
