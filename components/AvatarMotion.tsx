'use client';

import { toast } from 'sonner';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AvatarMotion() {
  const [animationKey, setAnimationKey] = useState(0);

  const handleClick = () => {
    setAnimationKey((prevKey) => prevKey + 1);
    toast.success('在 GitHub 上了解我更多', {
      action: {
        label: '确认',
        onClick: () => {
          window.open('https://github.com/oeyoews', '_blank');
        }
      }
    });
  };

  return (
    <>
      <motion.div
        key={animationKey}
        className="size-24 shadow-md bg-cover outline outline-dimmed-100/80 dark:outline-dimmed-200 bg-center rounded-full inline-block mx-auto bg-avatar-oeyoews cursor-pointer"
        initial={{ scale: 0.5 }}
        animate={{ rotate: 360, scale: 1.0 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20
        }}
        onClick={handleClick}
        title="点我一下试试"
      ></motion.div>
    </>
  );
}
