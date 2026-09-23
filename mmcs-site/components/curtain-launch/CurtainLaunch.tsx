'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { motion, useReducedMotion, type Transition } from 'framer-motion';
import styles from './curtain-launch.module.css';
import { CurtainPanel } from './CurtainPanel';
import { CurtainControls } from './CurtainControls';

type CurtainState = 'closed' | 'opening' | 'open';

const fullDuration = 2.08;
const reducedDuration = 0.18;
const curtainEase = [0.78, 0, 0.18, 1] as [number, number, number, number];

export function CurtainLaunch({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CurtainState>('closed');
  const reduceMotion = useReducedMotion();
  const isOpening = state === 'opening';
  const showStage = state !== 'open';
  const duration = reduceMotion ? reducedDuration : fullDuration;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const shouldLock = state === 'closed' || state === 'opening';
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

  function completeMotion() {
    if (state === 'opening') setState('open');
  }

  return (
    <>
      <motion.div
        className={styles.websiteShell}
        animate={{
          scale: isOpening ? [0.965, 0.972, 1] : state === 'open' ? 1 : 0.965,
          filter: isOpening
            ? ['brightness(0.58) blur(2.5px)', 'brightness(0.76) blur(1.3px)', 'brightness(1) blur(0px)']
            : state === 'open'
              ? 'brightness(1) blur(0px)'
              : 'brightness(0.58) blur(2.5px)',
        }}
        transition={{ duration: reduceMotion ? 0.18 : 1.58, ease: 'easeOut', times: isOpening ? [0, 0.34, 1] : undefined }}
      >
        {children}
      </motion.div>

      {showStage ? (
        <div className={`${styles.stage} ${isOpening ? styles.stageOpen : ''}`}>
          <motion.div
            className={styles.stageLight}
            initial={{ opacity: 0 }}
            animate={{ opacity: state === 'closed' ? 1 : 0.36 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.92, ease: 'easeOut' }}
          />
          <motion.div
            className={styles.revealLight}
            animate={{
              opacity: isOpening ? [0, 1, 0.62, 0] : 0,
              scaleX: isOpening ? [0.08, 0.22, 2.9, 4.4] : 0.08,
              filter: isOpening ? ['blur(3px)', 'blur(6px)', 'blur(18px)', 'blur(24px)'] : 'blur(3px)',
            }}
            transition={{ duration: reduceMotion ? 0.1 : 1.34, ease: 'easeOut', times: isOpening ? [0, 0.12, 0.64, 1] : undefined }}
          />

          <CurtainPanel side="left" isOpen={isOpening} transition={transition} />
          <CurtainPanel
            side="right"
            isOpen={isOpening}
            transition={transition}
            onAnimationComplete={completeMotion}
          />

          <CurtainControls
            state={state}
            onEnter={openCurtain}
          />
        </div>
      ) : null}
    </>
  );
}
