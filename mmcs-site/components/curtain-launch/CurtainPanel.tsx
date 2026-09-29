'use client';

import { motion, type Transition } from 'framer-motion';
import styles from './curtain-launch.module.css';

type CurtainPanelProps = {
  side: 'left' | 'right';
  isOpen: boolean;
  transition: Transition;
  onAnimationComplete?: () => void;
};

const closedShape = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

const openShapes = {
  left: [
    closedShape,
    'polygon(0% 0%, 100% 0%, 99% 42%, 76% 100%, 0% 100%)',
    'polygon(0% 0%, 96% 0%, 79% 30%, 46% 100%, 0% 100%)',
    'polygon(0% 0%, 78% 0%, 55% 38%, 10% 100%, 0% 100%)',
    'polygon(0% 0%, 28% 0%, 18% 48%, 0% 100%, 0% 100%)',
  ],
  right: [
    closedShape,
    'polygon(0% 0%, 100% 0%, 100% 100%, 24% 100%, 1% 42%)',
    'polygon(4% 0%, 100% 0%, 100% 100%, 54% 100%, 21% 30%)',
    'polygon(22% 0%, 100% 0%, 100% 100%, 90% 100%, 45% 38%)',
    'polygon(72% 0%, 100% 0%, 100% 100%, 100% 100%, 82% 48%)',
  ],
} satisfies Record<CurtainPanelProps['side'], string[]>;

export function CurtainPanel({
  side,
  isOpen,
  transition,
  onAnimationComplete,
}: CurtainPanelProps) {
  const isLeft = side === 'left';
  const direction = isLeft ? -1 : 1;
  const openX = `${direction * 118}%`;
  const bottomPullX = `${direction * 4}%`;
  const bowX = `${direction * 18}%`;
  const sweepX = `${direction * 74}%`;
  const motionTransition: Transition = {
    ...transition,
    duration: isOpen && typeof transition.duration === 'number' ? transition.duration * 1.08 : transition.duration,
    times: isOpen ? [0, 0.18, 0.45, 0.76, 1] : [0, 1],
  };

  return (
    <motion.div
      className={`${styles.curtainPanel} ${isLeft ? styles.leftCurtain : styles.rightCurtain}`}
      initial={false}
      animate={{
        clipPath: isOpen ? openShapes[side] : closedShape,
        x: isOpen ? ['0%', bottomPullX, bowX, sweepX, openX] : '0%',
        y: isOpen ? ['0%', '1.4%', '0.7%', '-0.25%', '0%'] : '0%',
        scaleX: isOpen ? [1, 0.98, 0.88, 0.54, 0.16] : 1,
        scaleY: isOpen ? [1, 1.018, 1.012, 1.004, 1] : 1,
        rotate: isOpen ? [0, direction * -0.2, direction * 0.55, direction * 1.15, direction * 1.8] : 0,
        rotateY: isOpen ? [0, direction * -0.1, direction * 0.6, direction * 1.4, direction * 2.2] : 0,
        skewY: isOpen ? [0, direction * -0.18, direction * -0.72, direction * -0.42, 0] : 0,
        opacity: isOpen ? [1, 1, 1, 0.92, 0] : 1,
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
