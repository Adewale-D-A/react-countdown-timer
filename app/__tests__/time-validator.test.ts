import { timeValidator } from "../_utils/time-validator";

describe("timeValidator", () => {
  beforeAll(() => {
    // Freeze time so `new Date()` inside timeValidator is stable
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("returns is_yet_to_start=true and computes minutes_to_start when now is before start", () => {
    const now = new Date("2026-02-10T10:00:00.000Z");
    jest.setSystemTime(now);

    const start = new Date("2026-02-10T10:30:00.000Z"); // 30 mins in the future
    const end = new Date("2026-02-10T11:30:00.000Z");

    const result = timeValidator(start, end);

    expect(result.is_yet_to_start).toBe(true);
    expect(result.is_slot_active).toBe(false);
    expect(result.is_expired).toBe(false);

    expect(result.yet_to_start_properies.minutes_to_start).toBe(30);
    // Same day/month/year in this case
    expect(result.yet_to_start_properies.years_to_start).toBe(0);
    expect(result.yet_to_start_properies.months_to_start).toBe(0);
    expect(result.yet_to_start_properies.days_to_start).toBe(0);

    // Not active, so minutes_to_end should remain 0
    expect(result.time_remaining_properties.minutes_to_end).toBe(0);
  });

  it("returns is_slot_active=true and computes minutes_to_end when now is between start and end", () => {
    const now = new Date("2026-02-10T10:30:00.000Z");
    jest.setSystemTime(now);

    const start = new Date("2026-02-10T10:00:00.000Z"); // started
    const end = new Date("2026-02-10T11:00:00.000Z");   // 30 mins remaining

    const result = timeValidator(start, end);

    expect(result.is_slot_active).toBe(true);
    expect(result.is_yet_to_start).toBe(false);
    expect(result.is_expired).toBe(false);

    expect(result.time_remaining_properties.minutes_to_end).toBe(30);

    // Not "yet to start", so these should remain default 0s
    expect(result.yet_to_start_properies.minutes_to_start).toBe(0);
    expect(result.yet_to_start_properies.years_to_start).toBe(0);
    expect(result.yet_to_start_properies.months_to_start).toBe(0);
    expect(result.yet_to_start_properies.days_to_start).toBe(0);
  });

  it("returns is_expired=true when now is after end", () => {
    const now = new Date("2026-02-10T12:00:00.000Z");
    jest.setSystemTime(now);

    const start = new Date("2026-02-10T10:00:00.000Z");
    const end = new Date("2026-02-10T11:00:00.000Z"); // ended an hour ago

    const result = timeValidator(start, end);

    expect(result.is_expired).toBe(true);
    expect(result.is_slot_active).toBe(false);
    expect(result.is_yet_to_start).toBe(false);

    // Expired, so minutes_to_end should remain 0 per function logic
    expect(result.time_remaining_properties.minutes_to_end).toBe(0);
  });

  it("treats exact boundaries as active: start == now and end == now", () => {
    // start == now => startTimeDifference === 0 (active check passes)
    // end == now => endTimeDifference === 0 (active check passes)
    const now = new Date("2026-02-10T10:00:00.000Z");
    jest.setSystemTime(now);

    const start = new Date("2026-02-10T10:00:00.000Z");
    const end = new Date("2026-02-10T10:00:00.000Z");

    const result = timeValidator(start, end);

    expect(result.is_slot_active).toBe(true);
    expect(result.is_yet_to_start).toBe(false);
    expect(result.is_expired).toBe(false);

    // minutes_to_end = floor((0 * -1)/(...) ) = 0
    expect(result.time_remaining_properties.minutes_to_end).toBe(0);
  });
});
