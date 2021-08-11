import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"
import thunk from "redux-thunk";
import CountdownInputSection from "../../../../pages/timer/sections/CountdownInputSection";
import { ActionType } from "../../../../state/action-types";
import { TimerEvents } from "../../../../state/actions";

describe("CountdownInputSection Component Tests Suite", () => {

  /* Mock values */
  const mockStore = configureStore([thunk]);
  const initialState = { event: null, speed: 1, paused: true, data: { min: 0, sec: 0 } };
  const countdownLabelText = "Countdown";
  const startButtonText = "Start";
  const defaultValue = "00:00";
  const onClickActions = [
    {"type": ActionType.RESUME_TIMER},
    {"type": ActionType.SET_TIMER, "payload": { min: 0, sec: 30 }},
    {"type": ActionType.TRIGGER_TIMER_EVENT, "payload": TimerEvents.RESET}
  ];

  /* Tests */
  const renderComponent = () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <CountdownInputSection label={countdownLabelText} buttonText={startButtonText}/>
      </Provider>
    );

    return store;
  }

  test("Initial state", () => {
    renderComponent();
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(defaultValue);
    const startButton = screen.getByRole("button");
    expect(startButton).toBeInTheDocument();
    expect(startButton.className).toMatch(/Mui-disabled/i); // Should be disabled by default;
    expect(screen.getByText(countdownLabelText.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText(startButtonText)).toBeInTheDocument();
  });

  test("Input valid time", () => {
    renderComponent();
    const startButton = screen.getByRole("button");
    expect(startButton).toBeInTheDocument();
    expect(startButton.className).toMatch(/Mui-disabled/i);

    const input = screen.getByRole("textbox");
    userEvent.clear(input);
    const newValue = "30";
    userEvent.type(input, newValue);
    startButton.focus(); // To execute onBlur and process the text adding the 00: at the start of it
    expect(input).toHaveValue("00:30");

    expect(startButton.className).not.toMatch(/Mui-disabled/i);
  });

  test("Input invalid time", () => {
    renderComponent();
    const startButton = screen.getByRole("button");
    expect(startButton).toBeInTheDocument();
    expect(startButton.className).toMatch(/Mui-disabled/i);

    const input = screen.getByRole("textbox");
    userEvent.clear(input);
    const newValue = "00:00";
    userEvent.type(input, newValue);
    expect(input).toHaveValue("00:00");

    expect(startButton.className).toMatch(/Mui-disabled/i);
  });

  test("Start button clicked", () => {
    const store = renderComponent();
    const input = screen.getByRole("textbox");
    userEvent.clear(input);
    const newValue = "30";
    userEvent.type(input, newValue);
    const startButton = screen.getByRole("button");
    startButton.focus();
    userEvent.click(startButton);
    expect(store.getActions()).toStrictEqual(onClickActions);
  });
});