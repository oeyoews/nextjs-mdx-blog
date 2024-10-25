// @ts-nocheck
'use client';

import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { Route } from 'next';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useFullScreen } from '~lib/hooks/useFullScreen';

import clsx from 'clsx';
import config from '~config';

export default function Nav() {
  const LinkClass = 'size-5';
  const pathname = usePathname();

  const { isFullScreen } = useFullScreen();
  const router = useRouter();
  const routes: Route[] = config.links.map(({ path }) => path);

  /** @see https://twitter.com/asidorenko_/status/1700853315657965888 route group 也不错，但是这里使用手动判断路由 */
  const hasNav = routes.includes(pathname);

  return (
    <div
      className={clsx(
        'flex items-center justify-between print:hidden mb-8 sticky top-0 left-0 z-[1000] backdrop-blur-sm p-4 mx-auto px-2 md:px-16 w-full',
        (isFullScreen || !hasNav) && 'hidden'
      )}
    >
      <div className="space-x-4 hidden">
        <button
          onClick={() => router.back()}
          className={LinkClass}
          aria-label="back"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={() => router.forward()}
          className={LinkClass}
          aria-label="forward"
        >
          <FaArrowRight />
        </button>
      </div>

      <nav
        className={clsx(
          'mx-auto lg:mx-0 lg:ml-auto text-sm font-medium space-x-6 flex'
        )}
      >
        {config.links
          .filter((link) => {
            // @ts-ignore
            return !link.disable;
          })
          .map((link) => (
            <Link
              key={link.title}
              href={link.path}
              className={`flex items-center space-x-2 duration-300 transition`}
              aria-label={link.title}
            >
              {React.cloneElement(link.icon, { className: LinkClass  })}
            </Link>
          ))}
      </nav>
    </div>
  );
}
