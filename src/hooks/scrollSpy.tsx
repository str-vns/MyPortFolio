import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[]) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: `-50% 0px -50% 0px`,
      threshold: 0,
    };

    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setActiveId(id);
        }
      }, observerOptions);

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [ids]);

  return activeId;
}