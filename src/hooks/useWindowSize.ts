import { useLayoutEffect, useState } from 'react';

function useWindowSize() {
  const [size, setSize] = useState({
    height: null,
    width: null,
  });

  useLayoutEffect(() => {
    const handleResize = () => {
      setSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
}

export default useWindowSize;
