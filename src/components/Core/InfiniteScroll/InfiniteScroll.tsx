import type { MutableRefObject, JSX } from 'react';
import { useEffect, useRef, ReactNode } from 'react';
import { throttle } from 'lodash';
import TopLineLoading from 'components/Loading/TopLineLoading';

interface IInfiniteScroll {
  children: ReactNode;
  loading: boolean;
  onLoadMore: () => void;
}

function InfiniteScroll({
  children,
  loading,
  onLoadMore,
}: IInfiniteScroll): JSX.Element | null {
  const ref: MutableRefObject<HTMLDivElement | null> = useRef(null);
  useEffect(() => {
    const scrollHandler = () => {
      if (!ref.current) {
        return;
      }
      const scrollPos = ref.current.scrollTop;
      const scrollBottom =
        ref.current.scrollHeight - ref.current.clientHeight - scrollPos;
      if (scrollBottom < 500) {
        onLoadMore();
      }
    };

    function debounceScroll() {
      // execute the last handleScroll function call, in every 100ms
      return throttle(scrollHandler, 100);
    }

    //@TODO add trottle lodash
    ref?.current?.addEventListener('scroll', debounceScroll());
    return () => {
      ref?.current?.removeEventListener('scroll', debounceScroll());
    };
  }, [onLoadMore]);

  if (loading) return <TopLineLoading />;
  const windowHeight = window.screen.height - 200;

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
