import type { Key, MutableRefObject, JSX } from 'react';
import { useEffect, useRef } from 'react';

// import NewsCard from './NewsCard';

function InfiniteScroll({
  children,
  loading,
  onLoadMore,
}: any): JSX.Element | null {
  const ref: MutableRefObject<HTMLDivElement | null> = useRef(null);
  useEffect(() => {
    const scrollHandler = () => {
      if (!ref.current) {
        return;
      }
      const scrollPos = ref.current.scrollTop;
      const scrollBottom =
        ref.current.scrollHeight - ref.current.clientHeight - scrollPos;
      if (scrollBottom < 100) {
        onLoadMore();
      }
    };

    ref?.current?.addEventListener('scroll', scrollHandler);
    return () => {
      ref?.current?.removeEventListener('scroll', scrollHandler);
    };
  }, [onLoadMore]);

  /* componentDidMount() {
    this.refs.iScroll.addEventListener('scroll', this.handleOnScroll);
  }

  componentWillUnmount() {
    this.refs.iScroll.removeEventListener('scroll', this.handleOnScroll);
  }

  handleOnScroll = () => {
    if (
      this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=
      this.refs.iScroll.scrollHeight
    ) {
      this.props.onLoadMore();
    }
  }; */

  if (loading) return <p>Loading....</p>;
  const windowHeight = window.screen.height - 200;

  return (
    <div
      ref={ref}
      style={{
        height: windowHeight,
        overflowX: 'hidden',
        overflowY: 'scroll',
        paddingBottom: '100px',
      }}
    >
      {children}
      {loading && <h2>Loading...</h2>}
    </div>
  );
}

export default InfiniteScroll;
