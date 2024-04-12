import { Suspense } from 'react';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Article, Divider, H1 } from '~components/ArticleComponents';
import EmptyTip from '~components/EmptyTip';
import MarkdownItRenderer from '~components/MarkdownIt';
import MDX from '~components/Mdx';
import PasswordProtectedContent from '~components/PasswordPost';
import Spinner from '~components/Spinner';
import { getBlogPosts, getPostFromParams } from '~lib/blog';
import Summary from '~components/Summary';

export const generateMetadata = ({ params }: { params: Params }): Metadata => {
  const post = getPostFromParams(params.slug);
  return {
    title: post?.metadata.title
  };
};

export const generateStaticParams = () => {
  const posts = getBlogPosts();
  return posts.map((posts) => ({ slug: posts.slug }));
};

const PostPage = ({ params }: { params: Params }) => {
  const post = getPostFromParams(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <PasswordProtectedContent post={post}>
      <Article>
        <H1>{post.metadata.title}</H1>
        {post.metadata.summary && <Summary text={post.metadata.summary!} />}
        <Divider />
        {post.content ? (
          <Suspense fallback={<Spinner center />}>
            {post.type === 'md' ? (
              <>
                <MarkdownItRenderer content={post.content} />
              </>
            ) : (
              <MDX source={post.content} />
            )}
          </Suspense>
        ) : (
          <EmptyTip />
        )}
      </Article>
    </PasswordProtectedContent>
  );
};

export default PostPage;
