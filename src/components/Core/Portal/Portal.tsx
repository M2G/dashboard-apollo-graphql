import type { ReactNode, ReactPortal } from 'react';
import {
  memo, useEffect, useRef, useState,
} from 'react';
import { createPortal } from 'react-dom';
import {
  oneOfType, func, element, string,
} from 'prop-types';

interface IPortal {
  readonly id?: string;
  readonly children: ReactNode;
}

const Portal = ({ id, children }: IPortal): ReactPortal | null => {
  const el = useRef(id ? document.getElementById(id) : document.createElement('div'));
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
  }, [id]);
  return el?.current && createPortal(children, el.current);
};

Portal.propTypes = {
  children: oneOfType([
    func, element,
  ]).isRequired,
  id: string,
};

export default memo(Portal);
