import { useLayoutEffect, useState } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useLayoutEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addListener(listener);

    return () => media.removeListener(listener);
  }, [query]);

  return matches;
};

export const useMobile = () => useMediaQuery('(max-width: 768px)');
export const useTablet = () => useMediaQuery('(max-width: 1024px)');
export const useDesktop = () => useMediaQuery('(min-width: 1024px)');

export default useMediaQuery;
