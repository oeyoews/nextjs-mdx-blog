import { Divider } from '~components/ArticleComponents';
import Summary from '~components/Summary';
import TiddlersList from '~components/TiddlyWiki/TiddlersList';
import config from '~config';
import getTiddlerData from '~lib/getTiddlerData';

export const metadata = {
  title: 'online tiddlers',
  description: 'online tiddlers'
};

export default async function TiddlersHomepage({
  searchParams
}: {
  searchParams: { list: number };
}) {
  const { tiddlersMetadata } = await getTiddlerData(config.jsJson);

  return (
    <>
      <Summary
        text="此页面是 TiddlyWiki Starter Kit 的 所有 JavaScript tiddlers"
        header="JavaScript"
      />
      <TiddlersList tiddlers={tiddlersMetadata} route="/javascript" />
    </>
  );
}
