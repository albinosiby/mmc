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
  const openX = `${direction * 34}%`;
  const releaseX = `${direction * 2}%`;
  const gatherX = `${direction * 42}%`;
  const closingNearX = `${direction * 10}%`;
  const closedClip = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
  const releaseClip = isLeft
    ? 'polygon(0% 0%, 99% 0%, 100% 100%, 0% 100%)'
    : 'polygon(1% 0%, 100% 0%, 100% 100%, 0% 100%)';
  const gatheredClip = isLeft
    ? 'polygon(0% 0%, 88% 0%, 38% 100%, 0% 100%)'
    : 'polygon(12% 0%, 100% 0%, 100% 100%, 62% 100%)';
  const openClip = isLeft
    ? 'polygon(0% 0%, 82% 0%, 24% 100%, 0% 100%)'
    : 'polygon(18% 0%, 100% 0%, 100% 100%, 76% 100%)';
  const motionTransition: Transition = {
    ...transition,
    times: isOpen ? [0, 0.16, 0.72, 1] : [0, 0.62, 1],
  };

  return (
    <motion.div
      className={`${styles.curtainPanel} ${isLeft ? styles.leftCurtain : styles.rightCurtain}`}
      initial={false}
      animate={{
        x: isOpen ? ['0%', releaseX, gatherX, openX] : [openX, closingNearX, '0%'],
        scaleX: isOpen ? [1, 0.99, 0.76, 0.86] : [0.86, 0.94, 1],
        scaleY: isOpen ? [1, 1.006, 1.035, 1.018] : [1.018, 1.006, 1],
        rotate: isOpen ? [0, direction * -0.4, direction * 4.8, direction * 3.2] : [direction * 3.2, direction * 0.8, 0],
        rotateY: isOpen ? [0, direction * -1.2, direction * 8.5, direction * 5.4] : [direction * 5.4, direction * 1.2, 0],
        skewY: isOpen ? [0, direction * -0.35, direction * -2.1, direction * -1.15] : [direction * -1.15, direction * -0.25, 0],
        clipPath: isOpen ? [closedClip, releaseClip, gatheredClip, openClip] : [openClip, releaseClip, closedClip],
        filter: isOpen
          ? ['brightness(1) saturate(1)', 'brightness(1.08) saturate(1.04)', 'brightness(0.76) saturate(1.18)', 'brightness(0.9) saturate(1.1)']
          : ['brightness(0.9) saturate(1.1)', 'brightness(0.96) saturate(1.04)', 'brightness(1) saturate(1)'],
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
