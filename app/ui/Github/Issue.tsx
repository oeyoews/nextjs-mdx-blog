import Link from 'next/link';

import { format } from 'date-fns';
import formatTitle from '~app/lib/formatTitle';
import IssueComponent from '~app/ui/Github/IssueComponent';

export default async function Issue({ issue }: { issue: Issue }) {
  const { title, created_at, body, html_url } = issue;
  const date = format(new Date(created_at), 'yyyy-MM-dd');

  return (
    <div className="prose prose-indigo max-w-none mb-8">
      <Link href={html_url} target="_blank">
        <h1 className="my-8 capitalize text-balance">{formatTitle(title)}</h1>
      </Link>
      <div className="not-prose flex justify-center space-x-2 text-gray-800 font-mono">
        <div className="rounded px-1 bg-indigo-200">{date}</div>
      </div>
      <IssueComponent text={body} />
    </div>
  );
}
