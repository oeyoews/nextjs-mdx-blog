'use server';

import BlogList from '~components/Blog/BlogList';
import EmptyTip from '~components/EmptyTip';
import { getBlogPosts } from '~lib/blog';

const HomePage = () => {
  const posts = getBlogPosts();
  const slug = posts[0]?.slug;
  console.log(slug);

  if (!posts.length) {
    return <EmptyTip />;
  }

  return <BlogList data={posts} route="/blog" />;
};

export default HomePage;
