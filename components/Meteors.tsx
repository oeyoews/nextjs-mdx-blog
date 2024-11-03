'use client';
import React from "react";

const Meteors = () => {
  const meteorCount = 20;

  const getRandomPosition = (max: number): string => `${Math.floor(Math.random() * max)}px`;
  const getRandomDelay = (): string => `${(Math.random() * 1 + 0.2).toFixed(2)}s`;
  const getRandomDuration = (): string => `${Math.floor(Math.random() * 8 + 2)}s`;

  // 生成流星元素的函数
  const createMeteorElements = () => {
    return Array.from({ length: meteorCount }).map((_, index) => (
      <div className="absolute" key={index}>
        <span
          className="pointer-events-none absolute left-1/2 top-1/2 rotate-[215deg] size-0.5 animate-meteor rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"
          style={{
            top: "-5px",
            left: getRandomPosition(window.innerWidth),
            animationDelay: getRandomDelay(),
            animationDuration: getRandomDuration(),
          }}
        >
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
        </span>
      </div>
    ));
  };

  return (
    <div className="absolute w-full h-screen overflow-hidden">
      {createMeteorElements()}
    </div>
  );
};

export default Meteors;
