import CountdownTimer from "../components/CountdownTimer";
import PauseButton from "../components/PauseButton";
import React from "react";
import "../../../styles/pages/timer/sections/countdown-timer-section.css";
import FadeInText from "../components/FadeInText";

interface CountdownTimerProps {
  halfwayWarning: number,
  colorWarning: number,
  halfwayWarningText: string,
  timesUpText: string,
  blinkWarning: number,
}

const CountdownTimerSection = (props: CountdownTimerProps) => {
  const { halfwayWarning, colorWarning, halfwayWarningText, timesUpText, blinkWarning } = props;
  return (
    <div className={"countdown-timer-section-main-container"}>
      <FadeInText
        halfwayWarningText={halfwayWarningText}
        timesUpText={timesUpText}/>
      <div className={"countdown-timer-section-sub-container"}>
        <CountdownTimer
          halfwayWarning={halfwayWarning}
          colorWarning={colorWarning}
          blinkWarning={blinkWarning}/>
        <PauseButton/>
      </div>
    </div>
  );
}

export default CountdownTimerSection;