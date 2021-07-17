import React from "react";
import CountdownInputSection from "./sections/CountdownInputSection";
import MultipliersSection from "./sections/MultipliersSection";
import "../../styles/pages/timer/timer-page.css"
import { Box, Paper } from "@material-ui/core";
import CountdownTimerSection from "./sections/CountdownTimerSection";
import * as data from "../config.json"
import { styled } from "@material-ui/core/styles";
import { flexbox, compose, spacing } from "@material-ui/system";

const SubContainer = styled(Box)(compose(spacing, flexbox));

const TimerPage = () => {
  const { countdownInputSection, countdownTimerSection, multiplierSection } = data.timer;
  return (
    <Box className={"box"}>
      <Paper
        elevation={20}
        className={"main-container"}>
        <SubContainer
          m={3}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          className={"sub-container"}>
          <CountdownInputSection
            label={countdownInputSection.countdownLabelText}
            buttonText={countdownInputSection.startButtonText}/>
          <CountdownTimerSection
            halfwayWarningPercentage={countdownTimerSection.halfwayWarningPercentage}
            colorWarningThreshold={countdownTimerSection.colorWarningStartingAtSecond}
            blinkWarningThreshold={countdownTimerSection.blinkWarningStartingAtSecond}
            halfwayWarningText={countdownTimerSection.halfwayWarningInfoText}
            timesUpText={countdownTimerSection.timesUpInfoText}/>
          <MultipliersSection
            multipliers={multiplierSection.multipliers}
            defaultIndex={multiplierSection.defaultSelectedMultiplierIndex}/>
        </SubContainer>
      </Paper>
    </Box>
  );
}

export default TimerPage;