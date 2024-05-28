/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";

export const useDebounce = (fn: any, delay = 500) => {
  const timeoutRef = useRef<number | undefined>(undefined);

  const debounceFn = (...args: any) => {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };
  return debounceFn;
};
