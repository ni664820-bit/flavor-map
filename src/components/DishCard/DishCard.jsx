import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../store/useStore";
import styles from "./DishCard.module.css";

// ============================================
// Карточка блюда с анимацией появления
// Показывает изображение, название, описание,
// время приготовления, ингредиенты
// ============================================

const INGREDIENT_COLORS = [
  "#E74C3C", "#E67E22", "#F1C40F", "#27AE60",
  "#3498DB", "#9B59B6", "#E91E63", "#00BCD4",
];

export default function DishCard() {
  const currentDish = useStore((s) => s.currentDish);
  const filteredDishes = useStore((s) => s.filteredDishes);
  const setCurrentDish = useStore((s) => s.setCurrentDish);

  // Показываем карточки отфильтрованных блюд
  const dishesToShow = currentDish ? [currentDish] : filteredDishes.slice(0, 3);

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        {dishesToShow.length > 0 ? (
          <motion.div
            key={dishesToShow.map((d) => d.id).join("-")}
            className={styles.grid}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {dishesToShow.map((dish, i) => (
              <motion.div
                key={dish.id}
                className={styles.card}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
                onClick={() => setCurrentDish(dish)}
              >
                <div className={styles.imageWrap}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className={styles.image}
                    loading="lazy"
                  />
                  <div className={styles.timeBadge}>⏱️ {dish.cookingTime} мин</div>
                </div>

                <div className={styles.body}>
                  <h3 className={styles.name}>{dish.name}</h3>
                  <p className={styles.desc}>{dish.description}</p>

                  <div className={styles.ingredients}>
                    {dish.ingredients.map((ing, j) => (
                      <span
                        key={j}
                        className={styles.ingredient}
                        style={{ background: INGREDIENT_COLORS[j % INGREDIENT_COLORS.length] }}
                        title={ing}
                      >
                        {ing}
                      </span>
                    ))}
                  </div>

                  <button
                    className={styles.shareBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      const text = `🍽️ Рекомендация: ${dish.name} — ${dish.description}`;
                      if (navigator.share) {
                        navigator.share({ title: "Flavor Map", text });
                      } else {
                        navigator.clipboard.writeText(text);
                        alert("Скопировано в буфер обмена!");
                      }
                    }}
                  >
                    📤 Поделиться
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p
            className={styles.empty}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Выберите настроение, погоду или время суток для подбора блюд
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
