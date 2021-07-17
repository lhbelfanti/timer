import React, { useEffect, useState } from "react";
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
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { setTimer, triggerTimerEvent, resumeTimer } = useActions();

  useEffect(() => {
    const v = value.split(":").join("").replaceAll("0", "");
    setButtonDisabled(v.length === 0);
  }, [value])

  const onInputDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  const onBlur = (val: string) => {
    setValue(val);
  };

  const onButtonClick = () => {
    const time = stringToMinSec(value);
    resumeTimer();
    setTimer(time);
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
        disabled={buttonDisabled}
        onClick={onButtonClick}>
        <div className={"countdown-button-label"}>
          <AlarmIcon />
          {props.buttonText}
        </div>
      </Button>
    </div>
  );
}

export default CountdownInputSection;