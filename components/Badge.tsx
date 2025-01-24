import clsx from 'clsx';

export default function Badge({
  text,
  className
}: {
  text: string;
  className?: string;
}) {
  return (
    <sup
      className={clsx(
        'rounded-xs text-xs px-1 mx-1 font-light inline-flex text-black dark:text-white',
        className
      )}
    >
      {text}
    </sup>
  );
}
