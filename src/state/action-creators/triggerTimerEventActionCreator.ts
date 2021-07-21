import { Dispatch } from "react";
import { ActionType } from "../action-types";
import { Action, TimerEvent } from "../actions";

export const triggerTimerEvent = (event: TimerEvent) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.TRIGGER_TIMER_EVENT,
      payload: event
    });
  };
};
