import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

// ============================================
// Hero-блок с анимированными ингредиентами
// Летающие помидоры, базилик, лимоны на фоне
// ============================================

const INGREDIENTS = [
  { emoji: "🍅", size: 48, x: "10%", y: "20%", duration: 18 },
  { emoji: "🌿", size: 40, x: "85%", y: "15%", duration: 22 },
  { emoji: "🍋", size: 44, x: "75%", y: "70%", duration: 20 },
  { emoji: "🫒", size: 36, x: "20%", y: "75%", duration: 25 },
  { emoji: "🧄", size: 38, x: "50%", y: "10%", duration: 19 },
  { emoji: "🌶️", size: 42, x: "90%", y: "45%", duration: 23 },
  { emoji: "🍊", size: 46, x: "5%", y: "50%", duration: 21 },
  { emoji: "🥬", size: 40, x: "40%", y: "85%", duration: 17 },
];

const FloatingIngredient = ({ emoji, size, x, y, duration }) => (
  <motion.div
    className={styles.ingredient}
    style={{ left: x, top: y, fontSize: size }}
    animate={{
      y: [0, -30, 10, -20, 0],
      x: [0, 15, -10, 5, 0],
      rotate: [0, 10, -5, 15, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {emoji}
  </motion.div>
);

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Летающие ингредиенты на фоне */}
      <div className={styles.ingredientsLayer}>
        {INGREDIENTS.map((item, i) => (
          <FloatingIngredient key={i} {...item} />
        ))}
      </div>

      {/* Контент */}
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className={styles.title}>Что сегодня на вкус?</h1>
        <p className={styles.subtitle}>
          Выберите блюдо по настроению, погоде или времени суток
        </p>
      </motion.div>
    </section>
  );
}
