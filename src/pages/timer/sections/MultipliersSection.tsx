import React, { useState } from "react";
import { Container } from "../../../types";
import TimeMultiplier from "../components/TimeMultiplier";

export interface MultipliersContainerProps {
  multipliers: number[],
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
    <Container
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"90%"}
      mr={5} ml={5}>
      {multipliers.map((e, i) => (
        <TimeMultiplier
          key={i}
          multiplier={e}
          onMultiplierClicked={() => {
            setClickedId(i);
          }}
          variant={defineVariant(i)}
        />
      ))}
    </Container>
  );
}

export default MultipliersSection;