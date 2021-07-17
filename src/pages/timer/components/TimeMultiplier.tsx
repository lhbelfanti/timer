import React from "react";
import { useActions } from "../../../hooks/useActions";
import { TimerEvents } from "../../../state/actions";
import "../../../styles/pages/timer/sections/multiplier-section.css";
import { styled } from "@material-ui/core/styles";
import MuiButton from "@material-ui/core/Button";
import { spacing } from "@material-ui/system";

interface TimeMultiplierProps {
  multiplier: number,
  onMultiplierClicked: () => void;
  variant: "outlined" | "contained"
}

const Button = styled(MuiButton)(spacing);

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
        mr={2}
        ml={2}>
        { buttonText }
      </Button>
    </div>
  );
}

export default TimeMultiplier;