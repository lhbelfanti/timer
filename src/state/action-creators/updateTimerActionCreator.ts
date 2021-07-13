import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Dispatch } from "react";

export const updateTimer = (time: {min: number, sec: number}) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch ({
      type: ActionType.TIMER_UPDATE,
      payload: time
    })
  }
}