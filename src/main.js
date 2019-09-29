import React from "react";
import Timer from "./timer.js";
import TypingArea from "./typingArea.js";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      isStarted: false
    };
  }

  timerCompleted = msg => {
    alert(msg);
    this.restart();
  };

  onStart = () => {
    this.setState({
      isStarted: true
    });
  };

  restart = () => {
    this.setState({
      isStarted: false
    });
  };

  render() {
    return (
      <div>
        <Timer
          onTimerComplete={this.timerCompleted}
          isStarted={this.state.isStarted}
        />
        <TypingArea onStart={this.onStart} isStarted={this.state.isStarted} />
        <button onClick={this.restart}>Restart</button>
      </div>
    );
  }
}

export default Main;
