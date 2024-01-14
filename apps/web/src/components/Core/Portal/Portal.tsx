import type { ReactNode, ReactPortal } from 'react';

import { memo, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface IPortal {
  readonly children: ReactNode;
  readonly id?: string | undefined;
}

function Portal({ children, id }: IPortal): ReactPortal | null {
  const el = useRef(
    document.getElementById(id as any) ?? document.createElement('div'),
  );
  const [dynamic] = useState(!el?.current?.parentElement);
  useEffect(() => {
    if (dynamic) {
      if (id && el?.current) {
        el.current.id = id;
      }

      document.body.appendChild(el.current as any);
    }
    return () => {
      if (dynamic && el?.current?.parentElement) {
        el.current.parentElement.removeChild(el.current);
      }
    };
  }, [dynamic, id]);
  return el?.current && createPortal(children, el.current);
}

export default memo(Portal);
