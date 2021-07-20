import React, { useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { TimerEvents } from "../../../state/actions";
import { Pause, PlayArrow } from "@material-ui/icons/";
import { Button } from "../../../types"

interface PauseButtonState {
  isPaused: boolean
}

const PauseButton = () => {
  const [state, setState] = useState<PauseButtonState>({isPaused: true});
  const {paused} = useTypedSelector((state) => state.timer);
  const {pauseTimer, resumeTimer, triggerTimerEvent} = useActions();

  const onButtonClick = () => {
    if (state.isPaused) {
      resumeTimer();
      triggerTimerEvent(TimerEvents.RESUME);
    } else {
      pauseTimer();
    }

    setState({isPaused: !state.isPaused});
  }

  useEffect(() => {
    if (paused !== state.isPaused)
      setState({isPaused: paused});
  }, [paused, state.isPaused]);

  return (
    <Button
      variant="contained"
      color="primary"
      aria-label="pause"
      onClick={onButtonClick}
      marginLeft={2}
      borderRadius={100}>
      {!state.isPaused ? <Pause/> : <PlayArrow/>}
    </Button>
  );
}

export default PauseButton;