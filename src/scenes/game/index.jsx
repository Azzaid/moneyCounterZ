import React from "react";
import Engine from '../../engine/index'

import GameField from "./GameField.jsx";
import SimulationControl from "./SimulationControl.jsx";
import LoginSection from "./LoginSection.jsx";
import SimulationsList from "./SimulationsList.jsx";

export default class GameScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: '122',
    };

    this.gameEngine = new Engine();
  }

  render() {
    const {userId} = this.state;

    return (
      <div id="root">
        <h1 className="main-header">
          Welcome! Click on field to add come bals to simulation
        </h1>
        <SimulationControl engine={this.gameEngine} userId={userId}/>
        <GameField engine={this.gameEngine} userId={userId}/>
        {userId ?
          <LoginSection engine={this.gameEngine}/>
          :
          <SimulationsList engine={this.gameEngine}/>
        }
      </div>
    )
  }
}