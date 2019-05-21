import React from "react";
import http, { simulationDataAPI } from '../../httpRequestModule/index.js';

export default class SimulationControl extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {engine, userId} = this.props;

    return (
      <div className="buttons-wrapper">
        <div className="button button_start"
        onClick={() => {
          let someList = engine.getJointsList();
          http.post(simulationDataAPI(userId), someList);
          engine.startSimulation()
        }}>
          Start
        </div>
        <div className="button button_step"
             onClick={() => {engine.startSimulation(1000)}}>
          Step
        </div>
        <div className="button button_stop"
             onClick={() => {engine.stopSimulation()}}>
          Stop
        </div>
      </div>
    )
  }
}