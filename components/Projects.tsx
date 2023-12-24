import { Article } from './ArticleComponents';
import MarkdownItRenderer from './MarkdownIt';

import config from '~config';

export default async function Projects() {
  if (process.env.NODE_ENV === 'development') return <>本地不可见</>;
  const res = await fetch(config.projects);
  const data = await res.text();

  return (
    <Article>
      <MarkdownItRenderer content={data} />
    </Article>
  );
}
