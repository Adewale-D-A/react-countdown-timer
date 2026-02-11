import { TimeValidatorT } from "../_utils/time-validator";

export default function YetToStartUi({
  timeComponent,
  startDateTime
}: {
  timeComponent: TimeValidatorT;
  startDateTime: Date;
}) {
  return (
    <div>
      <div className=" text-center space-y-2">
        <h3 className=" font-bold text-2xl">
          Entry prevented! Consultation has not started and as such yet to be
          available.
        </h3>
        <p>Scheduled start time: <b>{startDateTime?.toTimeString()}</b></p>
      </div>
      <div className=" space-y-2 mt-5">
        <p className=" italic font-bold">
          Time remaining before session starts
        </p>
        <div className="w-full grid grid-cols-3 gap-5">
          <div className="bg-slate-400 aspect-square rounded-xl flex flex-col justify-center items-center">
            <span className="text-2xl font-bold">
              {timeComponent?.yet_to_start_properies.months_to_start}
            </span>
            <span className="text-sm">Month(s)</span>
          </div>
          <div className="bg-slate-400 aspect-square rounded-xl flex flex-col justify-center items-center">
            <span className="text-2xl font-bold">
              {timeComponent?.yet_to_start_properies.days_to_start}
            </span>
            <span className="text-sm">Day(s)</span>
          </div>
          <div className="bg-slate-400 aspect-square rounded-xl flex flex-col justify-center items-center">
            <span className="text-2xl font-bold">
              {timeComponent?.yet_to_start_properies.minutes_to_start}
            </span>
            <span className="text-sm">Minutes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
