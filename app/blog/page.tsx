'use server';

import BlogList from '~components/Blog/BlogList';
import EmptyTip from '~components/EmptyTip';
import Summary from '~components/Summary';
import { getBlogPosts } from '~lib/blog';

const HomePage = () => {
  const posts = getBlogPosts();
  const slug = posts[0]?.slug;
  console.log(slug);

  if (!posts.length) {
    return <EmptyTip />;
  }

  return (
    <>
      <Summary
        text="个人博客, 记录一下, 信马由缰，随心所欲式写法"
        header="博客"
      />
      <BlogList data={posts} route="/blog" />;
    </>
  );
};

export default HomePage;
