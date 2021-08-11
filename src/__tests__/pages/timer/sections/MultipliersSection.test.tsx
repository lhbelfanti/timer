import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"
import thunk from "redux-thunk";
import MultipliersSection from "../../../../pages/timer/sections/MultipliersSection";

describe("CountdownInputSection Component Tests Suite", () => {

  /* Mock values */
  const mockStore = configureStore([thunk]);
  const initialState = { event: null, speed: 1, paused: true, data: { min: 0, sec: 0 } };
  const multipliers = [1, 1.5, 2];

  /* Tests */
  const renderComponent = (store = mockStore(initialState)) => {
    render(
      <Provider store={store}>
        <MultipliersSection multipliers={multipliers} defaultIndex={0}/>
      </Provider>
    );

    return store;
  }

  test("Initial state", () => {
    renderComponent();
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(multipliers.length);

    // Selected style = MuiButton-contained -- Unselected style = MuiButton-outlined
    expect(screen.getByRole("button", {name: "1X"}).className).toMatch(/MuiButton-contained/i);
    expect(screen.getByRole("button", {name: "1.5X"}).className).toMatch(/MuiButton-outlined/i);
    expect(screen.getByRole("button", {name: "2X"}).className).toMatch(/MuiButton-outlined/i);
  });

  test("Multiplier button clicked", () => {
    renderComponent();
    const multiplier2X = screen.getByRole("button", {name: "2X"});
    userEvent.click(multiplier2X);

    expect(screen.getByRole("button", {name: "1X"}).className).toMatch(/MuiButton-outlined/i);
    expect(screen.getByRole("button", {name: "1.5X"}).className).toMatch(/MuiButton-outlined/i);
    expect(multiplier2X.className).toMatch(/MuiButton-contained/i);
  });
});