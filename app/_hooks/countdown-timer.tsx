import { useEffect, useRef, useState } from "react";

const miliSecToMinute = 1000 * 60;

export default function useCountdownTimer(
  endDateTime: Date,
  onTimeEnd?: () => void,
) {
  const minuteIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const secondIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const latestCurrentTime = new Date().getTime();
  const timeLeftInMins = Math.floor(
    (endDateTime.getTime() - latestCurrentTime) / miliSecToMinute,
  );

  //countdown states
  const [isMainCountdownDone, setIsMainCountdownDone] = useState(false);
  const [minutesLeft, setMinutesLeft] = useState(timeLeftInMins);
  const [secondsLeft, setSecondsLeft] = useState(60);

  //set countdown timer for minutes left
  useEffect(() => {
    if (!isMainCountdownDone && minutesLeft > 0) {
      minuteIntervalRef.current = setInterval(
        () =>
          setMinutesLeft((prev) => {
            if (prev <= 1) {
              //Change this logic to `prev < 1 ` to shave 1 minute off time. Currently it ends at endtime + 1 mins
              clearInterval(minuteIntervalRef.current!);
              setIsMainCountdownDone(true);
              return prev;
            }
            return prev - 1;
          }),
        60000,
      );
    }
    return () => {
      if (minuteIntervalRef.current) {
        clearInterval(minuteIntervalRef.current);
      }
    };
  }, [isMainCountdownDone, minutesLeft]);

  //   Trigger when minutes left countdown is done to start counting down seconds
  useEffect(() => {
    if (isMainCountdownDone && secondsLeft > 0) {
      secondIntervalRef.current = setInterval(
        () =>
          setSecondsLeft((prev) => {
            if (prev <= 1) {
              clearInterval(secondIntervalRef.current!);
              onTimeEnd?.();
              return 0;
            }
            return prev - 1;
          }),
        1000,
      );
    }
    return () => {
      if (secondIntervalRef.current) {
        clearInterval(secondIntervalRef.current);
      }
    };
  }, [isMainCountdownDone, secondsLeft]);
  return {
    minutesLeft,
    secondsLeft,
    isMainCountdownDone,
    isCompleted: Boolean(secondsLeft < 2),
  };
}
