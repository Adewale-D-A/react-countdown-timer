"use client";

import { useState } from "react";
import { TimeValidatatorT, timeValidator } from "../_utils/time-validator";
import YetToStartUi from "./yet-to-start";
import SlotExpired from "./expired";
import CountdownRunner from "./countdown-runner";

export default function RenderCountdownComponenet({
  startDateTime,
  endDateTime,
}: {
  startDateTime: Date;
  endDateTime: Date;
}) {
  const [timeComponent, setTimeComponent] = useState<TimeValidatatorT | null>(
    null,
  );

  const validateDateTime = () => {
    const response = timeValidator(startDateTime, endDateTime);
    setTimeComponent(response);
  };
  return (
    <div className=" w-full flex flex-col justify-center items-center gap-5">
      <button
        type="button"
        onClick={() => validateDateTime()}
        className=" p-4 px-8 bg-slate-800 text-white hover:bg-slate-900 transition-colors rounded-lg"
      >
        Validate Date
      </button>
      <div className=" w-full max-w-3xl">
        {timeComponent?.is_yet_to_start && (
          <YetToStartUi timeComponent={timeComponent} />
        )}
      </div>

      {timeComponent?.is_expired && <SlotExpired />}

      {timeComponent?.is_slot_active && (
        <CountdownRunner endDateTime={endDateTime} />
      )}
    </div>
  );
}
