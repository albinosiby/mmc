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
  const direction = isLeft ? -1 : 1;
  const openX = `${direction * 86}%`;
  const releaseX = `${direction * 1.8}%`;
  const gatherX = `${direction * 92}%`;
  const closingNearX = `${direction * 8}%`;
  const motionTransition: Transition = {
    ...transition,
    times: isOpen ? [0, 0.14, 0.76, 1] : [0, 0.58, 1],
  };

  return (
    <motion.div
      className={`${styles.curtainPanel} ${isLeft ? styles.leftCurtain : styles.rightCurtain}`}
      initial={false}
      animate={{
        x: isOpen ? ['0%', releaseX, gatherX, openX] : [openX, closingNearX, '0%'],
        scaleX: isOpen ? [1, 0.985, 0.64, 0.72] : [0.72, 0.88, 1],
        scaleY: isOpen ? [1, 1.006, 1.025, 1.012] : [1.012, 1.004, 1],
        rotateY: isOpen ? [0, direction * -1.2, direction * 9.5, direction * 6.2] : [direction * 6.2, direction * 1.2, 0],
        skewY: isOpen ? [0, direction * -0.35, direction * -1.65, direction * -0.85] : [direction * -0.85, direction * -0.25, 0],
        filter: isOpen
          ? ['brightness(1) saturate(1)', 'brightness(1.08) saturate(1.04)', 'brightness(0.78) saturate(1.16)', 'brightness(0.88) saturate(1.1)']
          : ['brightness(0.88) saturate(1.1)', 'brightness(0.96) saturate(1.04)', 'brightness(1) saturate(1)'],
      }}
      transition={motionTransition}
      onAnimationComplete={onAnimationComplete}
    >
      <div className={styles.fabricTop} />
      <div className={styles.fabricBody} />
      <div className={styles.fabricHem} />
    </motion.div>
  );
}
