import reducer from "../../../state/reducers/timerReducer";
import { ActionType } from "../../../state/action-types";
import { TimerEvents } from "../../../state/actions";

describe("Timer reducer Tests Suite", () => {

  const initialState = {
    event: null,
    speed: 1,
    paused: true,
    data: { min: 0, sec: 0 }
  };

  const setTimerState = {
    event: null,
    speed: 1,
    paused: true,
    data: { min: 2, sec: 8 }
  };

  const timerEventState = {
    event: TimerEvents.COLOR_WARNING,
    speed: 1,
    paused: true,
    data: { min: 0, sec: 0 }
  };

  const timerSpeedState = {
    event: null,
    speed: 1.5,
    paused: true,
    data: { min: 0, sec: 0 }
  };

  const pauseTimerState = {
    event: null,
    speed: 1,
    paused: true,
    data: { min: 0, sec: 0 }
  };

  const resumeTimerState = {
    event: null,
    speed: 1,
    paused: false,
    data: { min: 0, sec: 0 }
  };

  test("Initial state", () => {
    const currentState = reducer(undefined, { type: ActionType.DEFAULT });
    expect(currentState).toEqual(initialState);
  });

  test("Handles timer change state", () => {
    const currentState = reducer(initialState, { type: ActionType.SET_TIMER, payload: { min: 2, sec: 8 } });
    expect(currentState).toEqual(setTimerState);
  });

  test("Handles timer event state", () => {
    const currentState = reducer(initialState, { type: ActionType.TRIGGER_TIMER_EVENT, payload: TimerEvents.COLOR_WARNING });
    expect(currentState).toEqual(timerEventState);
  });

  test("Handles timer speed state", () => {
    const currentState = reducer(initialState, { type: ActionType.CHANGE_TIMER_SPEED, payload: 1.5 });
    expect(currentState).toEqual(timerSpeedState);
  });

  test("Handles pause timer state", () => {
    const currentState = reducer(initialState, { type: ActionType.PAUSE_TIMER });
    expect(currentState).toEqual(pauseTimerState);
  });

  test("Handles resume timer state", () => {
    const currentState = reducer(initialState, { type: ActionType.RESUME_TIMER });
    expect(currentState).toEqual(resumeTimerState);
  });
});