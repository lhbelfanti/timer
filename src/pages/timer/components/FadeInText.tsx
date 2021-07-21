import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import { Close } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { TimerEvents } from "../../../state/actions";

interface FadeInTextProps {
  halfwayWarningText: string,
  timesUpText: string
}

const FadeInText = (props: FadeInTextProps) => {
  const [isEnable, setIsEnable] = useState(false);
  const [text, setText] = useState("");
  const {event} = useTypedSelector((state) => state.timer);

  useEffect(() => {
    if (event === TimerEvents.RESET) {
      setIsEnable(false);
    } else if (event === TimerEvents.HALFWAY_WARNING) {
      setIsEnable(true);
      setText(props.halfwayWarningText);
    } else if (event === TimerEvents.TIME_IS_UP) {
      setIsEnable(true);
      setText(props.timesUpText);
    }
  }, [event, props.halfwayWarningText, props.timesUpText]);

  return (
    <Collapse in={isEnable}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setIsEnable(false)
            }}>
            <Close fontSize="inherit"/>
          </IconButton>
        }
        severity={"info"}>
        {text}
      </Alert>
    </Collapse>
  );
}

export default FadeInText;