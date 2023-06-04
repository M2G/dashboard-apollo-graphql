import type { MutableRefObject, JSX } from 'react';
import { useEffect, useRef, ReactNode } from 'react';

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

    ref?.current?.addEventListener('scroll', scrollHandler);
    return () => {
      ref?.current?.removeEventListener('scroll', scrollHandler);
    };
  }, [onLoadMore]);

  if (loading) return <p>Loading....</p>;
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
