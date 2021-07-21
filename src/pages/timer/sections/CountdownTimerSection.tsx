import React from "react";
import { Container } from "../../../types";
import CountdownTimer from "../components/CountdownTimer";
import FadeInText from "../components/FadeInText";
import PauseButton from "../components/PauseButton";

interface CountdownTimerProps {
  halfwayWarningPercentage: number,
  colorWarningThreshold: number,
  halfwayWarningText: string,
  timesUpText: string,
  blinkWarningThreshold: number,
}

const CountdownTimerSection = (props: CountdownTimerProps) => {
  const {
    halfwayWarningPercentage,
    colorWarningThreshold,
    halfwayWarningText,
    timesUpText,
    blinkWarningThreshold
  } = props;

  return (
    <Container
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"90%"}
      pt={3} pb={3}>
      <FadeInText
        halfwayWarningText={halfwayWarningText}
        timesUpText={timesUpText}/>
      <Container
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}>
        <CountdownTimer
          halfwayWarningPercentage={halfwayWarningPercentage}
          colorWarningThreshold={colorWarningThreshold}
          blinkWarningThreshold={blinkWarningThreshold}/>
        <PauseButton/>
      </Container>
    </Container>
  );
}

export default CountdownTimerSection;