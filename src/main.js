import React from "react";
import Timer from "./timer.js";
import TypingArea from "./typingArea.js";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      isStarted: false,
      grossWpm: 0,
      netWpm: 0,
      accuracy: 0
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

  onFinish = (grossWpm, netWpm, accuracy) => {
    this.setState({
      grossWpm: grossWpm,
      netWpm: netWpm,
      accuracy: accuracy
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
        <TypingArea
          onStart={this.onStart}
          isStarted={this.state.isStarted}
          onFinish={this.onFinish}
        />
        <button onClick={this.restart}>Restart</button>
        Gross WPM: {this.state.grossWpm} Net WPM: {this.state.netWpm} Accuracy:{" "}
        {this.state.accuracy}
      </div>
    );
  }
}

export default Main;
