import React, { Component, Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TimerPage from "./pages/timer/TimerPage";
import { store } from "./state";

class App extends Component {

  public render() {
    return (
      <Provider store={store}>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route
                exact
                path="/"
                component={TimerPage}/>
            </Switch>
          </Suspense>
        </Router>
      </Provider>
    );
  }
}

export default App;
