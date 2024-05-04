import type { DebouncedFunc } from 'lodash';
import type { JSX, MutableRefObject, ReactNode } from 'react';

import { useWindowSize } from '@/hooks';

import { throttle } from 'lodash';
import { useEffect, useMemo, useRef } from 'react';

interface IInfiniteScroll {
  children: ReactNode;
  hasMore: boolean | null;
  loading: boolean;
  onLoadMore: () => void;
}

const LIMIT_SCROLL = 200;
const WAIT = 500;

function InfiniteScroll({
  children,
  hasMore,
  loading,
  onLoadMore,
}: IInfiniteScroll): JSX.Element | null {
  const ref: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const isMounted: MutableRefObject<boolean> = useRef(true);

  useEffect(() => {
    function scrollHandler(): undefined | void {
      if (!ref.current) {
        return;
      }

      const { clientHeight, scrollHeight, scrollTop } = ref.current;

      if (scrollTop + clientHeight === scrollHeight) {
        // Fix for the issue where the scroll event is triggered multiple times
        if (hasMore && isMounted.current) {
          onLoadMore();
          return;
        }

        isMounted.current = false;
      }
    }
    function debounceScroll(): DebouncedFunc<typeof scrollHandler> {
      // execute the last handleScroll function call, in every 500ms
      return throttle(scrollHandler, WAIT);
    }

    ref?.current?.addEventListener('scroll', debounceScroll());
    return () => {
      ref?.current?.removeEventListener('scroll', debounceScroll());
    };
  }, [hasMore, onLoadMore, loading]);

  const size = useWindowSize();

  const windowHeight = useMemo(() => size.height - LIMIT_SCROLL, [size.height]);

  return (
    <div
      className={`overflow-x-hidden overflow-y-scroll pb-[750px] h-[${windowHeight}px]`}
      data-testid="infinite-scroll"
      ref={ref}
      style={{ height: `${windowHeight}px` }}>
      {children}
    </div>
  );
}

export default InfiniteScroll;
