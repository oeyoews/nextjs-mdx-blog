import { FcFolder, FcOpenedFolder } from 'react-icons/fc';

import Link from 'next/link';

import { allPosts } from 'contentlayer/generated';
import { format } from 'date-fns';

export default function HomePage() {
  if (allPosts.length === 0) {
    return (
      <div className="prose">
        <h1 className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          当前文章数目为零
        </h1>
      </div>
    );
  }

  return (
    <ol className="prose relative list-none border-l border-gray-200 border-dotted">
      {allPosts
        .sort((a, b) => {
          return a.date > b.date ? -1 : 1;
        })
        .map((post) => (
          <article key={post._id}>
            <li className="ml-6 group">
              <Link
                href={post.slug}
                className="text-xs rounded-md"
                title="Click To Read More"
              >
                <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 bg-white">
                  <FcFolder className="group-hover:hidden group-hover:scale-0 h-4 w-4 text-gray-400 duration-300 transition-all group-hover:stroke-indigo-500" />
                  <FcOpenedFolder className="hidden group-hover:block scale-0 group-hover:scale-100 h-4 w-4 text-gray-400 duration-300 transition-all group-hover:stroke-indigo-500" />
                </span>
                <h2 className="text-neutral-700 hover:text-neutral-950 duration-300 transition">
                  {post.title}
                </h2>
                <time className="block text-sm font-normal leading-none text-gray-400 ">
                  {format(new Date(post.date), 'MMMM d, yyyy')}
                </time>
              </Link>
            </li>
          </article>
        ))}
    </ol>
  );
}
