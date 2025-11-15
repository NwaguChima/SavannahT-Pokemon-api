import { useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export const useInfiniteScroll = ({
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: UseInfiniteScrollOptions) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        onLoadMore();
      }
    },
    [onLoadMore, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = observerTarget.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.5,
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [handleObserver]);

  return { observerTarget };
};
