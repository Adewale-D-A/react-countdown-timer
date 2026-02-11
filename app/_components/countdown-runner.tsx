import useCountdownTimer from "../_hooks/countdown-timer";

export default function CountdownRunner({
  endDateTime,
}: {
  endDateTime: Date;
}) {
  const { minutesLeft, secondsLeft, isMainCountdownDone, isCompleted } =
    useCountdownTimer(endDateTime);

  return (
    <div className=" w-full space-y-5">
      {isCompleted && (
        <h3 className=" font-bold text-xl text-center">Countdown Completed!</h3>
      )}
      {!isCompleted && (
        <>
          <h1 className=" text-center">Entry Allowed! Countdown Running</h1>
          <div className="flex gap-4 text-7xl font-bold justify-center items-center">
            {!isMainCountdownDone && (
              <div className="flex flex-col justify-center items-center">
                <h3 className=" font-bold text-green-500">{minutesLeft}+</h3>
                <span className=" italic text-xl">Minute(s) Left</span>
              </div>
            )}
            {isMainCountdownDone && (
              <div className="flex flex-col justify-center items-center">
                <h3 className="font-bold text-red-500">{secondsLeft}</h3>
                <span className="italic text-xl">Seconds Left</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
