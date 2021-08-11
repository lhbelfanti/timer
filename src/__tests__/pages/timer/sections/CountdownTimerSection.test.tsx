import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"
import thunk from "redux-thunk";
import * as typedSelectorHook from "../../../../hooks/useTypedSelector";
import CountdownTimerSection from "../../../../pages/timer/sections/CountdownTimerSection";

describe("CountdownInputSection Component Tests Suite", () => {

  /* Mock values */
  const mockStore = configureStore([thunk]);
  const initialState = { event: null, speed: 1, paused: true, data: { min: 0, sec: 0 } };

  /* Tests */
  const renderComponent = () => {
    jest.spyOn(typedSelectorHook, "useTypedSelector").mockImplementation(() => { return initialState });

    render(
      <Provider store={mockStore(initialState)}>
        <CountdownTimerSection
          halfwayWarningPercentage={0.5}
          colorWarningThreshold={20}
          blinkWarningThreshold={10}
          halfwayWarningText={"Test1"}
          timesUpText={"Test2"}
        />
      </Provider>
    );
  }

  test("Initial state", () => {
    renderComponent();
    expect(screen.getByRole("heading")).toBeInTheDocument(); // Timer text
    expect(screen.getByRole("button")).toBeInTheDocument(); // Pause / play button
  });
});