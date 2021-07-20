import React, { useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { TimerEvents } from "../../../state/actions";
import { stringToMinSec } from "../timerHelper";
import Button from "@material-ui/core/Button";
import CountdownInput from "../components/CountdownInput";
import AlarmIcon from '@material-ui/icons/Alarm';
import { ChipLabel, Container } from "../../../types";

interface CountdownInputSectionProps {
  label: string
  buttonText: string
}

const CountdownInputSection = (props: CountdownInputSectionProps) => {
  const [value, setValue] = useState("00:00");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const {setTimer, triggerTimerEvent, resumeTimer} = useActions();

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
    <Container
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={"90%"}>
      <ChipLabel
        label={props.label.toLocaleUpperCase()}
        color="primary"
        fontSize={"14px"}/>
      <CountdownInput
        onChange={onInputDataChange}
        onFocusOut={onBlur}
        value={value}/>
      <Button
        variant="contained"
        color="primary"
        disabled={buttonDisabled}
        onClick={onButtonClick}>
        <Container
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mr={"2px"} ml={"2px"}>
          <AlarmIcon/>
          {props.buttonText}
        </Container>
      </Button>
    </Container>
  );
}

export default CountdownInputSection;