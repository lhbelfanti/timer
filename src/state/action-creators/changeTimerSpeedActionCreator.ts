import { Dispatch } from "react";
import { ActionType } from "../action-types";
import { Action } from "../actions";

export const changeTimerSpeed = (multiplier: number) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CHANGE_TIMER_SPEED,
      payload: multiplier
    });
  };
};
