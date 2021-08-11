import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"
import thunk from "redux-thunk";
import TimeMultiplier from "../../../../pages/timer/components/TimeMultiplier";
import { ActionType } from "../../../../state/action-types";
import { TimerEvents } from "../../../../state/actions";

describe("TimeMultiplier Component Tests Suite", () => {

  /* Mock values */
  const mockStore = configureStore([thunk]);
  const initialState = { event: null, speed: 1, paused: true, data: { min: 0, sec: 0 } };
  const onClickMock = jest.fn();
  const actions = [
    {"type": ActionType.CHANGE_TIMER_SPEED, "payload": 1},
    {"type": ActionType.TRIGGER_TIMER_EVENT, "payload": TimerEvents.SPEED_CHANGED}
  ];

  /* Tests */
  const renderComponent = (multiplier:number, variant: "outlined" | "contained") => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <TimeMultiplier multiplier={multiplier} onMultiplierClicked={onClickMock} variant={variant}/>
      </Provider>
    );

    return store;
  }

  test("Initial state selected button", () => {
    const multiplier = 1;
    renderComponent(multiplier, "contained");
    const buttonText = `${multiplier}X`
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(buttonText);
    expect(button.className).toMatch(/MuiButton-contained/i);
  });

  test("Initial state unselected button", () => {
    const multiplier = 1;
    renderComponent(multiplier, "outlined");
    const buttonText = `${multiplier}X`
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(buttonText);
    expect(button.className).toMatch(/MuiButton-outlined/i);
  });

  test("Selected button clicked", () => {
    const store = renderComponent(1, "contained");
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(onClickMock).toBeCalledTimes(1);
    expect(store.getActions()).toStrictEqual(actions);
  });

  test("Unselected button clicked", () => {
    const store = renderComponent(1, "outlined");
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(onClickMock).toBeCalledTimes(1);
    expect(store.getActions()).toStrictEqual(actions);
  });
});