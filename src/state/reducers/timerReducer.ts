import { ActionType } from "../action-types";
import { Action } from "../actions";
import { TimerData } from "../types";

interface TimerState {
  event: string | null;
  speed: number;
  paused: boolean;
  data: TimerData;
}

const initialState = {
  event: null,
  speed: 1,
  paused: true,
  data: {min: 0, sec: 0}
}

const reducer = (
  state: TimerState = initialState,
  action: Action
): TimerState => {
  switch (action.type) {
    case ActionType.SET_TIMER:
      return {...state, data: action.payload}
    case ActionType.TRIGGER_TIMER_EVENT:
      return {...state, event: action.payload}
    case ActionType.CHANGE_TIMER_SPEED:
      return {...state, speed: action.payload}
    case ActionType.PAUSE_TIMER:
      return {...state, paused: true}
    case ActionType.RESUME_TIMER:
      return {...state, paused: false}
    default:
      return state;
  }
}

export default reducer;