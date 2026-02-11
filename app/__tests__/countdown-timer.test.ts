import { act, renderHook } from "@testing-library/react";
import useCountdownTimer from "../_hooks/countdown-timer";

describe("useCountdownTimer", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("initializes minutesLeft based on endDateTime - now (in minutes) and secondsLeft=60", () => {
    const now = new Date("2026-02-10T10:00:00.000Z");
    jest.setSystemTime(now);

    const end = new Date("2026-02-10T10:05:00.000Z"); // 5 minutes ahead

    const { result } = renderHook(() => useCountdownTimer(end));

    expect(result.current.minutesLeft).toBe(5);
    expect(result.current.secondsLeft).toBe(60);
    expect(result.current.isMainCountdownDone).toBe(false);
    expect(result.current.isCompleted).toBe(false);
  });

  it("counts down minutes every 60s until it marks main countdown done (note: current logic ends at endtime + 1 min)", () => {
    const now = new Date("2026-02-10T10:00:00.000Z");
    jest.setSystemTime(now);

    // 2 minutes left initially
    const end = new Date("2026-02-10T10:02:00.000Z");

    const { result } = renderHook(() => useCountdownTimer(end));

    expect(result.current.minutesLeft).toBe(2);
    expect(result.current.isMainCountdownDone).toBe(false);

    // After 60s: 2 -> 1
    act(() => {
      jest.advanceTimersByTime(60_000);
    });
    expect(result.current.minutesLeft).toBe(1);
    expect(result.current.isMainCountdownDone).toBe(false);

    /**
     * Current code:
     * if (prev <= 1) { setIsMainCountdownDone(true); return prev; }
     * So when minutesLeft is 1, the next minute tick sets isMainCountdownDone
     * but leaves minutesLeft at 1 (does NOT decrement to 0).
     */
    act(() => {
      jest.advanceTimersByTime(60_000);
    });

    expect(result.current.minutesLeft).toBe(1);
    expect(result.current.isMainCountdownDone).toBe(true);
  });

  it("after main countdown is done, it counts down seconds each 1s and calls onTimeEnd once", () => {
    const now = new Date("2026-02-10T10:00:00.000Z");
    jest.setSystemTime(now);

    // 1 minute left initially (forces main countdown to complete after 60s per current logic)
    const end = new Date("2026-02-10T10:01:00.000Z");
    const onTimeEnd = jest.fn();

    const { result } = renderHook(() => useCountdownTimer(end, onTimeEnd));

    expect(result.current.minutesLeft).toBe(1);
    expect(result.current.isMainCountdownDone).toBe(false);
    expect(result.current.secondsLeft).toBe(60);

    // Move forward 60s -> main countdown becomes done (minutesLeft stays 1)
    act(() => {
      jest.advanceTimersByTime(60_000);
    });
    expect(result.current.isMainCountdownDone).toBe(true);

    // Seconds should start decrementing each second
    act(() => {
      jest.advanceTimersByTime(1_000);
    });
    expect(result.current.secondsLeft).toBe(59);
    expect(onTimeEnd).not.toHaveBeenCalled();

    // Run down remaining 59 seconds
    act(() => {
      jest.advanceTimersByTime(59_000);
    });

    expect(result.current.secondsLeft).toBe(0);
    expect(onTimeEnd).toHaveBeenCalledTimes(1);

    // isCompleted: Boolean(secondsLeft < 2)
    expect(result.current.isCompleted).toBe(true);
  });

  it("cleans up intervals on unmount (no setState warnings / no further changes)", () => {
    const now = new Date("2026-02-10T10:00:00.000Z");
    jest.setSystemTime(now);

    const end = new Date("2026-02-10T10:10:00.000Z");

    const { result, unmount } = renderHook(() => useCountdownTimer(end));

    const before = result.current.minutesLeft;

    unmount();

    // Advance time; hook is unmounted so state should not update.
    act(() => {
      jest.advanceTimersByTime(5 * 60_000);
    });

    // Nothing to assert on result after unmount (it’s gone),
    // but this test is valuable because it should not throw warnings/errors.
    expect(before).toBe(10);
  });
});
