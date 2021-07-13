import { ActionType } from "../action-types";

interface UpdateTimerDataAction {
  type: ActionType.TIMER_UPDATE;
  payload: {min: number, sec: number}
}

export enum TimerEvents {
  HALFWAY_WARNING = "first_warning",
  COLOR_WARNING = "color_warning",
  BLINK_WARNING = "blink_warning",
  RESET = "reset",
  RESUME = "resume",
  SPEED_CHANGED = "speed",
  TIME_IS_UP = "time_is_up",
}

export type TimerEvent =
  | TimerEvents.HALFWAY_WARNING
  | TimerEvents.COLOR_WARNING
  | TimerEvents.BLINK_WARNING
  | TimerEvents.RESET
  | TimerEvents.RESUME
  | TimerEvents.SPEED_CHANGED
  | TimerEvents.TIME_IS_UP
  | null;

interface TriggerTimerEventAction {
  type: ActionType.TRIGGER_TIMER_EVENT;
  payload: TimerEvent
}

interface ChangeTimerSpeed {
  type: ActionType.CHANGE_TIMER_SPEED;
  payload: number
}

interface PauseTimer {
  type: ActionType.PAUSE_TIMER;
}

interface ResumeTimer {
  type: ActionType.RESUME_TIMER;
}

export type Action =
  | UpdateTimerDataAction
  | TriggerTimerEventAction
  | ChangeTimerSpeed
  | PauseTimer
  | ResumeTimer