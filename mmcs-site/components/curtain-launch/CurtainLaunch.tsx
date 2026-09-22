'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { motion, useReducedMotion, type Transition } from 'framer-motion';
import styles from './curtain-launch.module.css';
import { CurtainPanel } from './CurtainPanel';
import { CurtainControls } from './CurtainControls';

type CurtainState = 'closed' | 'opening' | 'open' | 'closing';

const fullDuration = 1.58;
const reducedDuration = 0.18;
const curtainEase = [0.74, 0, 0.19, 1] as [number, number, number, number];

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

  const transition = useMemo<Transition>(
    () => ({
      duration,
      ease: reduceMotion ? 'easeOut' : curtainEase,
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
          scale: isOpen ? 1 : 0.965,
          filter: isOpen ? 'brightness(1) blur(0px)' : 'brightness(0.58) blur(2.5px)',
        }}
        transition={{ duration: reduceMotion ? 0.18 : 1.32, ease: 'easeOut' }}
      >
        {children}
      </motion.div>

      <div className={`${styles.stage} ${isOpen ? styles.stageOpen : ''}`}>
        <motion.div
          className={styles.stageLight}
          initial={{ opacity: 0 }}
          animate={{ opacity: state === 'closed' || state === 'closing' ? 1 : state === 'opening' ? 0.42 : 0 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.82, ease: 'easeOut' }}
        />
        <motion.div
          className={styles.revealLight}
          animate={{
            opacity: state === 'opening' || state === 'closing' ? 1 : 0,
            scaleX: isOpen ? 3.4 : 0.08,
            filter: isOpen ? 'blur(14px)' : 'blur(4px)',
          }}
          transition={{ duration: reduceMotion ? 0.1 : 0.9, ease: 'easeOut' }}
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
