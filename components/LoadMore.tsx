'use client';

import { FaArrowDown } from 'react-icons/fa';
import Timeline from './Timeline';
import useList from '~lib/hooks/useList';
import { useEffect } from 'react';
import { throttle } from '~lib/utils/throttle';

export default function LoadMore({ data }: { data: any[] }) {
  const { list, handleLoadItems } = useList();

  useEffect(() => {
    return;
    if (data.length < list) {
      return;
    }
    let rafId: number;
    // 添加滚动到底部的事件监听器
    const handleScroll = throttle(() => {
      cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        // 判断是否滚动到底部
        if (documentHeight - scrollTop - windowHeight < 100) {
          requestAnimationFrame(handleLoadItems); // BUG:不要一直更新
        }
      });
    }, 100);

    // 在组件加载时添加事件监听器
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }

    // 在组件卸载时移除事件监听器
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
      cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  if (data.length <= list) {
    return (
      <Timeline.Li>
        <button className="text-sm font-medium rounded-sm px-2 font-mono py-1 text-gray-400 hover:text-gray-300 transition-all">
          到底啦
        </button>
      </Timeline.Li>
    );
  }

  return (
    <Timeline.Li>
      <button
        onClick={handleLoadItems}
        className="text-sm font-medium rounded-sm px-2 font-mono py-1 text-gray-400 hover:text-gray-300 transition-all"
      >
        <FaArrowDown className="w-3" /> 加载更多文章
      </button>
    </Timeline.Li>
  );
}
