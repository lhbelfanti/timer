import React from "react";
import { useActions } from "../../../hooks/useActions";
import { TimerEvents } from "../../../state/actions";
import { Button } from "@material-ui/core";
import "../../../styles/pages/timer/sections/multiplier-section.css";

interface TimeMultiplierProps {
  multiplier: number,
  onMultiplierClicked: () => void;
  variant: "outlined" | "contained"
}

const TimeMultiplier = (props: TimeMultiplierProps) => {
  const buttonText = `${props.multiplier.toString()}X`;
  const { changeTimerSpeed, triggerTimerEvent } = useActions();

  const onClick = () => {
    changeTimerSpeed(props.multiplier);
    triggerTimerEvent(TimerEvents.SPEED_CHANGED);
    props.onMultiplierClicked();
  }

  return (
    <div>
      <Button
        variant={props.variant}
        color="primary"
        onClick={onClick}
        className={"multiplier-button"}>
        { buttonText }
      </Button>
    </div>
  );
}

export default TimeMultiplier;