import React from "react";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    // TODO: revert timer back to default 3 mins
    this.state = {
      timeRemaining: 3,
      min: 3,
      sec: this.padSingleDigitNumber(0)
    };
    this.intervalId = 0;
  }

  // TODO: revert timer back to default 3 mins
  resetTimer = () => {
    this.setState({
      timeRemaining: 3,
      min: 3,
      sec: this.padSingleDigitNumber(0)
    });
  };

  padSingleDigitNumber = num => {
    if (num <= 9) {
      num = "0" + num;
    }
    return num;
  };

  convertToReadableTime = () => {
    let min = Math.floor(this.state.timeRemaining / 60);
    let sec = this.padSingleDigitNumber(this.state.timeRemaining - min * 60);
    this.setState({
      min: min,
      sec: sec
    });
  };

  countDown = () => {
    let decreasedTime = this.state.timeRemaining - 1;
    this.setState({ timeRemaining: decreasedTime });

    if (this.state.timeRemaining < 0) {
      clearInterval(this.intervalId);
      // TODO: handle onTimerComplete properly
      this.props.onTimerComplete("passing back to parent");
      this.resetTimer();
    } else {
      this.convertToReadableTime();
    }
  };

  stopTimer = () => {
    clearInterval(this.intervalId);
    this.resetTimer();
  };

  startTimer = () => {
    this.stopTimer();
    this.intervalId = setInterval(this.countDown, 1000);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isStarted && !this.props.isStarted) {
      this.stopTimer();
    }

    if (!prevProps.isStarted && this.props.isStarted) {
      this.startTimer();
    }
  }

  render() {
    return (
      <div className="time">
        Time Remaining: {this.state.min}:{this.state.sec}
      </div>
    );
  }
}

export default Timer;
