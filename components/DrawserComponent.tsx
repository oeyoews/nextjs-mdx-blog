'use client';

import { FaCommentDots } from 'react-icons/fa';

import { Drawer } from 'vaul';

export default function DrawserComponent({
  children,
  text
}: {
  children: React.ReactNode;
  text: React.ReactNode;
}) {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <div className='flex justify-end items-center'>
          <button className='rounded-sm px-2 py-1 mx-2 bg-zinc-200 dark:bg-transparent'>
            <FaCommentDots className='text-zinc-500 mx-2' />
            {text}
          </button>
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 bg-black/40 backdrop-blur-lg z-9999 cursor-pointer' />
        <Drawer.Content className='flex flex-col rounded-t-[10px] h-[80%] mt-24 fixed bottom-0 inset-x-0 z-99999'>
          <div className='p-4 prose max-w-none bg-white dark:bg-black dark:prose-invert rounded-t-[10px] flex-1 overflow-auto'>
            <div className='sticky top-0 mx-auto backdrop-blur-md overflow-auto w-12 h-1.5 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-700 mb-8 cursor-pointer hover:scale-125 transition-all' />
            <div className='mx-auto w-full md:max-w-2xl overflow-hidden'>
              {children}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
