'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './curtain-launch.module.css';

type CurtainState = 'closed' | 'opening' | 'open' | 'closing';

type CurtainControlsProps = {
  state: CurtainState;
  onEnter: () => void;
  onClose: () => void;
};

export function CurtainControls({ state, onEnter, onClose }: CurtainControlsProps) {
  const showBranding = state === 'closed' || state === 'closing';
  const showClose = state === 'open';

  return (
    <>
      <motion.div
        className={styles.branding}
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{
          opacity: showBranding ? 1 : 0,
          y: showBranding ? 0 : -14,
          scale: showBranding ? 1 : 0.985,
        }}
        transition={{ duration: 0.58, delay: state === 'closed' ? 0.32 : 0, ease: 'easeOut' }}
        aria-hidden={!showBranding}
      >
        <motion.div
          className={styles.logoMark}
          animate={{ opacity: showBranding ? 1 : 0, scale: showBranding ? 1 : 0.94 }}
          transition={{ duration: 0.5, delay: state === 'closed' ? 0.18 : 0, ease: 'easeOut' }}
        >
          <Image
            src="/images/mmcs-logo.png"
            alt="Muktidata Multipurpose Cooperative Society logo"
            width={112}
            height={132}
            priority
          />
        </motion.div>
        <p className={styles.brandName}>Muktidata Multipurpose Cooperative Society</p>
        <h1 className={styles.brandTitle}>
          <span>People · Livelihoods</span>
          <strong>Stronger Communities</strong>
        </h1>
        <motion.button
          className={styles.enterButton}
          type="button"
          onClick={onEnter}
          disabled={state !== 'closed'}
          aria-label="Enter the MMCS website"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.985 }}
        >
          Enter
        </motion.button>
      </motion.div>

      <motion.button
        className={styles.closeButton}
        type="button"
        onClick={onClose}
        initial={false}
        animate={{ opacity: showClose ? 1 : 0, y: showClose ? 0 : 8 }}
        transition={{ duration: 0.24 }}
        disabled={!showClose}
        aria-label="Close curtain"
        whileTap={{ scale: 0.985 }}
      >
        Close Curtain
      </motion.button>
    </>
  );
}
