import CountdownTimer from "../components/CountdownTimer";
import PauseButton from "../components/PauseButton";
import React from "react";
import "../../../styles/pages/timer/sections/countdown-timer-section.css";
import FadeInText from "../components/FadeInText";

interface CountdownTimerProps {
  halfwayWarningPercentage: number,
  colorWarningThreshold: number,
  halfwayWarningText: string,
  timesUpText: string,
  blinkWarningThreshold: number,
}

const CountdownTimerSection = (props: CountdownTimerProps) => {
  const { halfwayWarningPercentage, colorWarningThreshold, halfwayWarningText, timesUpText, blinkWarningThreshold } = props;
  return (
    <div className={"countdown-timer-section-main-container"}>
      <FadeInText
        halfwayWarningText={halfwayWarningText}
        timesUpText={timesUpText}/>
      <div className={"countdown-timer-section-sub-container"}>
        <CountdownTimer
          halfwayWarningPercentage={halfwayWarningPercentage}
          colorWarningThreshold={colorWarningThreshold}
          blinkWarningThreshold={blinkWarningThreshold}/>
        <PauseButton/>
      </div>
    </div>
  );
}

export default CountdownTimerSection;