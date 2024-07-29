import { FaHouse } from 'react-icons/fa6';
import { TfiThought } from 'react-icons/tfi';
import { IoJournalOutline } from 'react-icons/io5';
import { SiTiddlywiki } from 'react-icons/si';
import { TbArticle } from 'react-icons/tb';
import { RiJavascriptFill } from 'react-icons/ri';
import { ReactElement } from 'react';

const testFile = 'http://localhost:3000/tiddlers.json';

// 检查是否为路径
type IsPath<T> = T extends `/${string}` ? T : never;

interface IRouteItem<T> {
  title: string;
  path: IsPath<T>;
  icon: ReactElement;
  disable?: boolean;
}

function defineRoutes<T extends string>(routes: IRouteItem<T>[]): IRouteItem<T>[] {
  return  routes
}

// TODO: disable type is missing with as const
const routes = defineRoutes([
  {
    title: 'Home',
    path: '/',
    icon: <FaHouse />
  },
  {
    title: 'Blog',
    path: '/blog',
    icon: <TbArticle />
  },
  {
    title: 'JavaScript',
    path: '/javascript',
    icon: <RiJavascriptFill />
  },
  {
    title: 'journal',
    path: '/journal',
    disable: true,
    icon: <IoJournalOutline />
  },
  {
    title: 'tiddlers',
    path: '/tiddlers',
    disable: true,
    icon: <SiTiddlywiki />
  },
  {
    title: 'issues',
    path: '/issue',
    icon: <TfiThought />
  },
])

const config = {
  emptyTip: '这里空空如也 !',
  steps: 10 as const,
  title: 'Blog with me',
  content: 'content', // mdx directory
  jsJson:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/javascript.json'
      : 'https://neotw.vercel.app/javascript.json',
  journalJson:
    process.env.NODE_ENV === 'development'
      ? testFile
      : 'https://neotw.vercel.app/journal.json',
  json:
    process.env.NODE_ENV === 'development'
      ? testFile
      : 'https://neotw.vercel.app/tiddlers.json', // tiddler file
  githubRepo: 'oeyoews/neotw-tiddlers', // issue repo
  description: 'Nextjs + TypeScript + Tailwindcss + MDX',
  domain: 'https://nextjs-mdx-blog-tailwindcss.vercel.app',
  enableTOC: false, // WIP // issue comment not need this toc
  md5Length: 8,
  projects: 'https://raw.githubusercontent.com/oeyoews/oeyoews/main/README.md',
  links: routes,
  sections: [
    {
      name: 'mdx',
      link: 'https://github.com/oeyoews/nextjs-mdx-blog/tree/oeyoews/content',
      icon: 'vscode-icons:file-type-light-mdx'
    },
    {
      name: 'tiddlers',
      link: 'https://github.com/oeyoews/neotw-tiddlers',
      icon: 'simple-icons:tiddlywiki'
    },
    {
      name: 'issues',
      link: 'https://github.com/oeyoews/neotw-tiddlers/issues?q=is%3Aissue+is%3Aclosed',
      icon: 'octicon:issue-opened-16'
    }
  ]
};

export type IRoute = (typeof routes)[number]['path'];

export default config;
