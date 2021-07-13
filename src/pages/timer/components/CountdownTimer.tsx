import { useActions } from "../../../hooks/useActions";
import { TimerEvents } from "../../../state/actions";
import { useEffect, useState } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { countdown, firstWarningToSeconds, formatText, speedToMilliseconds } from "../timerHelper";
import { Typography } from "@material-ui/core";
import "../../../styles/pages/timer/sections/countdown-timer-section.css";

interface CountdownTimerState {
  minutes: number,
  seconds: number
}

const initialState = {
  minutes: 0,
  seconds: 0
}

interface CountdownTimerProps {
  halfwayWarning: number,
  colorWarning: number,
  blinkWarning: number
}

let counter = {min: 0, sec: 0};
let textStyle = "";
let timerId: any = null;
let firstWarningInSeconds = -1;
let cacheFirstWarningSecs = -1;

const CountdownTimer = (props: CountdownTimerProps) => {
  const [state, setState] = useState<CountdownTimerState>(initialState);
  const {data, event, paused, speed} = useTypedSelector((state) => state.timer);
  const {triggerTimerEvent, updateTimer, pauseTimer} = useActions();

  const restartTimer = (shouldPauseTimer: boolean = true) => {
    triggerTimerEvent(null);
    clearTimerInterval(shouldPauseTimer);
    createNewTimer();
  }

  const clearTimerInterval = (shouldPauseTimer: boolean = true) => {
    if (timerId !== null) {
      clearInterval(timerId);
      if (shouldPauseTimer)
        pauseTimer();
    }
    timerId = null;
  }

  const createNewTimer = () => {
    cacheFirstWarningSecs = firstWarningInSeconds;
    counter = {min: data.min, sec: data.sec};
    firstWarningInSeconds = firstWarningToSeconds(counter.min, counter.sec, props.halfwayWarning, cacheFirstWarningSecs);
    cacheFirstWarningSecs = -1;
    setState({...state, minutes: counter.min, seconds: counter.sec});
    timerId = setInterval(onTimerCountdown, speedToMilliseconds(speed));
  }

  const onTimerCountdown = () => {
    if (counter.min === 0 && counter.sec === 0) {
      clearTimerInterval();
      return;
    }

    counter = countdown(counter.min, counter.sec);
    setState({...state, minutes: counter.min, seconds: counter.sec});
    updateTimer(counter);

    const total = counter.sec + (counter.min * 60);
    if (total === firstWarningInSeconds) {
      triggerTimerEvent(TimerEvents.HALFWAY_WARNING);
    } else if (total === props.colorWarning) {
      triggerTimerEvent(TimerEvents.COLOR_WARNING);
    } else if (total === props.blinkWarning) {
      triggerTimerEvent(TimerEvents.BLINK_WARNING);
    } else if (total === 0) {
      triggerTimerEvent(TimerEvents.TIME_IS_UP);
    }
  }

  // Component Update: Checks every possible state of the Timer and process the behaviours
  useEffect(() => {
    if (!paused) {
      switch (event) {
        case TimerEvents.RESET: {
          restartTimer();
          break;
        }
        case TimerEvents.RESUME: {
          restartTimer(false);
          break;
        }
        case TimerEvents.SPEED_CHANGED: {
          restartTimer(false);
          break;
        }
        case TimerEvents.HALFWAY_WARNING: {
          triggerTimerEvent(null);
          break;
        }
        case TimerEvents.COLOR_WARNING: {
          triggerTimerEvent(null);
          textStyle = "countdown-timer-red";
          break;
        }
        case TimerEvents.BLINK_WARNING: {
          triggerTimerEvent(null);
          textStyle = "countdown-timer-blink";
          break;
        }
        case TimerEvents.TIME_IS_UP: {
          triggerTimerEvent(null);
          textStyle = "";
          clearTimerInterval();
          break;
        }
      }
    } else {
      clearTimerInterval();
    }
  }, [clearTimerInterval, event, createNewTimer, paused, state, triggerTimerEvent]);

  return (
    <Typography variant={"h1"} className={textStyle}>
      {formatText(state.minutes, state.seconds)}
    </Typography>
  )
}

export default CountdownTimer;
