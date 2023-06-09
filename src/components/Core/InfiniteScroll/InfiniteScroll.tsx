import type { MutableRefObject, JSX, ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { throttle } from 'lodash';
import TopLineLoading from 'components/Loading/TopLineLoading';

interface IInfiniteScroll {
  children: ReactNode;
  loading: boolean;
  onLoadMore: () => void;
  hasMore?: boolean | null;
}

function InfiniteScroll({
  children,
  loading,
  onLoadMore,
  hasMore,
}: IInfiniteScroll): JSX.Element | null {
  const ref: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const isMounted = useRef(true);
  useEffect(() => {
    const scrollHandler = () => {
      if (!ref.current) {
        return;
      }

      if (
        ref.current.scrollTop + ref.current.clientHeight >=
        ref.current.scrollHeight
      ) {
        if (hasMore && isMounted.current) {
          return onLoadMore();
        }

        isMounted.current = false;
      }
    };
    function debounceScroll() {
      // execute the last handleScroll function call, in every 100ms
      return throttle(scrollHandler, 100);
    }

    ref?.current?.addEventListener('scroll', debounceScroll());
    return () => {
      ref?.current?.removeEventListener('scroll', debounceScroll());
    };
  }, [hasMore, onLoadMore]);

  if (loading) return <TopLineLoading />;
  const windowHeight = window.screen.height - 500;

  return (
    <div
      ref={ref}
      style={{
        height: windowHeight,
        overflowX: 'hidden',
        overflowY: 'scroll',
        paddingBottom: '500px',
      }}
    >
      {children}
      {loading && <h2>Loading...</h2>}
    </div>
  );
}

export default InfiniteScroll;
