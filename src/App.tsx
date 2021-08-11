import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TimerPage from "./pages/timer/TimerPage";
import { store } from "./state";


const App = () => {
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

export default App;
