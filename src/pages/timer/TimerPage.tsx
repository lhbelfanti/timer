import React from "react";
import CountdownInputSection from "./sections/CountdownInputSection";
import MultipliersSection from "./sections/MultipliersSection";
import "../../styles/pages/timer/timer-page.css"
import { Box, Paper } from "@material-ui/core";
import CountdownTimerSection from "./sections/CountdownTimerSection";

const TimerPage = () => {
  return (
    <Box className={"box"}>
      <Paper
        elevation={3}
        className={"main-container"}>
        <div
          className={"sub-container"}>
          <CountdownInputSection
            label={"Countdown"}
            buttonText={"Start"}/>
          <CountdownTimerSection
            halfwayWarning={0.5}
            colorWarning={20}
            blinkWarning={10}
            halfwayWarningText={"More than halfway there!"}
            timesUpText={"Time’s up!"}/>
          <MultipliersSection
            multipliers={[1, 1.5, 2]}
            defaultIndex={0}/>
        </div>
      </Paper>
    </Box>
  );
}

export default TimerPage;