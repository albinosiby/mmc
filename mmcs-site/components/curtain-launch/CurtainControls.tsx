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
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: showBranding ? 1 : 0, y: showBranding ? 0 : -8 }}
        transition={{ duration: 0.45, delay: state === 'closed' ? 0.35 : 0 }}
        aria-hidden={!showBranding}
      >
        <div className={styles.logoMark}>
          <Image
            src="/images/mmcs-logo.png"
            alt="Muktidata Multipurpose Cooperative Society logo"
            width={112}
            height={132}
            priority
          />
        </div>
        <p className={styles.brandName}>Muktidata Multipurpose Cooperative Society</p>
        <h1 className={styles.brandTitle}>
          <span>People · Livelihoods</span>
          <strong>Stronger Communities</strong>
        </h1>
        <button
          className={styles.enterButton}
          type="button"
          onClick={onEnter}
          disabled={state !== 'closed'}
          aria-label="Enter the MMCS website"
        >
          Enter
        </button>
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
      >
        Close Curtain
      </motion.button>
    </>
  );
}
