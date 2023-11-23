'use client';

import { ReactElement, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';

import useStore from '~lib/store';

function PasswordProtectedContent({
  post,
  children,
}: {
  post: any;
  children: ReactElement;
}) {
  const [enteredPassword, setEnteredPassword] = useState('');

  const passwordStore = useStore();
  const metadata = post.metadata;

  const handlePasswordSubmit = () => {
    if (post.password === enteredPassword) {
      passwordStore.setShowContent(true);
    } else {
      // alert('密码错误');
    }
  };

  return (
    <div>
      {!metadata.password && !metadata.draft && children}
      {metadata.draft && (
        <div className="prose">
          <small className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            正在努力编写中 ...
          </small>
        </div>
      )}
      {metadata.password && !passwordStore.showContent ? (
        <form
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-1 rounded-md flex mx-2"
          autoComplete="off"
        >
          <label>
            <input
              type="password"
              className="bg-gray-100 border-none rounded p-2 focus:outline-none mx-2"
              placeholder="password"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
            />
          </label>
          <button
            onClick={handlePasswordSubmit}
            className="hidden lg:block mr-2"
          >
            <AiOutlineSend className="h-5 w-5 text-gray-400 duration-300 transition-all" />
          </button>
        </form>
      ) : (
        <div>
          {/* Content of the article */}
          {passwordStore.showContent && children}
        </div>
      )}
    </div>
  );
}

export default PasswordProtectedContent;
