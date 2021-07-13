import React from "react";
import CountdownInputSection from "./sections/CountdownInputSection";
import MultipliersSection from "./sections/MultipliersSection";
import "../../styles/pages/timer/timer-page.css"
import { Box, Paper } from "@material-ui/core";
import CountdownTimerSection from "./sections/CountdownTimerSection";
import * as data from "../config.json"

const TimerPage = () => {
  const { countdownInputSection, countdownTimerSection, multiplierSection } = data.timer;
  return (
    <Box className={"box"}>
      <Paper
        elevation={3}
        className={"main-container"}>
        <div
          className={"sub-container"}>
          <CountdownInputSection
            label={countdownInputSection.countdownLabel}
            buttonText={countdownInputSection.startButton}/>
          <CountdownTimerSection
            halfwayWarning={countdownTimerSection.halfwayWarningPercentage}
            colorWarning={countdownTimerSection.colorWarningStartingAtSecond}
            blinkWarning={countdownTimerSection.blinkWarningStartingAtSecond}
            halfwayWarningText={countdownTimerSection.halfwayWarningInfoText}
            timesUpText={countdownTimerSection.timesUpInfoText}/>
          <MultipliersSection
            multipliers={multiplierSection.multipliers}
            defaultIndex={multiplierSection.defaultSelectedMultiplierIndex}/>
        </div>
      </Paper>
    </Box>
  );
}

export default TimerPage;