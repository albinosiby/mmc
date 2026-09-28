'use client';

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion, type Transition } from 'framer-motion';
import styles from './curtain-launch.module.css';
import { CurtainPanel } from './CurtainPanel';
import { CurtainControls } from './CurtainControls';

type CurtainState = 'closed' | 'opening' | 'open';

const launchSeenKey = 'mmcs-launch-gratitude-poster-seen-v1';
const fullDuration = 2.18;
const reducedDuration = 0.18;
const curtainEase = [0.4, 0, 0.2, 1] as [number, number, number, number];

function hasSeenLaunchPoster() {
  if (typeof window === 'undefined') return false;

  try {
    return window.localStorage.getItem(launchSeenKey) === 'true';
  } catch {
    return false;
  }
}

export function CurtainLaunch({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CurtainState>(() => (hasSeenLaunchPoster() ? 'open' : 'closed'));
  const [introComplete, setIntroComplete] = useState(() => hasSeenLaunchPoster());
  const reduceMotion = useReducedMotion();
  const isOpening = state === 'opening';
  const showPoster = state === 'open' && !introComplete;
  const showStage = state !== 'open';
  const duration = reduceMotion ? reducedDuration : fullDuration;

  const dismissPoster = useCallback(() => {
    try {
      window.localStorage.setItem(launchSeenKey, 'true');
    } catch {
      // The launch should still dismiss if storage is unavailable.
    }

    setIntroComplete(true);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const shouldLock = state === 'closed' || state === 'opening' || showPoster;
    document.body.style.overflow = shouldLock ? 'hidden' : previousOverflow || '';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showPoster, state]);

  useEffect(() => {
    if (!showPoster) return;

    function dismissOnKey() {
      dismissPoster();
    }

    window.addEventListener('keydown', dismissOnKey);
    return () => {
      window.removeEventListener('keydown', dismissOnKey);
    };
  }, [dismissPoster, showPoster]);

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
        transition={{ duration: reduceMotion ? 0.18 : 1.56, ease: 'easeOut', times: isOpening ? [0, 0.34, 1] : undefined }}
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
            className={styles.posterOverlay}
            onClick={dismissPoster}
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
                src="/images/launch-gratitude-poster.png"
                alt="With heartfelt gratitude launch poster from Muktidata Multipurpose Cooperative Society"
                fill
                priority
                sizes="100vw"
                className={styles.posterImage}
              />
            </motion.span>
            <span className={styles.posterHint}>Tap or press any key to continue</span>
          </motion.button>
        ) : null}
      </AnimatePresence>
    </>
  );
}
