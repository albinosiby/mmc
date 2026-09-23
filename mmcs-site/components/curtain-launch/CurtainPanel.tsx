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
  const openX = `${direction * 56}%`;
  const releaseX = `${direction * 2}%`;
  const sweepX = `${direction * 48}%`;
  const settleX = `${direction * 59}%`;
  const closingNearX = `${direction * 8}%`;
  const closedClip = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
  const releaseClip = isLeft
    ? 'polygon(0% 0%, 99.4% 0%, 100% 100%, 0% 100%)'
    : 'polygon(0.6% 0%, 100% 0%, 100% 100%, 0% 100%)';
  const sweepClip = isLeft
    ? 'polygon(0% 0%, 62% 0%, 20% 100%, 0% 100%)'
    : 'polygon(38% 0%, 100% 0%, 100% 100%, 80% 100%)';
  const settleClip = isLeft
    ? 'polygon(0% 0%, 50% 0%, 15% 100%, 0% 100%)'
    : 'polygon(50% 0%, 100% 0%, 100% 100%, 85% 100%)';
  const openClip = isLeft
    ? 'polygon(0% 0%, 46% 0%, 12% 100%, 0% 100%)'
    : 'polygon(54% 0%, 100% 0%, 100% 100%, 88% 100%)';
  const motionTransition: Transition = {
    ...transition,
    times: isOpen ? [0, 0.1, 0.62, 0.84, 1] : [0, 0.2, 0.72, 1],
  };

  return (
    <motion.div
      className={`${styles.curtainPanel} ${isLeft ? styles.leftCurtain : styles.rightCurtain}`}
      initial={false}
      animate={{
        x: isOpen ? ['0%', releaseX, sweepX, settleX, openX] : [openX, settleX, closingNearX, '0%'],
        scaleX: isOpen ? [1, 0.99, 0.68, 0.58, 0.62] : [0.62, 0.68, 0.94, 1],
        scaleY: isOpen ? [1, 1.008, 1.035, 1.02, 1.012] : [1.012, 1.02, 1.004, 1],
        rotate: isOpen ? [0, direction * -0.25, direction * 3.2, direction * 2.4, direction * 2] : [direction * 2, direction * 1.4, direction * 0.3, 0],
        rotateY: isOpen ? [0, direction * -0.8, direction * 7.4, direction * 5.8, direction * 4.2] : [direction * 4.2, direction * 3, direction * 0.7, 0],
        skewY: isOpen ? [0, direction * -0.25, direction * -1.5, direction * -0.9, direction * -0.65] : [direction * -0.65, direction * -0.45, direction * -0.14, 0],
        clipPath: isOpen ? [closedClip, releaseClip, sweepClip, settleClip, openClip] : [openClip, settleClip, releaseClip, closedClip],
        filter: isOpen
          ? ['brightness(1) saturate(1)', 'brightness(1.08) saturate(1.04)', 'brightness(0.82) saturate(1.15)', 'brightness(0.88) saturate(1.12)', 'brightness(0.94) saturate(1.08)']
          : ['brightness(0.94) saturate(1.08)', 'brightness(0.9) saturate(1.1)', 'brightness(0.98) saturate(1.03)', 'brightness(1) saturate(1)'],
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
