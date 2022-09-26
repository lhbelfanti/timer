import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import React from "react";
import NumberFormat from "react-number-format";
import { getSecondsFromMMSS, timerLimit, toMMSS } from "../timerHelper";

interface CountdownInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocusOut: (value: string) => void
  value: string,
}

const useStyles = makeStyles({
  countdownInput: {
    width: "130px",
    margin: "0 20px",
    "& input[type=\"text\"]": {
      fontSize: "30px",
      textAlign: "center"
    }
  },
});

const CountdownInput = (props: CountdownInputProps) => {
  const classes = useStyles();
  const {onChange, value} = props;
  console.log(value)

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
      mask={["M", "M", "S", "S"]}
      customInput={TextField}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      id="countdown-input"
      className={classes.countdownInput}
    />
  )
}

export default CountdownInput;