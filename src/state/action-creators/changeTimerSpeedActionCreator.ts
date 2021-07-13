import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Dispatch } from "react";

export const changeTimerSpeed = (multiplier: number) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch ({
      type: ActionType.CHANGE_TIMER_SPEED,
      payload: multiplier
    });
  }
}