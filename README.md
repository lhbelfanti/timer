<p align="center">
  <img src="media/timer-logo.png" width="100" alt="Repository logo" />
</p>
<h3 align="center">Timer</h3>
<p align="center">Simple countdown timer<p>
<p align="center"><a href="https://lhbelfanti.gitlab.io/timer/"><strong>➥ Live Demo</strong></a></p>
<p align="center">
    <img src="https://img.shields.io/github/repo-size/lhbelfanti/timer?label=Repo%20size" alt="Repo size" />
    <img src="https://img.shields.io/github/license/lhbelfanti/timer?label=License" alt="License" />

</p>

---
# Countdown Timer
<img src="./media/timer.png" width="200" alt="Umbrella project preview" />

## Preview
<img src="./media/timer.gif" width="500" alt="Umbrella project preview" />

## Tech stack
- Typescript
- React
- React Redux
- Material UI

## How is it composed?
This is a Single Page Application, so, it has a main component called `TimerPage` and that page has 3 different
sections:

- `CountdownInputSection` in charge of the top part of the timer. It handles the start of the timer.
- `CoundownInputSection` the primary element. It shows the timer, the info panels and handles the pause and resume
  actions.
- `MultipliersSection` the last of the sections that handles the change of the speed of the timer.

A deeper explanation in the following image.

![Components explanation](media/components.png)

## Redux setup
All the classes for the redux setup are inside the [state](./src/state) folder.

Basically, there are 4 different `Action Creators`, that trigger an `Action`, using the different `Action Types`. Those
actions are received by the `Reducers` and using the data of the payload, it changes the `Redux Store` variables.

See the following image to get a deeper insight of the setup.

![Redux setup](media/redux.png)

## Configuration values
All the configuration values are defined in a single [config.json](./src/pages/config.json). All the properties have a
self-explanatory name.

---
## License

[MIT](https://choosealicense.com/licenses/mit/)