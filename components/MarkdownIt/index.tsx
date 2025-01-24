import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import MarkdownIt from 'markdown-it';
import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItGitHubAlerts from 'markdown-it-github-alerts';
import 'markdown-it-github-alerts/styles/github-base.css';
import 'markdown-it-github-alerts/styles/github-colors-dark-media.css';
import 'markdown-it-github-alerts/styles/github-colors-light.css';
// @ts-ignore
import MarkdownItCheckbox from 'markdown-it-task-lists';
// @ts-ignore
const MarkdownItPangu = require('markdown-it-pangu');
const MarkdownItToc = require('markdown-it-task-lists');
const MarkdownItAbbr = require('markdown-it-abbr');
const MarkdownItFootnote = require('markdown-it-footnote');
const MarkdownItContainer = require('markdown-it-container');
import config from '~config';
import { capitalize } from '~lib/captalize';
import dynamic from 'next/dynamic';
import { MermaidRender } from '~components/MermaidRender';

// TIPS: 如果不依赖于文件名字，可以借助 markdown-it-meta plugin, 其实主要代码都一致
// const MermaidScript = dynamic(() => import('~components/MermaidScript'), {
//   ssr: false
// });

const options = {
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  langPrefix: 'language-',
  // @ts-ignore
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="not-prose"><code class="hljs">' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>'
        );
      } catch (__) {}
    }
    return (
      '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>'
    );
  }
};

const containers = [
  { name: ['note', 'info', 'todo'], label: '💡' },
  { name: ['important'], label: '❌' },
  { name: ['success', 'tip', 'question'], label: '✅' },
  { name: ['warning', 'caution'], label: '⚠️' },
  { name: ['abstract', 'example', 'snippet', 'summary'], label: '📝' },
  { name: ['abstract'], label: '📝' },
  { name: ['see-also'], label: '🔥' }
];

function newContainer(label: string) {
  return {
    marker: ':',
    // @ts-ignore
    render: function (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        return (
          `<div class="flex justify-between rounded-sm p-6 text-base my-8 dark:bg-[#2d333b] bg-transparent border-[#d0d7de] dark:border-[#444c56] border border-solid overflow-auto">\n` +
          `<div class="flex items-center w-4 mr-4">${label}</div>` +
          `<div class="w-full">`
        );
      } else {
        return '</div>\n</div>\n';
      }
    }
  };
}

const md: MarkdownIt = new MarkdownIt(options)
  .use(MarkdownItGitHubAlerts)
  .use(MarkdownItCheckbox)
  .use(MarkdownItPangu)
  .use(MarkdownItAbbr)
  .use(MarkdownItFootnote)
  .use(MarkdownItContainer, 'spoiler')
  .use(MarkdownItAnchor, {
    level: 2,
    slugify: (string: string) => string,
    permalink: true,
    permalinkClass: 'anchor',
    permalinkSymbol: '',
    permalinkBefore: true
  });

containers.forEach((container) => {
  const { name, label } = container;
  const config = newContainer(label);
  name.forEach((name) => {
    md.use(MarkdownItContainer, name.toLowerCase(), config);
    md.use(MarkdownItContainer, name.toUpperCase(), config);
    md.use(MarkdownItContainer, capitalize(name.toLowerCase()), config);
  });
});

config.enableTOC &&
  md.use(MarkdownItToc, {
    slugify: (string: string) => string,
    includeLevel: [1, 2, 3],
    containerHeaderHtml: '<h2 class="">TOC</h2>',
    listType: 'ol',
    containerClass:
      'rounded-md p-2 fixed left-0 top-0 hidden md:block max-h-screen'
  });

const toc = `[[toc]]
`;

const MarkdownItRenderer = ({ content }: { content: string }) => {
  const renderedHtml = md.render(config.enableTOC ? toc + content : content);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />
      {/* 会有水合警告 */}
      {/* <MermaidRender /> */}
    </>
  );
};

export default MarkdownItRenderer;
