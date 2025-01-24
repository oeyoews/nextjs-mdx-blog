import React, { ReactNode } from 'react';
import md5 from 'md5';
import { MermaidRender } from './MermaidRender';
import {
  GoLightBulb,
  GoAlert,
  GoInfo,
  GoStop,
  GoDiscussionClosed
} from 'react-icons/go';

import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

import Projects from './Projects';

import { Code } from 'bright';
import Icon from '~components/Icon';

Code.lineNumbers = false;
// TODO: not support prefers-color-scheme
Code.theme = {
  dark: 'one-dark-pro',
  light: 'github-light'
};

type bqtypes = 'tip' | 'warning' | 'note' | 'causion' | 'important';

const calloutTypes: Record<bqtypes, { icon: any; className?: string }> = {
  tip: { icon: <GoLightBulb />, className: 'fill-green-500' },
  warning: { icon: <GoAlert />, className: 'fill-yellow-400' },
  note: { icon: <GoInfo />, className: 'fill-sky-400' },
  causion: { icon: <GoStop />, className: 'fill-red-400' },
  important: {
    icon: <GoDiscussionClosed />,
    className: 'fill-purple-400'
  }
};

const Callout = ({
  children,
  type
}: {
  children: ReactNode;
  type: bqtypes;
}) => {
  return (
    <div className="flex justify-between rounded-sm p-2 text-base my-8 dark:bg-[#2d333b] bg-transparent border-[#d0d7de] dark:border-[#444c56] border border-solid overflow-auto dark:text-[#cdd9e5]">
      <div className="flex items-center w-4 mr-4">
        {React.cloneElement(calloutTypes[type].icon, {
          className: calloutTypes[type].className + ' size-5'
        })}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

const createHeading =
  (level: number) =>
  // eslint-disable-next-line react/display-name
  ({ children }: any) => {
    let slug = md5(children).slice(0, 9);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor'
        })
      ],
      children
    );
  };

const CustomLink = (props: any) => {
  let href = props.href;

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const Pre = ({
  children,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLPreElement
>) => {
  return (
    <Code {...props} className="not-prose">
      {children}
    </Code>
  );
};

const TwPlugin = ({
  name,
  author = 'oeyoews'
}: {
  name: string;
  author: string;
}) => {
  const plugin = `$:/plugins/${author}/${name}`;
  return (
    <a
      href={`https://tiddlywiki-starter-kit.vercel.app/#${encodeURIComponent(
        plugin
      )}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {name}
    </a>
  );
};

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  a: CustomLink,
  Icon,
  pre: Pre,
  Projects,
  TwPlugin,
  Callout
  // MermaidRender
};

const MDX = ({ source }: { source: any }) => {
  // @ts-ignore
  return <MDXRemote components={components} source={source} />;
};

export default MDX;
