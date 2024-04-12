import { type Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import clsx from 'clsx';
import { Article, Divider, H1 } from '~components/ArticleComponents';
import MarkdownItRenderer from '~components/MarkdownIt';
import config from '~config';
import formatTitle from '~lib/formatTitle';
import getTiddlerData from '~lib/getTiddlerData';
import Summary from '~components/Summary';

async function getTiddler(slug: string) {
  const { tiddlers } = await getTiddlerData(config.jsJson);
  return tiddlers.find((tiddler) => tiddler.slug === slug);
}

export async function generateMetadata({
  params
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = params;
  const tiddler = await getTiddler(slug);
  return {
    title: tiddler?.title,
    description: tiddler?.description
  };
}

export async function generateStaticParams() {
  const { tiddlers } = await getTiddlerData(config.journalJson);

  return tiddlers.map((tiddler) => ({
    slug: tiddler.slug
  }));
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = params;
  const tiddler = await getTiddler(slug);

  if (!tiddler) {
    notFound();
  }

  const { summary, title, text, 'page-cover': pageCover } = tiddler;

  return (
    <Article>
      {pageCover && (
        <Image
          src={pageCover}
          alt={title}
          width={1200}
          height={480}
          className={clsx(
            'rounded-xl object-cover object-center aspect-video h-48 shadow'
          )}
        />
      )}
      <H1>{formatTitle(title)}</H1>

      {summary && <Summary text={summary} />}
      <Divider />
      <MarkdownItRenderer content={text} />
    </Article>
  );
}
