import { useCallback, useEffect, useRef, useState } from 'react';
import type { FocusEvent, KeyboardEvent, MouseEvent, PointerEvent, TouchEvent, UIEvent, WheelEvent } from 'react';

type Options = {
  disabled: boolean;
  intervalMs?: number;
  itemCount: number;
  resetKey: string;
};

export default function useAutoScrollRail({ disabled, intervalMs = 4000, itemCount, resetKey }: Options) {
  const railRef = useRef<HTMLDivElement>(null);
  const resumeTimer = useRef<number | null>(null);
  const scrollFrame = useRef<number | null>(null);
  const hovering = useRef(false);
  const focused = useRef(false);
  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((requestedIndex: number, behavior: ScrollBehavior = 'smooth') => {
    const rail = railRef.current;
    if (!rail || itemCount < 1) return;

    const normalizedIndex = ((requestedIndex % itemCount) + itemCount) % itemCount;
    const items = rail.querySelectorAll<HTMLElement>('[data-rail-item]');
    const target = items[normalizedIndex];

    if (target) {
      rail.scrollTo({
        left: normalizedIndex === 0 ? 0 : target.offsetLeft - rail.offsetLeft,
        behavior,
      });
      setActiveIndex(normalizedIndex);
    }
  }, [itemCount]);

  const clearResumeTimer = useCallback(() => {
    if (resumeTimer.current !== null) {
      window.clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  }, []);

  const pause = useCallback(() => {
    clearResumeTimer();
    setPaused(true);
  }, [clearResumeTimer]);

  const resumeAfterInactivity = useCallback(() => {
    clearResumeTimer();
    resumeTimer.current = window.setTimeout(() => {
      if (!hovering.current && !focused.current) setPaused(false);
    }, 6000);
  }, [clearResumeTimer]);

  const selectIndex = useCallback((index: number) => {
    pause();
    scrollToIndex(index);
    resumeAfterInactivity();
  }, [pause, resumeAfterInactivity, scrollToIndex]);

  useEffect(() => () => {
    clearResumeTimer();
    if (scrollFrame.current !== null) window.cancelAnimationFrame(scrollFrame.current);
  }, [clearResumeTimer]);

  useEffect(() => {
    setActiveIndex(0);
    const frame = window.requestAnimationFrame(() => {
      railRef.current?.scrollTo({ left: 0, behavior: 'auto' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [resetKey]);

  useEffect(() => {
    const rail = railRef.current;
    if (disabled || paused || !rail || itemCount < 2) return;
    if (rail.scrollWidth <= rail.clientWidth + 4) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % itemCount;
        const items = rail.querySelectorAll<HTMLElement>('[data-rail-item]');
        const target = items[next];
        if (target) rail.scrollTo({ left: next === 0 ? 0 : target.offsetLeft - rail.offsetLeft, behavior: 'smooth' });

        return next;
      });
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [disabled, intervalMs, itemCount, paused, resetKey]);

  const bindings = {
    onMouseEnter: (_event: MouseEvent<HTMLDivElement>) => {
      hovering.current = true;
      pause();
    },
    onMouseLeave: (_event: MouseEvent<HTMLDivElement>) => {
      hovering.current = false;
      resumeAfterInactivity();
    },
    onFocus: (_event: FocusEvent<HTMLDivElement>) => {
      focused.current = true;
      pause();
    },
    onBlur: (event: FocusEvent<HTMLDivElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        focused.current = false;
        resumeAfterInactivity();
      }
    },
    onPointerDown: (_event: PointerEvent<HTMLDivElement>) => pause(),
    onPointerUp: (_event: PointerEvent<HTMLDivElement>) => resumeAfterInactivity(),
    onPointerCancel: (_event: PointerEvent<HTMLDivElement>) => resumeAfterInactivity(),
    onTouchStart: (_event: TouchEvent<HTMLDivElement>) => pause(),
    onTouchEnd: (_event: TouchEvent<HTMLDivElement>) => resumeAfterInactivity(),
    onWheel: (_event: WheelEvent<HTMLDivElement>) => {
      pause();
      resumeAfterInactivity();
    },
    onKeyDown: (_event: KeyboardEvent<HTMLDivElement>) => {
      pause();
      resumeAfterInactivity();
    },
    onScroll: (event: UIEvent<HTMLDivElement>) => {
      const rail = event.currentTarget;
      if (scrollFrame.current !== null) window.cancelAnimationFrame(scrollFrame.current);
      scrollFrame.current = window.requestAnimationFrame(() => {
        const items = rail.querySelectorAll<HTMLElement>('[data-rail-item]');
        let nearestIndex = 0;
        let nearestDistance = Number.POSITIVE_INFINITY;

        items.forEach((item, index) => {
          const distance = Math.abs(item.offsetLeft - rail.offsetLeft - rail.scrollLeft);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = index;
          }
        });

        setActiveIndex(nearestIndex);
      });
    },
  };

  return {
    activeIndex,
    bindings,
    railRef,
    selectIndex,
    next: () => selectIndex(activeIndex + 1),
    previous: () => selectIndex(activeIndex - 1),
  };
}
