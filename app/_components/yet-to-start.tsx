import { TimeValidatatorT } from "../_utils/time-validator";

export default function YetToStartUi({
  timeComponent,
}: {
  timeComponent: TimeValidatatorT;
}) {
  return (
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
  );
}
