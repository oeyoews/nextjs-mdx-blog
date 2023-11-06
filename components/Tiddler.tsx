import Markdown from 'react-markdown';

import { Code } from 'bright';
// @ts-ignore
import remarkContainer from 'remark-custom-container';
import remarkEmoji from 'remark-emoji';

Code.lineNumbers = true;
Code.theme = 'one-dark-pro';

export default function Tiddler(tiddler: Tiddler) {
  const components = {
    pre: ({
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
    },
  };

  const { title, text, tags, creator, created } = tiddler;

  const formattedDate =
    created?.substring(0, 4) +
    '-' +
    created?.substring(4, 6) +
    '-' +
    created?.substring(6, 8);
  return (
    <>
      <div className="prose prose-indigo max-w-none mb-8">
        <h1 className="my-4 truncate capitalize text-balance">
          {title.replace(/-/g, ' ')}
        </h1>
        <div className="not-prose flex justify-center space-x-2 text-gray-800 font-mono">
          <div className="rounded px-1 bg-rose-50">{creator}</div>
          {tags && <div className="rounded px-1 bg-yellow-100 ">{tags}</div>}
          <div className="rounded px-1 bg-indigo-200">{formattedDate}</div>
        </div>

        <Markdown
          // @ts-ignore
          // container not work, be hidden
          remarkPlugins={[
            [remarkContainer, { className: 'warning' }],
            remarkEmoji,
          ]} // gfm table will cause error
          skipHtml={false}
          components={components}
        >
          {text}
        </Markdown>
      </div>
    </>
  );
}
