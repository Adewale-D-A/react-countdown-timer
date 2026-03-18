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
  // Extract duration from default start and end date time
  const endDuration =
    endDateTime && startDateTime
      ? (endDateTime.getTime() - startDateTime.getTime()) / 60000
      : 0;
  const [name, setName] = useState("");
  const [sessions, setSessions] = useState<
    {
      id: string;
      name: string;
      start: string;
      end: string;
    }[]
  >([]);
  const [start, setStart] = useState(
    startDateTime ? localDateToIsoFormat(startDateTime)?.substring(0, 16) : "",
  );
  const [duration, setDuration] = useState(
    endDuration > 0 ? String(endDuration) : "5",
  );
  const [viewIndex, setViewIndex] = useState<number | null>(null);
  const [timeComponent, setTimeComponent] = useState<TimeValidatorT | null>(
    null,
  );

  const onViewChange = (index: number) => {
    setViewIndex(index);

    const response = timeValidator(
      new Date(sessions[index].start),
      new Date(sessions[index].end),
    );
    setTimeComponent(response);
  };

  const validateDateTime = (e: SyntheticEvent) => {
    e.preventDefault();
    const end = new Date(
      new Date(start)?.getTime() + (Number(duration) ?? 0) * 60000,
    )?.toISOString();
    const id = Math.random().toString(36).substring(2, 10);
    setSessions((prev) => [
      ...prev,
      {
        id,
        name,
        start,
        end,
      },
    ]);
  };
  return (
    <div className=" w-full flex flex-col justify-center items-center gap-5">
      <form
        onSubmit={validateDateTime}
        className="flex flex-col items-center justify-center gap-5"
      >
        <div className="space-y-4 p-4 w-full border border-gray-400 rounded-lg">
          <label className=" flex flex-col gap-1">
            <span className=" font-bold">Name this session:</span>
            <input
              type="text"
              placeholder="Enter session name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=" p-2 border rounded-lg"
              required
            />
          </label>
          <div className=" flex items-center justify-center gap-4 p-4 w-full">
            <label className=" flex flex-col gap-1">
              <span className=" font-bold">Start:</span>
              <input
                type="datetime-local"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className=" p-2 border rounded-lg"
                required
              />
            </label>{" "}
            <span className=" bg-slate-800 text-white rounded-full p-2">
              to
            </span>
            <label className=" flex flex-col gap-1">
              <span className=" font-bold">Session Duration (in minutes):</span>
              <input
                type="number"
                placeholder="Enter session duration in minutes"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                min={0}
                required
                className=" p-2 border rounded-lg"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full p-4 px-8 bg-slate-800 text-white hover:bg-slate-900 transition-colors rounded-lg"
          >
            Add Session
          </button>
        </div>
      </form>
      <div className="flex flex-wrap justify-center items-center w-full gap-6">
        {sessions.length <= 0 && (
          <div className=" p-10 text-center">
            No session added yet. Please add a session to get started.
          </div>
        )}

        {sessions.map((session, index) => (
          <div
            key={session.id}
            className="border border-gray-400 p-4 rounded-lg w-fit"
          >
            <h3 className=" font-bold text-xl">{session.name}</h3>
            <p className="text-sm">Start: {new Date(session.start).toLocaleString()}</p>
            <p className="text-sm">End: {new Date(session.end).toLocaleString()}</p>
            <button
              className=" p-2 px-5 bg-slate-800 text-white hover disabled:bg-gray-300 disabled:text-gray-500 :bg-slate-900 transition-colors rounded-lg"
              onClick={() => onViewChange(index)}
              disabled={index === viewIndex}
            >
              View
            </button>
          </div>
        ))}
      </div>

      {viewIndex !== null && timeComponent && (
        <div className="w-full shadow-lg p-4 rounded-lg">
          <h3 className=" font-bold text-lg"><span className=" font-normal text-sm">Session Name:</span> {sessions?.[viewIndex]?.name}</h3>
          <div className=" w-full max-w-3xl">
            {timeComponent?.is_yet_to_start && (
              <YetToStartUi
                timeComponent={timeComponent}
                startDateTime={new Date(sessions?.[viewIndex]?.start)}
              />
            )}
          </div>

          {timeComponent?.is_expired && <SlotExpired />}

          {timeComponent?.is_slot_active && (
            <CountdownRunner
              endDateTime={new Date(sessions?.[viewIndex]?.end)}
            />
          )}
        </div>
      )}
    </div>
  );
}
