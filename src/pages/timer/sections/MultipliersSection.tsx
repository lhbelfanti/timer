import React, { useState } from "react";
import TimeMultiplier from "../components/TimeMultiplier";
import "../../../styles/pages/timer/sections/multiplier-section.css";

export interface MultipliersContainerProps {
  multipliers: Array<number>,
  defaultIndex: number
}

const MultipliersSection = (props: MultipliersContainerProps) => {
  const {multipliers, defaultIndex} = props;

  const [clickedId, setClickedId] = useState(-1);

  const buttonClicked = "contained";
  const buttonNotClicked = "outlined";

  const defineVariant = (i: number) => {
    if (clickedId === -1 && defaultIndex === i) {
      setClickedId(defaultIndex);
      return buttonClicked;
    }

    return i === clickedId ? buttonClicked : buttonNotClicked;
  }

  return (
    <div className={"multiplier-section-main-container"}>
      {multipliers.map((e, i) => (
        <TimeMultiplier
          key={i}
          multiplier={e}
          onMultiplierClicked={() => { setClickedId(i); }}
          variant={ defineVariant(i) }
        />
      ))}
    </div>
  );
}

export default MultipliersSection;