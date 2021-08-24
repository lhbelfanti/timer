import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"
import thunk from "redux-thunk";
import * as typedSelectorHook from "../../../hooks/useTypedSelector";
import TimerPage from "../../../pages/timer/TimerPage";

describe("CountdownInputSection Component Tests Suite", () => {

  /* Mock values */
  const mockStore = configureStore([thunk]);
  const initialState = { event: null, speed: 1, paused: true, data: { min: 0, sec: 0 } };

  /* Tests */
  const renderComponent = () => {
    jest.spyOn(typedSelectorHook, "useTypedSelector").mockImplementation(() => { return initialState });

    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <TimerPage/>
      </Provider>
    );

    return store;
  }

  test("Initial state", () => {
    renderComponent();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Start"})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "pause"})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "1X"})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "1.5X"})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "2X"})).toBeInTheDocument();
  });
});