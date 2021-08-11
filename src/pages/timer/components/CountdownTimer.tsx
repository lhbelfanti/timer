import { Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useCallback, useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { TimerEvents } from "../../../state/actions";
import { countdown, firstWarningToSeconds, formatText, getSeconds, speedToMilliseconds } from "../timerHelper";

interface CountdownTimerProps {
  halfwayWarningPercentage: number,
  colorWarningThreshold: number,
  blinkWarningThreshold: number
}

const useStyles = makeStyles({
  countdownInputRed: {
    color: "#f44336"
  },
  countdownTimerBlink: {
    color: "#f44336",
    animation: "$blinker 1s linear infinite"
  },
  "@keyframes blinker": {
    "50%": {
      opacity: 0
    }
  }
});

let cache: number = 0;
let timerId: NodeJS.Timeout | null = null;

const CountdownTimer = (props: CountdownTimerProps) => {
  const classes = useStyles();
  const [textStyle, setTextStyle] = useState("");
  const {data, event, paused, speed} = useTypedSelector((rootState) => rootState.timer);
  const {triggerTimerEvent, setTimer, pauseTimer} = useActions();

  const clearTimerInterval = useCallback((shouldPauseTimer: boolean = true) => {
    if (timerId !== null) {
      clearInterval(timerId);
      if (shouldPauseTimer) {
        pauseTimer();
      }
    }
    timerId = null;
  }, [pauseTimer]);

  const onTimerCountdown = useCallback((firstWarningInSeconds: number) => {
    if (data.min === 0 && data.sec === 0) {
      clearTimerInterval();

      return;
    }

    const counter = countdown(data);
    setTimer(counter);

    const total = getSeconds(counter);
    if (total === firstWarningInSeconds) {
      triggerTimerEvent(TimerEvents.HALFWAY_WARNING);
    } else if (total === props.colorWarningThreshold) {
      triggerTimerEvent(TimerEvents.COLOR_WARNING);
    } else if (total === props.blinkWarningThreshold) {
      triggerTimerEvent(TimerEvents.BLINK_WARNING);
    } else if (total === 0) {
      triggerTimerEvent(TimerEvents.TIME_IS_UP);
      pauseTimer();
      cache = 0;
    }
  }, [clearTimerInterval, data, pauseTimer, props.blinkWarningThreshold, props.colorWarningThreshold, setTimer, triggerTimerEvent]);

  const createNewTimer = useCallback((fromReset: boolean = true) => {
    const firstWarnInSecs = fromReset ? firstWarningToSeconds(data, props.halfwayWarningPercentage) : cache;
    if (cache === 0) { cache = firstWarnInSecs; }
    setTimer(data);
    timerId = setInterval(() => {
      onTimerCountdown(firstWarnInSecs);
    }, speedToMilliseconds(speed));
  }, [data, onTimerCountdown, props.halfwayWarningPercentage, setTimer, speed]);

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
        case TimerEvents.SPEED_CHANGED: {
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
          setTextStyle(classes.countdownInputRed);
          break;
        }
        case TimerEvents.BLINK_WARNING: {
          triggerTimerEvent(null);
          setTextStyle(classes.countdownTimerBlink);
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
  }, [clearTimerInterval, event, createNewTimer, paused, triggerTimerEvent, classes.countdownInputRed, classes.countdownTimerBlink]);

  return (
    <Typography
      variant={"h1"}
      className={textStyle}>
      {formatText(data)}
    </Typography>
  )
}

export default CountdownTimer;
