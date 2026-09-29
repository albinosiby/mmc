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
  const openX = `${direction * 124}%`;
  const bottomPullX = `${direction * 10}%`;
  const waveX = `${direction * 52}%`;
  const motionTransition: Transition = {
    ...transition,
    times: isOpen ? [0, 0.32, 0.78, 1] : [0, 1],
  };

  return (
    <motion.div
      className={`${styles.curtainPanel} ${isLeft ? styles.leftCurtain : styles.rightCurtain}`}
      initial={false}
      animate={{
        x: isOpen ? ['0%', bottomPullX, waveX, openX] : '0%',
        y: isOpen ? ['0%', '0.65%', '-0.35%', '0%'] : '0%',
        scaleX: isOpen ? [1, 0.9, 0.58, 0.22] : 1,
        scaleY: isOpen ? [1, 1.01, 1.004, 1] : 1,
        rotate: isOpen ? [0, direction * -0.35, direction * 0.95, direction * 1.6] : 0,
        rotateY: isOpen ? [0, direction * -0.2, direction * 1.2, direction * 2] : 0,
        skewY: isOpen ? [0, direction * -0.45, direction * -0.75, 0] : 0,
        opacity: isOpen ? [1, 1, 0.96, 0] : 1,
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
