import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../store/useStore";
import styles from "./History.module.css";

// ============================================
// Блок «Ваши недавние вкусы»
// Хранит историю в localStorage (до 10 блюд)
// ============================================

export default function History() {
  const history = useStore((s) => s.history);
  const setCurrentDish = useStore((s) => s.setCurrentDish);

  if (history.length === 0) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Ваши недавние вкусы</h2>
      <div className={styles.scrollRow}>
        <AnimatePresence>
          {history.map((dish) => (
            <motion.button
              key={dish.id}
              className={styles.card}
              onClick={() => setCurrentDish(dish)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={dish.image} alt={dish.name} className={styles.thumb} />
              <span className={styles.name}>{dish.name}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
