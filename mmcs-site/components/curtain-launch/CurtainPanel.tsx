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
  const openX = `${direction * 118}%`;
  const bottomPullX = `${direction * 8}%`;
  const waveX = `${direction * 34}%`;
  const sweepX = `${direction * 78}%`;
  const closedClip = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
  const bottomPullClip = isLeft
    ? 'polygon(0% 0%, 100% 0%, 100% 58%, 96% 72%, 86% 84%, 66% 94%, 34% 100%, 0% 100%)'
    : 'polygon(0% 0%, 100% 0%, 100% 100%, 66% 100%, 34% 94%, 14% 84%, 4% 72%, 0% 58%)';
  const waveClip = isLeft
    ? 'polygon(0% 0%, 92% 0%, 88% 14%, 82% 28%, 72% 43%, 58% 58%, 40% 74%, 18% 89%, 0% 100%)'
    : 'polygon(8% 0%, 100% 0%, 100% 100%, 82% 89%, 60% 74%, 42% 58%, 28% 43%, 18% 28%, 12% 14%)';
  const sweepClip = isLeft
    ? 'polygon(0% 0%, 68% 0%, 58% 14%, 46% 30%, 33% 48%, 20% 66%, 8% 84%, 0% 100%)'
    : 'polygon(32% 0%, 100% 0%, 100% 100%, 92% 84%, 80% 66%, 67% 48%, 54% 30%, 42% 14%)';
  const vanishClip = isLeft
    ? 'polygon(0% 0%, 24% 0%, 18% 18%, 12% 40%, 6% 64%, 0% 100%)'
    : 'polygon(76% 0%, 100% 0%, 100% 100%, 94% 64%, 88% 40%, 82% 18%)';
  const motionTransition: Transition = {
    ...transition,
    times: isOpen ? [0, 0.18, 0.48, 0.78, 1] : [0, 1],
  };

  return (
    <motion.div
      className={`${styles.curtainPanel} ${isLeft ? styles.leftCurtain : styles.rightCurtain}`}
      initial={false}
      animate={{
        x: isOpen ? ['0%', bottomPullX, waveX, sweepX, openX] : '0%',
        y: isOpen ? ['0%', '1.8%', '-0.6%', '-1.2%', '-1.6%'] : '0%',
        scaleX: isOpen ? [1, 1.01, 0.9, 0.7, 0.5] : 1,
        scaleY: isOpen ? [1, 1.025, 1.035, 1.018, 1] : 1,
        rotate: isOpen ? [0, direction * -1.4, direction * 2.4, direction * 4.2, direction * 5.4] : 0,
        rotateY: isOpen ? [0, direction * -1.2, direction * 4.6, direction * 8.4, direction * 11] : 0,
        skewY: isOpen ? [0, direction * -1.6, direction * -3.2, direction * -2.1, direction * -0.8] : 0,
        clipPath: isOpen ? [closedClip, bottomPullClip, waveClip, sweepClip, vanishClip] : closedClip,
        opacity: isOpen ? [1, 1, 0.98, 0.78, 0] : 1,
        filter: isOpen
          ? ['brightness(1) saturate(1)', 'brightness(1.1) saturate(1.08)', 'brightness(0.9) saturate(1.2)', 'brightness(0.82) saturate(1.18)', 'brightness(0.72) saturate(1.08)']
          : 'brightness(1) saturate(1)',
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
