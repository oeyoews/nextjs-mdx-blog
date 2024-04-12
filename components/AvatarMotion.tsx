'use client';

import { motion } from 'framer-motion';

export default function AvatarMotion() {
  return (
    <motion.div
      className="size-24 shadow-md bg-cover outline outline-dimmed-100 dark:outline-dimmed-200 bg-center rounded-full inline-block mx-auto bg-avatar-oeyoews"
      initial={{ scale: 0.5 }}
      animate={{ rotate: 360, scale: 1.0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20
      }}
    />
  );
}
