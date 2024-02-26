import { SiTiddlywiki } from 'react-icons/si';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import Link from 'next/link';

// ui: https://lutaonan.com/
const Page = () => {
  return (
    <div className="lg:flex">
      {/* <div className="text-center sm:px-48 lg:my-24 py-24"> */}
      <div className="text-center mx-20 lg:my-20">
        <div className="sticky top-5 flex flex-col gap-4">
          <div
            className="size-32 bg-cover bg-center rounded-full inline-block mx-auto"
            style={{
              backgroundImage: 'url(/oeyoews.jpeg)'
            }}
          ></div>
          <div>
            <h1 className="font-bold text-2xl">oeyoews</h1>
          </div>
          <div className="flex gap-4 justify-center">
            <a target="_blank" href="https://twitter.com/oeyoews">
              <FaTwitter className="size-5" />
            </a>
            <a target="_blank" href="https://github.com/oeyoews">
              <FaGithub className="size-5" />
            </a>
            <a target="_blank" href="https://neotw.vercel.app">
              <SiTiddlywiki className="size-5" />
            </a>
            <a target="_blank" href="mailto:jyao4783@gmail.com">
              <MdOutlineMarkEmailUnread className="size-5" />
            </a>
          </div>
          <div className="text-slate-500 text-sm my-4">Blog Since 2023</div>
        </div>
      </div>
      {/* right */}
      <div className="lg:my-20 mx-6">
        <div>
          <div className="mx-auto text-sm">
            <div>
              <h2 className="font-bold my-4 text-md">Projects / 项目</h2>
              <Link href={'/blog/46f86faa'}>项目</Link>
            </div>
            <h2 className="font-bold my-4 text-md">Articles / 文章</h2>
            <div>
              <Link href={'/blog'}>文章</Link>
            </div>
            <h2 className="font-bold my-4 text-md">ABOUT / 关于我</h2>
            <div className="text-gray-400">
              这个人很懒，什么也没留下 (coming ...)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
