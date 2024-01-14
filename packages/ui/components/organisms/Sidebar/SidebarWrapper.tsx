import type { Dispatch, JSX, ReactNode, SetStateAction } from 'react';

import Background from './Background';
import Sidebar from './Sidebar';

interface ISidebarWrapper {
  children: ReactNode;
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
}

function SidebarWrapper({
  children,
  isOpened,
  setIsOpened,
}: ISidebarWrapper): JSX.Element {
  return (
    <>
      <Background setIsOpened={setIsOpened} show={isOpened} />
      <Sidebar setIsOpened={setIsOpened} show={isOpened}>
        {children}
      </Sidebar>
    </>
  );
}

export default SidebarWrapper;
