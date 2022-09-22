import { useEffect, useState } from 'react';

const useComponentDidMount = (fn: Parameters<typeof useEffect>[0]) => {
  useEffect(fn, []);
};

export const useWindowResizer = () => {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useComponentDidMount(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return dimensions;
};
