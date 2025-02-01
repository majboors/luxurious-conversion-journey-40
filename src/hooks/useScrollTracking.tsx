import { useEffect, useCallback } from 'react';
import { handleAction } from '@/utils/actionHandler';

export const useScrollTracking = (elementId: string) => {
  const handleScroll = useCallback(async (e: Event) => {
    const element = e.target as HTMLElement;
    const direction = element.scrollTop > (element as any).lastScrollTop ? 'down' : 'up';
    (element as any).lastScrollTop = element.scrollTop;

    await handleAction('swipe', { direction });
  }, []);

  useEffect(() => {
    const element = document.getElementById(elementId);
    if (element) {
      (element as any).lastScrollTop = 0;
      element.addEventListener('scroll', handleScroll);
      return () => element.removeEventListener('scroll', handleScroll);
    }
  }, [elementId, handleScroll]);
};