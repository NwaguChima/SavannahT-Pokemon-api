import { useEffect } from 'react';

interface UsePreventDocumentScrollProps {
  isOpen: boolean;
}

// NOTE: This will normally not be needed, but I wanted to avoid downloading libraries into the project as much as possible
export const usePreventDocumentScroll = ({
  isOpen,
}: UsePreventDocumentScrollProps) => {
  useEffect(() => {
    if (isOpen) {
      // Store original overflow value
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;

      // Get scrollbar width to prevent layout shift
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // Prevent scrolling
      document.body.style.overflow = 'hidden';

      // Add padding to compensate for scrollbar disappearance
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      // Cleanup function to restore original values
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isOpen]);
};
