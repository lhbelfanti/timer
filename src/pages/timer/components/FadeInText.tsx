import React, { useEffect, useState } from "react";
import { Collapse, IconButton } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { TimerEvents } from "../../../state/actions";
import { useActions } from "../../../hooks/useActions";
import { Close } from "@material-ui/icons";

interface FadeInTextProps {
  halfwayWarningText: string,
  timesUpText: string
}

interface FadeInTextState {
  isEnable: boolean,
  text: string,
}

const FadeInText = (props: FadeInTextProps) => {
  const [state, setState] = useState<FadeInTextState>({ isEnable: false, text: ""});
  const { event } = useTypedSelector((state) => state.timer);
  const { triggerTimerEvent } = useActions();

  const closeAlert = () => {
    setState({...state, isEnable: false});
  }

  useEffect(() => {
    if (event === TimerEvents.RESET) {
      closeAlert();
    } else if (event === TimerEvents.HALFWAY_WARNING) {
      setState({isEnable: true, text: props.halfwayWarningText});
    } else if (event === TimerEvents.TIME_IS_UP) {
      setState({...state, isEnable: true, text: props.timesUpText});
    }
  }, [event, props.halfwayWarningText, props.timesUpText, closeAlert, state, triggerTimerEvent]);

  return (
    <Collapse in={state.isEnable}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => { closeAlert(); }}>
            <Close fontSize="inherit"/>
          </IconButton>
        }
        severity={"info"}>
        {state.text}
      </Alert>
    </Collapse>
  );
}

export default FadeInText;