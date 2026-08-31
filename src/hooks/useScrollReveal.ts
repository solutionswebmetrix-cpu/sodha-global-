import { useEffect, useRef, useState } from 'react';

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; rootMargin?: string }
) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? '0px 0px -50px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold, options?.rootMargin]);

  return { ref, isVisible };
}
