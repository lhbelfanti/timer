import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import * as typedSelectorHook from "../../../../hooks/useTypedSelector";
import FadeInText from "../../../../pages/timer/components/FadeInText";
import { TimerEvents } from "../../../../state/actions";
import { TimerState } from "../../../../state/reducers/timerReducer";

describe("FadeInText Component Tests Suite", () => {

  /* Mock values */
  const halfwayWarningText = "Warning";
  const timesUpText = "Time's up";
  const initialState = { event: null, speed: 1, paused: true, data: { min: 0, sec: 0 } };
  const halfwayWarningState = { event: TimerEvents.HALFWAY_WARNING, speed: 1, paused: true, data: { min: 0, sec: 0 } };
  const timeIsUpState = { event: TimerEvents.TIME_IS_UP, speed: 1, paused: true, data: { min: 0, sec: 0 } };
  const resetState = { event: TimerEvents.RESET, speed: 1, paused: true, data: { min: 0, sec: 0 } };

  /* Tests */
  const renderComponent = (newState: TimerState) => {
    jest.spyOn(typedSelectorHook, "useTypedSelector").mockImplementation(() => { return newState });

    return render(
      <FadeInText halfwayWarningText={halfwayWarningText} timesUpText={timesUpText}/>
    );
  }

  test("Initial value", () => {
    renderComponent(initialState);
    expect(screen.queryByText(halfwayWarningText)).not.toBeInTheDocument();
    expect(screen.queryByText(timesUpText)).not.toBeInTheDocument();
    expect(screen.getByTestId("collapse")).toBeInTheDocument();
    expect(screen.getByTestId("alert")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument(); // Close button
  });

  test("Handle HALFWAY_WARNING event", () => {
    renderComponent(halfwayWarningState);
    expect(screen.getByRole("button")).toBeInTheDocument(); // Close button
    expect(screen.getByRole("alert")).toHaveTextContent(halfwayWarningText);
  });

  test("Handle TIME_IS_UP event", () => {
    renderComponent(timeIsUpState);
    expect(screen.getByRole("button")).toBeInTheDocument(); // Close button
    expect(screen.getByRole("alert")).toHaveTextContent(timesUpText);
  });

  test("Handle RESET event", () => {
    renderComponent(resetState);
    expect(screen.queryByText(halfwayWarningText)).not.toBeInTheDocument();
    expect(screen.queryByText(timesUpText)).not.toBeInTheDocument();
    expect(screen.getByTestId("collapse")).toBeInTheDocument();
    expect(screen.getByTestId("alert")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument(); // Close button
  });

  test("Click on close button", async () => {
    renderComponent(halfwayWarningState);
    const closeButton = screen.getByRole("button");
    const alert = screen.getByRole("alert");
    expect(closeButton).toBeInTheDocument();
    expect(alert).toHaveTextContent(halfwayWarningText);
    userEvent.click(closeButton);
    await new Promise((r) => setTimeout(r, 500)); // Waiting for animation to finish
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});