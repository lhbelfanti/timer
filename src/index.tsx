import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import '@fontsource/roboto';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

const theme = createTheme({
  palette: {
    background: {
      default: "#3f51b5"
    }
  }
});

ReactDOM.render(
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <App/>
    </ThemeProvider>
  </React.Fragment>,
  document.getElementById("root")
);