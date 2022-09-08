import { useEffect } from 'react';

export const useComponentDidMount = (fn: Parameters<typeof useEffect>[0]) => {
  useEffect(fn, []);
};
