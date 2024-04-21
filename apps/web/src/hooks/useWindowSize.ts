import { useLayoutEffect, useState } from 'react';

function useWindowSize() {
  const [size, setSize] = useState({
    height: 0,
    width: 0,
  });

  useLayoutEffect(() => {
    function handleResize(): void {
      setSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
}

export default useWindowSize;
