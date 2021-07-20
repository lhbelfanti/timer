import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Dispatch } from "react";
import { TimerData } from "../types";

export const setTimer = (time: TimerData) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_TIMER,
      payload: time
    });
  }
}