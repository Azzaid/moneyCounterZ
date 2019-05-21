import React from "react";

export default class GameField extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.engine.mount(this.gameFieldRef);
  }

  render() {
    return (
      <div className="game-field-wrapper"
      ref={gameFieldRef => this.gameFieldRef = gameFieldRef}>
      </div>
    )
  }
}