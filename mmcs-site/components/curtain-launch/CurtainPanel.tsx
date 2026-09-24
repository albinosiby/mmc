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
  const openX = `${direction * 122}%`;
  const bottomPullX = `${direction * 12}%`;
  const waveX = `${direction * 48}%`;
  const closedClip = isLeft
    ? 'polygon(0% 0%, 100% 0%, 100% 14%, 100% 28%, 100% 45%, 100% 62%, 100% 80%, 100% 100%, 0% 100%)'
    : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 80%, 0% 62%, 0% 45%, 0% 28%, 0% 14%)';
  const bottomPullClip = isLeft
    ? 'polygon(0% 0%, 100% 0%, 100% 14%, 100% 34%, 98% 56%, 90% 74%, 72% 90%, 40% 100%, 0% 100%)'
    : 'polygon(0% 0%, 100% 0%, 100% 100%, 60% 100%, 28% 90%, 10% 74%, 2% 56%, 0% 34%, 0% 14%)';
  const waveClip = isLeft
    ? 'polygon(0% 0%, 90% 0%, 86% 14%, 80% 28%, 70% 43%, 56% 58%, 38% 74%, 16% 89%, 0% 100%)'
    : 'polygon(10% 0%, 100% 0%, 100% 100%, 84% 89%, 62% 74%, 44% 58%, 30% 43%, 20% 28%, 14% 14%)';
  const vanishClip = isLeft
    ? 'polygon(0% 0%, 12% 0%, 10% 14%, 8% 30%, 5% 48%, 3% 66%, 1% 84%, 0% 94%, 0% 100%)'
    : 'polygon(88% 0%, 100% 0%, 100% 100%, 100% 94%, 99% 84%, 97% 66%, 95% 48%, 92% 30%, 90% 14%)';
  const motionTransition: Transition = {
    ...transition,
    times: isOpen ? [0, 0.28, 0.76, 1] : [0, 1],
  };

  return (
    <motion.div
      className={`${styles.curtainPanel} ${isLeft ? styles.leftCurtain : styles.rightCurtain}`}
      initial={false}
      animate={{
        x: isOpen ? ['0%', bottomPullX, waveX, openX] : '0%',
        y: isOpen ? ['0%', '0.8%', '-0.6%', '-1%'] : '0%',
        scaleX: isOpen ? [1, 0.97, 0.76, 0.42] : 1,
        scaleY: isOpen ? [1, 1.012, 1.006, 1] : 1,
        rotate: isOpen ? [0, direction * -0.55, direction * 1.45, direction * 2.8] : 0,
        rotateY: isOpen ? [0, direction * -0.25, direction * 2.4, direction * 4.4] : 0,
        skewY: isOpen ? [0, direction * -0.8, direction * -1.2, direction * -0.2] : 0,
        clipPath: isOpen ? [closedClip, bottomPullClip, waveClip, vanishClip] : closedClip,
        opacity: isOpen ? [1, 1, 1, 0] : 1,
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
