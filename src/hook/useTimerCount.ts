import { useEffect, useRef, useState } from "react";

const ONE_SECOND = 1000;

const useTimerCount = () => {
  const [timerCount, setTimerCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const startTimer = (initialTimerCount: number, onTimerEnd: () => void) => {
    setTimerCount(initialTimerCount);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setTimerCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(intervalRef.current);
          onTimerEnd();
          return 0;
        } else {
          return prevCount - 1;
        }
      });
    }, ONE_SECOND);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return [timerCount, startTimer];
};

export default useTimerCount;
