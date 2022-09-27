import React  from "react";
import { Provider } from "react-redux";
import TimerPage from "./pages/timer/TimerPage";
import { store } from "./state";

const App = () => {
  return (
    <Provider store={store}>
      <TimerPage/>
    </Provider>
  );
}

export default App;
