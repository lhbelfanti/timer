import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"
import thunk from "redux-thunk";
import * as typedSelectorHook from "../../../../hooks/useTypedSelector";
import CountdownTimer from "../../../../pages/timer/components/CountdownTimer";
import * as timerHelper from "../../../../pages/timer/timerHelper";
import { TimerData } from "../../../../state";
import { ActionType } from "../../../../state/action-types";
import { TimerEvents } from "../../../../state/actions";

describe("CountdownTimer Component Tests Suite", () => {

  /* Mock values */
  const mockStore = configureStore([thunk]);
  const halfwayWarningPercentage = 0.5;
  const colorWarningThreshold = 20;
  const blinkWarningThreshold = 10;
  const initialState = { speed: 1 };
  const getSecondsReturnMock = 0;
  const speedToMillisecondsReturnMock = 100;

  /* Tests */
  const renderComponent = (
    event: TimerEvents | null = null,
    data: TimerData = { min: 0, sec: 0 },
    paused: boolean = false,
    getSecondsReturnValue = getSecondsReturnMock
  ) => {
    jest.spyOn(typedSelectorHook, "useTypedSelector")
      .mockImplementation(() => { return {...initialState, data, event, paused}; });
    jest.spyOn(timerHelper, "getSeconds").mockReturnValue(getSecondsReturnValue);
    jest.spyOn(timerHelper, "speedToMilliseconds").mockReturnValue(speedToMillisecondsReturnMock);

    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <CountdownTimer
          halfwayWarningPercentage={halfwayWarningPercentage}
          colorWarningThreshold={colorWarningThreshold}
          blinkWarningThreshold={blinkWarningThreshold}
        />
      </Provider>
    );

    return store;
  }

  test("Initial state", () => {
    renderComponent();
    expect(screen.getByRole("heading", {level: 1, name: "00:00"})).toBeInTheDocument();
  });

  test("Paused state", () => {
    const store = renderComponent(null, { min: 0, sec: 0 }, true);
    expect(screen.getByRole("heading", {level: 1, name: "00:00"})).toBeInTheDocument();
    expect(store.getActions()).toStrictEqual([]);
  });

  test("Resume state with timer in 00:00", async () => {
    const store = renderComponent(TimerEvents.RESUME, { min: 0, sec: 0 });
    expect(screen.getByRole("heading", {level: 1, name: "00:00"})).toBeInTheDocument();
    await new Promise((r) => setTimeout(r, speedToMillisecondsReturnMock + 50));
    const actions = [
      {"type": ActionType.TRIGGER_TIMER_EVENT, "payload": null},
      {"type": ActionType.SET_TIMER, "payload": { min: 0, sec: 0 }},
      {"type": ActionType.PAUSE_TIMER}
    ];
    expect(store.getActions()).toStrictEqual(actions);
  });

  describe("Handle TimerEvents", () => {
    const defaultAction = {"type": ActionType.TRIGGER_TIMER_EVENT, "payload": null};
    const anyEventAction = [ defaultAction, {"type": ActionType.SET_TIMER, "payload": { min: 0, sec: 0 }}];
    const textStyleAction = [defaultAction, defaultAction];
    const timeIsUpAction = [defaultAction, {"type": ActionType.PAUSE_TIMER}];

    test("Handle RESET event", () => {
      const store = renderComponent(TimerEvents.RESET);
      expect(screen.getByRole("heading", {level: 1, name: "00:00"})).toBeInTheDocument();
      expect(store.getActions()).toStrictEqual(anyEventAction);
    });

    test("Handle RESUME event", () => {
      const store = renderComponent(TimerEvents.RESUME);
      expect(screen.getByRole("heading", {level: 1, name: "00:00"})).toBeInTheDocument();
      expect(store.getActions()).toStrictEqual(anyEventAction);
    });

    test("Handle SPEED_CHANGE event", () => {
      const store = renderComponent(TimerEvents.SPEED_CHANGED);
      expect(screen.getByRole("heading", {level: 1, name: "00:00"})).toBeInTheDocument();
      expect(store.getActions()).toStrictEqual(anyEventAction);
    });

    test("Handle HALFWAY_WARNING event", () => {
      const store = renderComponent(TimerEvents.HALFWAY_WARNING);
      expect(screen.getByRole("heading", {level: 1, name: "00:00"})).toBeInTheDocument();
      expect(store.getActions()).toStrictEqual([defaultAction]);
    });

    test("Handle COLOR_WARNING event", () => {
      const store = renderComponent(TimerEvents.COLOR_WARNING);
      const timer = screen.getByRole("heading", {level: 1, name: "00:00"});
      expect(timer).toBeInTheDocument();
      expect(timer.className).toMatch(/countdownInputRed/i);
      expect(store.getActions()).toStrictEqual(textStyleAction);
    });

    test("Handle BLINK_WARNING event", () => {
      const store = renderComponent(TimerEvents.BLINK_WARNING);
      const timer = screen.getByRole("heading", {level: 1, name: "00:00"});
      expect(timer).toBeInTheDocument();
      expect(timer.className).toMatch(/countdownTimerBlink/i);
      expect(store.getActions()).toStrictEqual(textStyleAction);
    });

    test("Handle TIME_IS_UP event", () => {
      const store = renderComponent(TimerEvents.TIME_IS_UP);
      const timer = screen.getByRole("heading", {level: 1, name: "00:00"});
      expect(timer).toBeInTheDocument();
      expect(store.getActions()).toStrictEqual(timeIsUpAction);
    });
  });

  describe("Handle the dispatch of the TimerEvents", () => {
    const defaultAction = {"type": ActionType.TRIGGER_TIMER_EVENT, "payload": null};
    const pauseTimerAction = {"type": ActionType.PAUSE_TIMER};
    const milliseconds = speedToMillisecondsReturnMock + 50;

    type ActionsArray = ({ type: ActionType; payload: null; } |
      { type: ActionType; payload: TimerData; } |
      { type: ActionType; payload: TimerEvents; } |
      { type: ActionType; })[];

    const getActionsBySecAndType = (time: TimerData, event: TimerEvents) => {
      const actions: ActionsArray = [
        defaultAction,
        pauseTimerAction,
        {"type": ActionType.SET_TIMER, "payload": time},
        {"type": ActionType.SET_TIMER, "payload": time},
        {"type": ActionType.TRIGGER_TIMER_EVENT, "payload": event}
      ]
      return actions;
    }

    test("Dispatch HALFWAY_WARNING event", async() => {
      const store = renderComponent(TimerEvents.RESET,{ min: 0, sec: 60 }, false, 30);
      const time = { min: 0, sec: 59 };
      const event = TimerEvents.HALFWAY_WARNING;
      await new Promise((r) => setTimeout(r, milliseconds));
      const actions = [defaultAction,
        {"type": ActionType.SET_TIMER, "payload": time},
        {"type": ActionType.SET_TIMER, "payload": time},
        {"type": ActionType.TRIGGER_TIMER_EVENT, "payload": event}
      ];
      expect(store.getActions()).toStrictEqual(actions);
    });

    test("Dispatch COLOR_WARNING event", async() => {
      const store = renderComponent(TimerEvents.RESET,{ min: 0, sec: 21 }, false, colorWarningThreshold);
      const time = { min: 0, sec: 20 };
      const event = TimerEvents.COLOR_WARNING;
      await new Promise((r) => setTimeout(r, milliseconds));
      expect(store.getActions()).toStrictEqual(getActionsBySecAndType(time, event));
    });

    test("Dispatch BLINK_WARNING event", async() => {
      const store = renderComponent(TimerEvents.RESET,{ min: 0, sec: 11 }, false, blinkWarningThreshold);
      const time = { min: 0, sec: 10 };
      const event = TimerEvents.BLINK_WARNING;
      await new Promise((r) => setTimeout(r, milliseconds));
      expect(store.getActions()).toStrictEqual(getActionsBySecAndType(time, event));
    });

    test("Dispatch TIME_IS_UP event", async() => {
      const store = renderComponent(TimerEvents.RESET,{ min: 0, sec: 1 }, false, 0);
      const time = { min: 0, sec: 0 };
      const event = TimerEvents.TIME_IS_UP;
      await new Promise((r) => setTimeout(r, milliseconds));
      const actions = getActionsBySecAndType(time, event).concat([pauseTimerAction]);
      expect(store.getActions()).toStrictEqual(actions);
    });
  });
});