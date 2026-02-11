"use client";

import { SyntheticEvent, useState } from "react";
import { TimeValidatorT, timeValidator } from "../_utils/time-validator";
import YetToStartUi from "./yet-to-start";
import SlotExpired from "./expired";
import CountdownRunner from "./countdown-runner";
import { localDateToIsoFormat } from "../_utils/iso-date-converter";

export default function RenderCountdownComponent({
  startDateTime,
  endDateTime,
}: {
  startDateTime?: Date;
  endDateTime?: Date;
}) {
  const [start, setStart] = useState(
    startDateTime?.toISOString()?.substring(0, 16) ?? "",
  );
  const [end, setEnd] = useState(
    endDateTime?.toISOString()?.substring(0, 16) ?? "",
  );

  const [timeComponent, setTimeComponent] = useState<TimeValidatorT | null>(
    null,
  );

  const validateDateTime = (e: SyntheticEvent) => {
    e.preventDefault();
    const response = timeValidator(new Date(start), new Date(end));
    setTimeComponent(response);
  };
  return (
    <div className=" w-full flex flex-col justify-center items-center gap-5">
      <form
        onSubmit={validateDateTime}
        className="flex flex-col items-center justify-center gap-5"
      >
        <div className=" flex items-center justify-center gap-4 p-4 w-full border border-gray-400 rounded-lg">
          <label className=" flex flex-col gap-1">
            <span className=" font-bold">Start:</span>
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className=" p-2 border rounded-lg"
              required
              min={localDateToIsoFormat(new Date())}
            />
          </label>{" "}
          <span className=" bg-slate-800 text-white rounded-full p-2">to</span>
          <label className=" flex flex-col gap-1">
            <span className=" font-bold">End:</span>
            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              min={localDateToIsoFormat(new Date())}
              required
              className=" p-2 border rounded-lg"
            />
          </label>
        </div>
        <button
          type="submit"
          className=" p-4 px-8 bg-slate-800 text-white hover:bg-slate-900 transition-colors rounded-lg"
        >
          Validate Date
        </button>
      </form>
      <div className=" w-full max-w-3xl">
        {timeComponent?.is_yet_to_start && (
          <YetToStartUi timeComponent={timeComponent} startDateTime={new Date(start)} />
        )}
      </div>

      {timeComponent?.is_expired && <SlotExpired />}

      {timeComponent?.is_slot_active && (
        <CountdownRunner endDateTime={new Date(end)} />
      )}
    </div>
  );
}
