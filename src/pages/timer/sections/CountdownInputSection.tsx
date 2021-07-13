import React, { useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { TimerEvents } from "../../../state/actions";
import { stringToMinSec } from "../timerHelper";
import { Button, Chip } from "@material-ui/core";
import CountdownInput from "../components/CountdownInput";
import AlarmIcon from '@material-ui/icons/Alarm';
import "../../../styles/pages/timer/sections/coundown-input-section.css"

interface CountdownInputSectionProps {
  label: string
  buttonText: string
}

const CountdownInputSection = (props: CountdownInputSectionProps) => {
  const [value, setValue] = useState("00:00");
  const { updateTimer, triggerTimerEvent, resumeTimer } = useActions();

  const onInputDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  const onBlur = (val: string) => {
    setValue(val);
  };

  const onButtonClick = () => {
    const time = stringToMinSec(value);
    resumeTimer();
    updateTimer(time);
    triggerTimerEvent(TimerEvents.RESET);
  }

  return (
    <div className={"countdown-input-section-main-container"}>
      <Chip
        label={props.label.toLocaleUpperCase()}
        color="primary"
        className={"countdown-label"}/>
      <CountdownInput
        onChange={onInputDataChange}
        onFocusOut={onBlur}
        value={value}/>
      <Button
        variant="contained"
        color="primary"
        onClick={onButtonClick}
        className={"countdown-button"}>
        <div className={"countdown-button-label"}>
          <AlarmIcon />
          {props.buttonText}
        </div>
      </Button>
    </div>
  );
}

export default CountdownInputSection;