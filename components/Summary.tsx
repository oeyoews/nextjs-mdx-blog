'use client';

import React, { useState, useEffect } from 'react';
import { CiText } from 'react-icons/ci';

const Summary = ({
  text,
  header = '文章摘要',
  blink = true,
  speed = 20
}: TypingEffectProps) => {
  const [displayText, setDisplayText] = useState<string>(header + '生成中 ...');
  const [dotVisible, setDotVisible] = useState<boolean>(false);

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        setDotVisible(true);
        currentIndex++;
      } else {
        clearInterval(intervalId);
        setDotVisible(false);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  useEffect(() => {
    if (!blink) return;
    let blinkCount = 0;
    const maxBlinks = 3;
    const dotInterval = setInterval(() => {
      setDotVisible((prevVisible) => {
        if (!prevVisible) blinkCount++;
        return !prevVisible;
      });
      if (blinkCount >= maxBlinks) {
        clearInterval(dotInterval);
        setDotVisible(false);
      }
    }, 500);
    return () => clearInterval(dotInterval);
  }, [blink]);

  return (
    // displayText &&
    (<div className="gap-2 border-solid border p-4 rounded-sm border-dimmed-200 dark:border-dimmed-700 dark:bg-dimmed-800 dark:text-white mb-4 text-sm antialiased">
      <div className="mb-2 flex items-center gap-2">
        <CiText />
        <span>{header}</span>
      </div>
      <div className="indent-1 space-x-1">
        <span className="">{displayText}</span>
        {dotVisible && <span>●</span>}
      </div>
    </div>)
  );
};

export default Summary;
