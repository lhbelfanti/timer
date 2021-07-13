import { ActionType } from "../action-types";
import { Action, TimerEvent } from "../actions";
import { Dispatch } from "react";

export const triggerTimerEvent = (event: TimerEvent) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch ({
      type: ActionType.TRIGGER_TIMER_EVENT,
      payload: event
    });
  }
}