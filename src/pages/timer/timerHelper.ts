import { TimerData } from "../../state";

export const countdown = (counter: TimerData) => {
  if (counter.sec - 1 === -1) {
    counter.min -= 1;
    counter.sec = 59;
  } else {
    counter.sec -= 1;
  }

  return counter;
};

export const stringToMinSec = (time: string) => {
  const data = time.split(":");

  return { min: Number(data[0]), sec: Number(data[1]) };
};

export const firstWarningToSeconds = (
  counter: TimerData,
  firstWarning: number
) => {
  const { min, sec } = counter;

  let percentage = firstWarning;
  if (percentage > 1 || percentage < 0) {
    percentage = 0.5;
  }
  const total = sec + min * 60;

  return Math.round(total * percentage);
};

export const speedToMilliseconds = (speed: number) => {
  return (1 / speed) * 1000;
};

export const formatText = (minutes: number, seconds: number) => {
  return (
    (minutes < 10 ? "0" : "") +
    minutes.toString() +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds.toString()
  );
};

export const getSecondsFromMMSS = (value: string) => {
  const [str1, str2] = value.split(":");

  const val1 = Number(str1);
  const val2 = Number(str2);

  if (!isNaN(val1) && isNaN(val2)) {
    return val1;
  }

  if (!isNaN(val1) && !isNaN(val2)) {
    return val1 * 60 + val2;
  }

  return 0;
};

export const toMMSS = (secs: number) => {
  const secNum = parseInt(secs.toString(), 10);
  const minutes = formatVal(Math.floor(secNum / 60) % 100);
  const seconds = formatVal(secNum % 60);

  return `${minutes}:${seconds}`;
};

export const formatVal = (val: number) => {
  return val < 10 ? `0${val}` : val;
};

export const timerLimit = (val: string) => {
  const minutes = val.substring(0, 2);
  const seconds = val.substring(2, 4);

  return minutes + (seconds.length ? ":" + seconds : "");
};
