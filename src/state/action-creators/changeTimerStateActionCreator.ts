import { Dispatch } from "react";
import { ActionType } from "../action-types";
import { Action } from "../actions";

export const pauseTimer = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.PAUSE_TIMER
    });
  };
};

export const resumeTimer = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.RESUME_TIMER
    });
  };
};
