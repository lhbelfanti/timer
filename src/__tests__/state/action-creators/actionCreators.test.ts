import * as reactRedux from "react-redux";
import { useActions } from "../../../hooks/useActions";
import { ActionType } from "../../../state/action-types";
import { TimerEvents } from "../../../state/actions";

describe("Actions creator Tests Suite", () => {
  const mockDispatch = jest.fn();
  const mockUseDispatch = jest.spyOn(reactRedux, "useDispatch");
  mockUseDispatch.mockReturnValue(mockDispatch);
  const {
    changeTimerSpeed,
    triggerTimerEvent,
    setTimer,
    pauseTimer,
    resumeTimer
  } = useActions();

  test("Dispatch all the actions", async () => {
    // Dispatch the actions
    await changeTimerSpeed(1);
    await triggerTimerEvent(TimerEvents.COLOR_WARNING);
    await setTimer({ min: 0, sec: 0 });
    await pauseTimer();
    await resumeTimer();

    const actions = Object.values(ActionType);
    expect(mockDispatch).toBeCalledTimes(actions.length - 1); // -1 because default action is only used for testing
  });
});
