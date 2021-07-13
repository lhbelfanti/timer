import React from "react";
import NumberFormat from "react-number-format";
import { TextField } from "@material-ui/core";
import { getSecondsFromMMSS, timerLimit, toMMSS } from "../timerHelper";
import "../../../styles/pages/timer/sections/coundown-input-section.css"

interface CountdownInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocusOut: (value: string) => void
  value: string,
}

const CountdownInput = (props: CountdownInputProps) => {
  const { onChange, value } = props;

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const seconds = Math.max(0, getSecondsFromMMSS(newValue));

    const time = toMMSS(seconds);
    props.onFocusOut(time);
  };

  return (
    <NumberFormat
      format={timerLimit}
      placeholder="MM:SS"
      mask={['M', 'M', 'S', 'S']}
      customInput={TextField}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      id="countdown-input"
      className={"countdown-input"}
    />
  )
}

export default CountdownInput;