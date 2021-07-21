import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import CountdownInput from "../../../../pages/timer/components/CountdownInput";
import userEvent from "@testing-library/user-event";

describe("CountdownInput Component Tests Suite", () => {

  /* Mock values */
  const onChangeMock = jest.fn();
  const onFocusOutMock = jest.fn();
  const defaultValue = "00:00";
  const placeHolderValue = "MM:SS";

  /* Tests */
  const renderComponent = () => {
    return render(
      <CountdownInput onChange={onChangeMock} onFocusOut={onFocusOutMock} value={defaultValue} />
    );
  }

  test("Initial value", () => {
    renderComponent();

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(defaultValue);
  });

  test("Value change - Empty value & placeholder", () => {
    renderComponent();

    let called = 0;
    const input = screen.getByRole("textbox");

    userEvent.clear(input);
    called += 1;
    expect(input).toHaveValue("");
    expect(input).toHaveAttribute("placeholder", placeHolderValue);
    expect(onChangeMock).toHaveBeenCalledTimes(called);
  });

  test("Value change - Invalid value", () => {
    renderComponent();

    let called = 0;
    const input = screen.getByRole("textbox");
    userEvent.clear(input);
    called += 1;
    let newValue = "Letters"
    userEvent.type(input, newValue);
    called += newValue.length;
    expect(onChangeMock).toHaveBeenCalledTimes(called);
    expect(input).toHaveValue("");
  });

  test("Value change - Valid value & Mask", () => {
    renderComponent();

    let called = 0;
    const input = screen.getByRole("textbox");

    userEvent.clear(input);
    called += 1;
    let newValue = "55443";
    userEvent.type(input, newValue);
    called += newValue.length;
    expect(onChangeMock).toHaveBeenCalledTimes(called);
    expect(input).toHaveValue("55:44");

    userEvent.clear(input);
    called += 1;
    newValue = "5";
    userEvent.type(input, newValue);
    called += newValue.length;
    expect(onChangeMock).toHaveBeenCalledTimes(called);
    expect(input).toHaveValue("5");


    userEvent.clear(input);
    called += 1;
    newValue = "45";
    userEvent.type(input, newValue);
    userEvent.tab()
    called += newValue.length;
    expect(onChangeMock).toHaveBeenCalledTimes(called);
    expect(input).toHaveValue("45");

    userEvent.clear(input);
    called += 1;
    newValue = "345";
    userEvent.type(input, newValue);
    userEvent.tab()
    called += newValue.length;
    expect(onChangeMock).toHaveBeenCalledTimes(called);
    expect(input).toHaveValue("34:5");

    userEvent.clear(input);
    called += 1;
    newValue = "2345";
    userEvent.type(input, newValue);
    called += newValue.length;
    expect(onChangeMock).toHaveBeenCalledTimes(called);
    expect(input).toHaveValue("23:45");

    userEvent.clear(input);
    called += 1;
    newValue = "9999";
    userEvent.type(input, newValue);
    called += newValue.length;
    expect(onChangeMock).toHaveBeenCalledTimes(called);
    expect(input).toHaveValue("99:99");
  });
});