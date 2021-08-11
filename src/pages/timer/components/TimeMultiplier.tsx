import React from "react";
import { useActions } from "../../../hooks/useActions";
import { TimerEvents } from "../../../state/actions";
import { Button } from "../../../types"

interface TimeMultiplierProps {
  multiplier: number,
  onMultiplierClicked: () => void;
  variant: "outlined" | "contained"
}

const TimeMultiplier = (props: TimeMultiplierProps) => {
  const buttonText = `${props.multiplier.toString()}X`;
  const {changeTimerSpeed, triggerTimerEvent} = useActions();

  const onClick = () => {
    changeTimerSpeed(props.multiplier);
    triggerTimerEvent(TimerEvents.SPEED_CHANGED);
    props.onMultiplierClicked();
  }

  return (
    <Button
      variant={props.variant}
      color="primary"
      onClick={onClick}
      mr={2} ml={2}>
      {buttonText}
    </Button>
  );
}

export default TimeMultiplier;