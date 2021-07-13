# Countdown Timer

## Time spent in this project
I've spent 12 hours doing this project:
- I was around 4 hours configuring the project and making [Redux work as expected](#redux-setup).
- Around 6 hours coding the logic.
- The other 2 hours making it look pretty.

## Preview 
![Countdown Timer png preview](images/timer.png)

![Countdown Timer gif preview](./images/timer.gif)

## Tech stack
- Typescript
- React
- React Redux
- Material UI

## How is it composed?

This is a Single Page Application, so, it has a main component called `TimerPage` and that page has 3 different sections:
- `CountdownInputSection` in charge of the top part of the timer. It handles the start of the timer.
- `CoundownInputSection` the primary element. It shows the timer, the info panels and handles the pause and resume actions.
- `MultipliersSection` the last of the sections that handles the change of the speed of the timer.

A deeper explanation in the following image.

![Components explanation](images/components.png)

## Redux setup

All the classes for the redux setup are inside the [state](./src/state) folder.

Basically, there are 4 different `Action Creators`, that trigger an `Action`, using the different `Action Types`. 
Those actions are received by the `Reducers` and using the data of the payload, it changes the `Redux Store` variables.

See the following image to get a deeper insight of the setup.

![Redux setup](images/redux.png)

## Configuration values

All the configuration values are defined in a single [config.json](./src/pages/config.json). 
The properties have a self-explanatory name, but they are also explained in the following table:

| Property      | Description |
| -----------   | ----------- |
| countdownLabelText      | The text for the Countdown label at the top left of the timer page. |
| startButtonText   | The text for the start button at the top right of the timer page.        |
| halfwayWarningPercentage   | The percentage threshold where the first info panel appear. Valid values [0.0-1.0]. It's 0.5 by default, the half of the time entered. |
| colorWarningStartingAtSecond   | The exact second where the timer turns red. It's 20 seconds by default.  |
| blinkWarningStartingAtSecond   | The exact second where the timer starts blinking. It's 10 seconds by default. |
| halfwayWarningInfoText   | The text for the halfway warning info panel. |
| timesUpInfoText   | The text for the info panel that appears when the time reaches 00:00. |
| multipliers   | An array of multipliers to speed up the timer. Each value of the array represents a button in the bottom part of the timer page and the speed by which the countdown timer will be multiplied. It has 3 values by default: 1, 1.5 and 2.0 |
| defaultSelectedMultiplierIndex   | The default selected index of the multipliers array. It's 0 by default, the first one.|
