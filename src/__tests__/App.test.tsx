import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import React from "react";
import App from "../App";

describe("App Component Tests Suite", () => {

  test("Renders correctly", () => {
    render(<App/>);
  });
});