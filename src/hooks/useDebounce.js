import { useState, useLayoutEffect } from 'react';

/**
 * debouncer to delay state update.
 *
 * @param {any} value - initial state value
 * @param {number} [delay] - debounce value to delay state update, by default 1000
 */
const useDebounce = (value, delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useLayoutEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // .. within the delay period if state gets update -> Timeout gets cleared and restarted
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
};

export default useDebounce;
