import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { PatternFormat } from "react-number-format";
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

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const seconds = Math.max(0, getSecondsFromMMSS(newValue));

    const time = toMMSS(seconds);
    props.onFocusOut(time);
  };

  return (
    <PatternFormat
      id="countdown-input"
      className={classes.countdownInput}
      value={value}
      valueIsNumericString={true}
      placeholder="MM:SS"
      customInput={TextField}
      onChange={onChange}
      onBlur={onBlur}
      allowEmptyFormatting={true}
      format={"##:##"}
      mask={"MMSS"}
    />
  )
}

export default CountdownInput;