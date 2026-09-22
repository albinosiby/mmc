'use client';

import { motion, type Transition } from 'framer-motion';
import styles from './curtain-launch.module.css';

type CurtainPanelProps = {
  side: 'left' | 'right';
  isOpen: boolean;
  transition: Transition;
  onAnimationComplete?: () => void;
};

export function CurtainPanel({
  side,
  isOpen,
  transition,
  onAnimationComplete,
}: CurtainPanelProps) {
  const isLeft = side === 'left';

  return (
    <motion.div
      className={`${styles.curtainPanel} ${isLeft ? styles.leftCurtain : styles.rightCurtain}`}
      initial={false}
      animate={{
        x: isOpen ? (isLeft ? '-86%' : '86%') : '0%',
        scaleX: isOpen ? 0.72 : 1,
        scaleY: isOpen ? 1.015 : 1,
        rotateY: isOpen ? (isLeft ? 7 : -7) : 0,
        skewY: isOpen ? (isLeft ? -1.1 : 1.1) : 0,
        filter: isOpen ? 'brightness(0.88) saturate(1.1)' : 'brightness(1) saturate(1)',
      }}
      transition={transition}
      onAnimationComplete={onAnimationComplete}
    >
      <div className={styles.fabricTop} />
      <div className={styles.fabricBody} />
      <div className={styles.fabricHem} />
    </motion.div>
  );
}
