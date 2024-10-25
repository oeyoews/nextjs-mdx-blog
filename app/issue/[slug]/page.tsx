import { type Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { Article, Divider, H1 } from '~components/ArticleComponents';
import DrawserComponent from '~components/DrawserComponent';
import EmptyTip from '~components/EmptyTip';
import MarkdownItRenderer from '~components/MarkdownIt';
import formatTitle from '~lib/formatTitle';
import {
  getAllIssues,
  getIssueBySlug,
  getIssueComments
} from '~lib/issues/getIssues';

export const revalidate = 60;

export async function generateStaticParams() {
  const issues = await getAllIssues();
  return issues.map((issue) => ({ slug: issue.slug }));
}

export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;
  const issue = await getIssueBySlug(slug);
  return {
    title: issue?.title
  };
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const issue = await getIssueBySlug(params.slug);
  const comments = await getIssueComments(issue?.number as number);

  if (!issue) {
    return notFound();
  }

  return (
    <Article>
      <H1>{formatTitle(issue.title)}</H1>
      <Divider />
      {issue.body ? <MarkdownItRenderer content={issue.body} /> : <EmptyTip />}
      {comments.length > 0 && (
        <DrawserComponent text='Comments' key={issue.id}>
          {comments.map(({ body, id, user }) => (
            <>
              <div className='flex items-center justify-start space-x-2'>
                <div className='text-zinc-400 dark:text-zinc-500'>
                  {user.login}
                </div>
                <div>
                  <Image
                    unoptimized
                    src={user.avatar_url}
                    alt={user.login}
                    width={16}
                    height={16}
                    className='rounded-full dark:outline-white outline outline-1 ml-1'
                  />
                </div>
              </div>
              <MarkdownItRenderer content={body!} />
              <Divider thickness={0} />
            </>
          ))}
        </DrawserComponent>
      )}
    </Article>
  );
}
