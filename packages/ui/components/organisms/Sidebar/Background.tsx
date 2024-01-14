import type { Dispatch, SetStateAction } from 'react';

import clsx from 'clsx';

interface IBackground {
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  show: boolean;
}

function Background({ setIsOpened, show }: IBackground): JSX.Element {
  return (
    <div
      className={clsx(
        'invisible fixed left-0 top-0 z-[100] h-full w-full bg-[rgba(0,0,0,0.5)] opacity-0 transition-opacity delay-[0ms] duration-[225ms] ease-in-out',
        show ? 'visible opacity-100' : '',
      )}
      aria-hidden="true"
      onClick={() => setIsOpened(false)}
    />
  );
}

export default Background;
