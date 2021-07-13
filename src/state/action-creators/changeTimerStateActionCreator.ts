import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Dispatch } from "react";

export const pauseTimer = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch ({
      type: ActionType.PAUSE_TIMER
    });
  }
}

export const resumeTimer = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch ({
      type: ActionType.RESUME_TIMER
    });
  }
}
