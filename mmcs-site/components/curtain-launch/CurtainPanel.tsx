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
  const bottomPullX = `${direction * 10}%`;
  const waveX = `${direction * 44}%`;
  const closedClip = isLeft
    ? 'polygon(0% 0%, 100% 0%, 100% 14%, 100% 28%, 100% 45%, 100% 62%, 100% 80%, 100% 100%, 0% 100%)'
    : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 80%, 0% 62%, 0% 45%, 0% 28%, 0% 14%)';
  const bottomPullClip = isLeft
    ? 'polygon(0% 0%, 100% 0%, 100% 14%, 100% 34%, 98% 56%, 90% 74%, 72% 90%, 40% 100%, 0% 100%)'
    : 'polygon(0% 0%, 100% 0%, 100% 100%, 60% 100%, 28% 90%, 10% 74%, 2% 56%, 0% 34%, 0% 14%)';
  const waveClip = isLeft
    ? 'polygon(0% 0%, 92% 0%, 88% 14%, 82% 28%, 72% 43%, 58% 58%, 40% 74%, 18% 89%, 0% 100%)'
    : 'polygon(8% 0%, 100% 0%, 100% 100%, 82% 89%, 60% 74%, 42% 58%, 28% 43%, 18% 28%, 12% 14%)';
  const vanishClip = isLeft
    ? 'polygon(0% 0%, 18% 0%, 14% 14%, 10% 30%, 7% 48%, 4% 66%, 2% 84%, 0% 94%, 0% 100%)'
    : 'polygon(82% 0%, 100% 0%, 100% 100%, 100% 94%, 98% 84%, 96% 66%, 93% 48%, 90% 30%, 86% 14%)';
  const motionTransition: Transition = {
    ...transition,
    times: isOpen ? [0, 0.24, 0.72, 1] : [0, 1],
  };

  return (
    <motion.div
      className={`${styles.curtainPanel} ${isLeft ? styles.leftCurtain : styles.rightCurtain}`}
      initial={false}
      animate={{
        x: isOpen ? ['0%', bottomPullX, waveX, openX] : '0%',
        y: isOpen ? ['0%', '1.2%', '-0.8%', '-1.2%'] : '0%',
        scaleX: isOpen ? [1, 0.96, 0.72, 0.46] : 1,
        scaleY: isOpen ? [1, 1.018, 1.01, 1] : 1,
        rotate: isOpen ? [0, direction * -0.9, direction * 2.2, direction * 4.2] : 0,
        rotateY: isOpen ? [0, direction * -0.6, direction * 4.2, direction * 7.2] : 0,
        skewY: isOpen ? [0, direction * -1.1, direction * -1.9, direction * -0.4] : 0,
        clipPath: isOpen ? [closedClip, bottomPullClip, waveClip, vanishClip] : closedClip,
        opacity: isOpen ? [1, 1, 1, 0] : 1,
        filter: isOpen ? ['brightness(1) saturate(1)', 'brightness(1.04) saturate(1.04)', 'brightness(0.96) saturate(1.1)', 'brightness(0.9) saturate(1.04)'] : 'brightness(1) saturate(1)',
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
