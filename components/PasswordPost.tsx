'use client';

import { ReactNode, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';

import type { Post } from '~lib/blog';
import useBlogStore from '~lib/store';

function PasswordProtectedContent({
  post,
  children
}: {
  post: Post;
  children: ReactNode;
}) {
  const [enteredPassword, setEnteredPassword] = useState('');

  const showContent = useBlogStore.use.showContent();
  const setShowContent = useBlogStore.use.setShowContent();

  const metadata = post.metadata;

  const handlePasswordSubmit = () => {
    if (metadata.password === enteredPassword) {
      setShowContent(true);
    } else {
      // alert('密码错误');
    }
  };

  return (
    <>
      {/* 如果其他文章输入密码，会影响 */}
      {!metadata.password && !metadata.draft && children}
      {metadata.draft && (
        <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl animate-pulse'>
          正在努力编写中 ...
        </div>
      )}
      {metadata.password && !showContent ? (
        <form
          className='justify-center p-1 rounded-md flex mx-2'
          autoComplete='off'
        >
          <label>
            <input
              type='password'
              className='border-none rounded-sm p-2 focus:outline-hidden mx-2'
              placeholder='password'
              autoFocus
              onChange={(e) => setEnteredPassword(e.target.value)}
            />
          </label>
          <button
            onClick={handlePasswordSubmit}
            className='hidden md:block mr-2'
          >
            <AiOutlineSend className='size-5' />
          </button>
        </form>
      ) : (
        <>{showContent && children}</>
      )}
    </>
  );
}

export default PasswordProtectedContent;
