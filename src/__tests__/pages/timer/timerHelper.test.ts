import "@testing-library/jest-dom/extend-expect";
import {
  countdown,
  firstWarningToSeconds,
  formatText,
  formatVal,
  getSeconds,
  getSecondsFromMMSS,
  speedToMilliseconds,
  stringToMinSec,
  timerLimit,
  toMMSS
} from "../../../pages/timer/timerHelper";

describe("timerHelper Tests Suite", () => {
  test("getSeconds function", () => {
    const value = getSeconds({ min: 1, sec: 30 });
    expect(value).toBe(90);
  });

  test("countdown function", () => {
    const value1 = countdown({ min: 1, sec: 0 });
    expect(value1).toStrictEqual({ min: 0, sec: 59 });

    const value2 = countdown({ min: 1, sec: 30 });
    expect(value2).toStrictEqual({ min: 1, sec: 29 });
  });

  test("stringToMinSec function", () => {
    const value = stringToMinSec("01:30");
    expect(value).toStrictEqual({ min: 1, sec: 30 });
  });

  test("firstWarningToSeconds function", () => {
    const value1 = firstWarningToSeconds({ min: 1, sec: 30 }, 0.5);
    expect(value1).toBe(45);

    const value2 = firstWarningToSeconds({ min: 1, sec: 30 }, -1);
    expect(value2).toBe(45);
  });

  test("speedToMilliseconds function", () => {
    const value1 = speedToMilliseconds(1);
    expect(value1).toBe(1000);

    const value2 = speedToMilliseconds(1.5);
    expect(value2).toBe(666.6666666666666);

    const value3 = speedToMilliseconds(2);
    expect(value3).toBe(500);
  });

  test("formatText function", () => {
    const value1 = formatText({ min: 1, sec: 30 });
    expect(value1).toBe("01:30");

    const value2 = formatText({ min: 15, sec: 3 });
    expect(value2).toBe("15:03");
  });

  test("getSecondsFromMMSS function", () => {
    const value1 = getSecondsFromMMSS("01:30");
    expect(value1).toBe(90);

    const value2 = getSecondsFromMMSS("NaN:NaN");
    expect(value2).toBe(0);
  });

  test("toMMSS function", () => {
    const value = toMMSS(90);
    expect(value).toBe("01:30");
  });

  test("formatVal function", () => {
    const value1 = formatVal(3);
    expect(value1).toBe("03");

    const value2 = formatVal(30);
    expect(value2).toBe("30");
  });

  test("timerLimit function", () => {
    const value1 = timerLimit("1000");
    expect(value1).toBe("10:00");

    const value2 = timerLimit("10");
    expect(value2).toBe("10");
  });
});
