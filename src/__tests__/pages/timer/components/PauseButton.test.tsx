import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"
import thunk from "redux-thunk";
import * as typedSelectorHook from "../../../../hooks/useTypedSelector";
import PauseButton from "../../../../pages/timer/components/PauseButton";
import { ActionType } from "../../../../state/action-types";
import { TimerEvents } from "../../../../state/actions";

describe("PauseButton Component Tests Suite", () => {

  /* Mock values */
  const mockStore = configureStore([thunk]);
  const initialState = { event: null, speed: 1, paused: true, data: { min: 0, sec: 0 } };
  const pauseState = { event: null, speed: 1, data: { min: 0, sec: 0 } };
  const actionsAfterClickWhenPaused = [
    {"type": ActionType.RESUME_TIMER},
    {"type": ActionType.TRIGGER_TIMER_EVENT, "payload": TimerEvents.RESUME}
  ];
  const actionsAfterClickWhenNotPaused = [{"type": ActionType.PAUSE_TIMER}];

  /* Tests */
  const renderComponent = (isPaused: boolean) => {
    jest.spyOn(typedSelectorHook, "useTypedSelector").mockImplementation(() => {
      return {...pauseState, paused: isPaused}
    });

    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <PauseButton/>
      </Provider>
    );

    return store;
  }

  test("Is paused", () => {
    renderComponent(true);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.queryByTestId("play-svg")).toBeInTheDocument();
    expect(screen.queryByTestId("pause-svg")).not.toBeInTheDocument();
  });

  test("Is not paused", () => {
    renderComponent(false);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.queryByTestId("play-svg")).not.toBeInTheDocument();
    expect(screen.queryByTestId("pause-svg")).toBeInTheDocument();
  });

  test("Button click with paused state", () => {
    const store = renderComponent(true);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(screen.queryByTestId("play-svg")).toBeInTheDocument();
    expect(screen.queryByTestId("pause-svg")).not.toBeInTheDocument();
    userEvent.click(button);
    expect(store.getActions()).toStrictEqual(actionsAfterClickWhenPaused);

  });

  test("Button click with not paused state", () => {
    const store = renderComponent(false);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(screen.queryByTestId("play-svg")).not.toBeInTheDocument();
    expect(screen.queryByTestId("pause-svg")).toBeInTheDocument();
    userEvent.click(button);
    expect(store.getActions()).toStrictEqual(actionsAfterClickWhenNotPaused);
  });
});