'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './curtain-launch.module.css';
import { CurtainPanel } from './CurtainPanel';
import { CurtainControls } from './CurtainControls';

type CurtainState = 'closed' | 'opening' | 'open' | 'closing';

const fullDuration = 1.36;
const reducedDuration = 0.18;

export function CurtainLaunch({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CurtainState>('closed');
  const reduceMotion = useReducedMotion();
  const isOpen = state === 'opening' || state === 'open';
  const duration = reduceMotion ? reducedDuration : fullDuration;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const shouldLock = state === 'closed' || state === 'opening' || state === 'closing';
    document.body.style.overflow = shouldLock ? 'hidden' : previousOverflow || '';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [state]);

  const transition = useMemo(
    () => ({
      duration,
      ease: reduceMotion ? 'easeOut' : [0.76, 0, 0.24, 1],
    }),
    [duration, reduceMotion],
  );

  function openCurtain() {
    if (state !== 'closed') return;
    setState('opening');
  }

  function closeCurtain() {
    if (state !== 'open') return;
    setState('closing');
  }

  function completeMotion() {
    if (state === 'opening') setState('open');
    if (state === 'closing') setState('closed');
  }

  return (
    <>
      <motion.div
        className={styles.websiteShell}
        animate={{
          scale: isOpen ? 1 : 0.97,
          filter: isOpen ? 'brightness(1) blur(0px)' : 'brightness(0.65) blur(2px)',
        }}
        transition={{ duration: reduceMotion ? 0.18 : 1.15, ease: 'easeOut' }}
      >
        {children}
      </motion.div>

      <div className={`${styles.stage} ${isOpen ? styles.stageOpen : ''}`}>
        <motion.div
          className={styles.stageLight}
          initial={{ opacity: 0 }}
          animate={{ opacity: state === 'closed' || state === 'closing' ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.45 }}
        />
        <motion.div
          className={styles.revealLight}
          animate={{
            opacity: state === 'opening' || state === 'closing' ? 1 : 0,
            scaleX: isOpen ? 1.9 : 0.12,
          }}
          transition={{ duration: reduceMotion ? 0.1 : 0.7, ease: 'easeOut' }}
        />

        <CurtainPanel side="left" isOpen={isOpen} transition={transition} />
        <CurtainPanel
          side="right"
          isOpen={isOpen}
          transition={transition}
          onAnimationComplete={completeMotion}
        />

        <CurtainControls
          state={state}
          onEnter={openCurtain}
          onClose={closeCurtain}
        />
      </div>
    </>
  );
}
