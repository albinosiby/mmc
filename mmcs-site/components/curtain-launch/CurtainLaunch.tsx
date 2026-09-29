'use client';

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion, type Transition } from 'framer-motion';
import styles from './curtain-launch.module.css';
import { CurtainPanel } from './CurtainPanel';
import { CurtainControls } from './CurtainControls';

type CurtainState = 'closed' | 'opening' | 'open';

const fullDuration = 2.18;
const reducedDuration = 0.18;
const curtainEase = [0.4, 0, 0.2, 1] as [number, number, number, number];

export function CurtainLaunch({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CurtainState>('closed');
  const [introComplete, setIntroComplete] = useState(false);
  const reduceMotion = useReducedMotion();
  const isOpening = state === 'opening';
  const showPoster = !introComplete;
  const posterReady = state === 'open';
  const showStage = state !== 'open';
  const duration = reduceMotion ? reducedDuration : fullDuration;

  const dismissPoster = useCallback(() => {
    if (state !== 'open') return;
    setIntroComplete(true);
  }, [state]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const shouldLock = state === 'closed' || state === 'opening' || showPoster;
    document.body.style.overflow = shouldLock ? 'hidden' : previousOverflow || '';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showPoster, state]);

  useEffect(() => {
    if (!showPoster || state !== 'open') return;

    function dismissOnKey() {
      dismissPoster();
    }

    window.addEventListener('keydown', dismissOnKey);
    return () => {
      window.removeEventListener('keydown', dismissOnKey);
    };
  }, [dismissPoster, showPoster, state]);

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
          scale: isOpening ? [0.985, 0.992, 1] : state === 'open' ? 1 : 0.985,
          opacity: state === 'closed' ? 0.96 : 1,
        }}
        transition={{ duration: reduceMotion ? 0.18 : 1.16, ease: 'easeOut', times: isOpening ? [0, 0.45, 1] : undefined }}
      >
        {children}
      </motion.div>

      {showStage ? (
        <div className={`${styles.stage} ${isOpening ? styles.stageOpen : ''}`}>
          <motion.div
            className={styles.stageLight}
            initial={{ opacity: 0 }}
            animate={{ opacity: state === 'closed' ? 1 : 0.34 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.72, ease: 'easeOut' }}
          />
          <motion.div
            className={styles.revealLight}
            animate={{
              opacity: isOpening ? [0, 0.82, 0] : 0,
              scaleX: isOpening ? [0.08, 2.4, 4.1] : 0.08,
            }}
            transition={{ duration: reduceMotion ? 0.1 : 1.08, ease: 'easeOut', times: isOpening ? [0, 0.52, 1] : undefined }}
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

      <AnimatePresence>
        {showPoster ? (
          <motion.button
            type="button"
            className={`${styles.posterOverlay} ${posterReady ? '' : styles.posterWaiting}`}
            onClick={dismissPoster}
            disabled={!posterReady}
            aria-label="Close launch gratitude poster and enter website"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.32, ease: 'easeOut' }}
          >
            <motion.span
              className={styles.posterFrame}
              initial={{ opacity: 0, y: 26, scale: 0.965 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                y: reduceMotion ? 0 : -76,
                x: reduceMotion ? 0 : 42,
                scale: reduceMotion ? 0.98 : 0.86,
                rotate: reduceMotion ? 0 : -2.5,
                filter: reduceMotion ? 'none' : 'blur(8px)',
              }}
              transition={{ duration: reduceMotion ? 0.14 : 0.62, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/images/launch-gratitude-brochure.png"
                alt="With heartfelt gratitude launch poster from Muktidata Multipurpose Cooperative Society"
                fill
                priority
                sizes="100vw"
                className={styles.posterImage}
              />
            </motion.span>
            {posterReady ? <span className={styles.posterHint}>Tap or press any key to continue</span> : null}
          </motion.button>
        ) : null}
      </AnimatePresence>
    </>
  );
}
