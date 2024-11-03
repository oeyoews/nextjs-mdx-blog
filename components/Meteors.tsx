'use client'
import { useEffect, useRef } from "react";

const Meteors = () => {
  const meteorContainerRef = useRef<HTMLDivElement | null>(null);

  // 随机生成位置、延迟和时长
  const getRandomPosition = (max: number): string => `${Math.floor(Math.random() * max)}px`;
  const getRandomDelay = (): string => `${(Math.random() * 1 + 0.2).toFixed(2)}s`;
  const getRandomDuration = (): string => `${Math.floor(Math.random() * 8 + 2)}s`;

  useEffect(() => {
    const meteorContainer = meteorContainerRef.current;
    const meteorCount = 20;

    if (meteorContainer) {
      for (let i = 0; i < meteorCount; i++) {
        const meteor = document.createElement("div");
        meteor.className = "absolute";

        const span = document.createElement("span");
        span.className =
          "pointer-events-none absolute left-1/2 top-1/2 rotate-[215deg] size-0.5 animate-meteor rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]";

        // 随机位置、延迟、动画时长
        span.style.top = "-5px";
        span.style.left = getRandomPosition(window.innerWidth);
        span.style.animationDelay = getRandomDelay();
        span.style.animationDuration = getRandomDuration();

        // 添加流星尾巴
        const tail = document.createElement("div");
        tail.className =
          "pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent";

        // 结构拼装
        span.appendChild(tail);
        meteor.appendChild(span);
        meteorContainer.appendChild(meteor);
      }
    }
  }, []);

  return (
    <div className="absolute w-full h-screen overflow-hidden" ref={meteorContainerRef}>
    </div>
  );
};

export default Meteors;
