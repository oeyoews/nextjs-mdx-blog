import clsx from 'clsx';

export default function Li({ children, order }: ChildrenSubProps) {
  return (
    <div
      className={clsx(
        'flex flex-col justify-between rounded-sm p-4 text-base my-8 dark:bg-[#2d333b] hover:shadow-xs bg-transparent border-[#d0d7de] dark:border-[#444c56] border hover:outline outline-[#d0d7de] hover:outline-1 dark:outline-[#444c56] border-solid overflow-auto'
        // {
        //   'border-transparent': order === 'end'
        // }
      )}
    >
      {children}
    </div>
  );
}
