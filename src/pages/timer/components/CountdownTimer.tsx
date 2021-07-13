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

let cache = 0;
let timerId: any = null;

const CountdownTimer = (props: CountdownTimerProps) => {
  const [state, setState] = useState<CountdownTimerState>(initialState);
  const [textStyle, setTextStyle] = useState("");
  const {data, event, paused, speed} = useTypedSelector((state) => state.timer);
  const {triggerTimerEvent, setTimer, pauseTimer} = useActions();

  const clearTimerInterval = (shouldPauseTimer: boolean = true) => {
    if (timerId !== null) {
      clearInterval(timerId);
      if (shouldPauseTimer)
        pauseTimer();
    }
    timerId = null;
  }

  const createNewTimer = (fromReset: boolean = true) => {
    const firstWarnInSecs = fromReset ? firstWarningToSeconds(data, props.halfwayWarning) : cache;
    if (cache === 0) cache = firstWarnInSecs;
    setState({minutes: data.min, seconds: data.sec});
    setTimer(data);
    timerId = setInterval(() => {
      onTimerCountdown(firstWarnInSecs);
    }, speedToMilliseconds(speed));
  }

  const onTimerCountdown = (firstWarningInSeconds: number) => {
    if (data.min === 0 && data.sec === 0) {
      clearTimerInterval();
      return;
    }

    const counter = countdown(data);
    setState({minutes: counter.min, seconds: counter.sec});
    setTimer(counter);

    const total = counter.sec + (counter.min * 60);
    if (total === firstWarningInSeconds) {
      triggerTimerEvent(TimerEvents.HALFWAY_WARNING);
    } else if (total === props.colorWarning) {
      triggerTimerEvent(TimerEvents.COLOR_WARNING);
    } else if (total === props.blinkWarning) {
      triggerTimerEvent(TimerEvents.BLINK_WARNING);
    } else if (total === 0) {
      triggerTimerEvent(TimerEvents.TIME_IS_UP);
      pauseTimer();
      cache = 0;
    }
  }

  useEffect(() => {
    if (!paused) {
      switch (event) {
        case TimerEvents.RESET: {
          triggerTimerEvent(null);
          clearTimerInterval();
          createNewTimer();
          setTextStyle("");
          break;
        }
        case TimerEvents.RESUME:
        case TimerEvents.SPEED_CHANGED:{
          triggerTimerEvent(null);
          clearTimerInterval(false);
          createNewTimer(false);
          break;
        }
        case TimerEvents.HALFWAY_WARNING: {
          triggerTimerEvent(null);
          break;
        }
        case TimerEvents.COLOR_WARNING: {
          triggerTimerEvent(null);
          setTextStyle("countdown-timer-red");
          break;
        }
        case TimerEvents.BLINK_WARNING: {
          triggerTimerEvent(null);
          setTextStyle("countdown-timer-blink");
          break;
        }
        case TimerEvents.TIME_IS_UP: {
          triggerTimerEvent(null);
          setTextStyle("");
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
