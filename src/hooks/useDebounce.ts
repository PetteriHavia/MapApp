import { useState, useEffect } from "react";

const useDebounce = (fn: () => void, delay: number) => {
  const [isDebounced, setIsDebounced] = useState<boolean>(false);

  useEffect(() => {
    let timerId: number;

    if (isDebounced) {
      timerId = setTimeout(() => {
        fn();
        setIsDebounced(false);
      }, delay);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [fn, delay, isDebounced]);

  const debouncedFn = () => {
    if (!isDebounced) {
      setIsDebounced(true);
    }
  };
  return debouncedFn;
};

export default useDebounce;
