
/**
 *
 * @param startDateTime start date time of session (the system assumes the date value is in UTC)
 * @param endDateTime end date time of session (the system assumes the date value is in UTC)
 * @returns object with time validation properties
*/

export function timeValidator(startDateTime: Date, endDateTime: Date) {
  const now = new Date();
  let yearsToStart = 0;
  let monthsToStart = 0;
  let daysToStart = 0;
  let minutesToStart = 0;

  let minutesToEnd = 0;

  // Start time
  const startTimeDifference = now.getTime() - startDateTime.getTime();
  //+ve i.e. startTimeDifference >= 0 means session has started
  //-ve i.e. startTimeDifference <= 0 result means now is less than start time (i.e. session is yet to start)

  // End time
  const endTimeDifference = now.getTime() - endDateTime.getTime();
  //-ve i.e. endTimeDifference <= 0 result means now is less than end time (i.e. end time is yet to be reached)
  //+ve i.e. endTimeDifference >= 0 means session has expired

  const isTimeActive = Boolean(
    startTimeDifference >= 0 && endTimeDifference <= 0,
  );
  const isYetToStart = Boolean(startTimeDifference < 0);
  const isExpired = Boolean(endTimeDifference > 0);

  // Provided that session is yet to start, compute how long to actual start
  if (isYetToStart) {
    const startYearDifference = startDateTime.getFullYear() - now.getFullYear();
    const startMonthDifference = startDateTime.getMonth() - now.getMonth();
    const startDateDifference = startDateTime.getUTCDate() - now.getUTCDate();
    yearsToStart = startYearDifference;
    monthsToStart = startMonthDifference;
    daysToStart = startDateDifference;
    minutesToStart = Math.floor((startTimeDifference * -1) / (1000 * 60));
  }

  if (isTimeActive) {
    minutesToEnd = endTimeDifference < 0 ?  Math.floor((endTimeDifference * -1) / (1000 * 60)): endTimeDifference;
  }
  return {
    is_slot_active: isTimeActive,
    is_yet_to_start: isYetToStart,
    is_expired: isExpired,
    yet_to_start_properies: {
      years_to_start: yearsToStart,
      months_to_start: monthsToStart,
      days_to_start: daysToStart,
      minutes_to_start: Math.abs(minutesToStart),
    },
    time_remaining_properties: {
      minutes_to_end: Math.abs(minutesToEnd),
    },
  };
}



export type TimeValidatorT = ReturnType<typeof timeValidator>;
