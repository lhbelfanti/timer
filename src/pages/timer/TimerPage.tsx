import React from "react";
import CountdownInputSection from "./sections/CountdownInputSection";
import MultipliersSection from "./sections/MultipliersSection";
import CountdownTimerSection from "./sections/CountdownTimerSection";
import * as data from "../config.json"
import { Container } from "../../types";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  paper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },
});

const TimerPage = () => {
  const classes = useStyles();
  const {countdownInputSection, countdownTimerSection, multiplierSection} = data.timer;

  return (
    <Container
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      minHeight={"90vh"}>
      <Paper
        elevation={20}
        className={classes.paper}>
        <Container
          m={3}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}>
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
        </Container>
      </Paper>
    </Container>
  );
}

export default TimerPage;