import React from "react";

class TypingArea extends React.Component {
  constructor(props) {
    super(props);
    this.hasStarted = false;
    this.text = "here is some text to type up. and here? maybe.";
    this.textSplit = this.text.split(" ");
    this.WordCorrectnessEnum = {
      CORRECT: "correct",
      INCORRECT: "incorrect",
      UNAVAILABLE: "unavailable"
    };
    this.state = {
      wordCorrectness: this.textSplit.map(
        word => this.WordCorrectnessEnum.UNAVAILABLE
      )
    };
  }

  calculateWordCorrectness = currentText => {
    let currentSplitText = currentText.split(" ").filter(word => word !== "");
    let currentWordCorrectness = [];
    for (let i = 0; i < this.textSplit.length; i++) {
      if (this.textSplit[i] === currentSplitText[i]) {
        currentWordCorrectness[i] = this.WordCorrectnessEnum.CORRECT;
      } else if (!currentSplitText[i]) {
        currentWordCorrectness[i] = this.WordCorrectnessEnum.UNAVAILABLE;
      } else {
        currentWordCorrectness[i] = this.WordCorrectnessEnum.INCORRECT;
      }
    }
    return currentWordCorrectness;
  };

  handleChange = () => {
    if (!this.hasStarted) {
      this.hasStarted = true;
      this.props.onStart();
      return;
    }

    let currentValue = this.refs.textbox.value;
    if (currentValue.charAt(currentValue.length - 1) !== " ") {
      return;
    }

    this.setState({
      wordCorrectness: this.calculateWordCorrectness(currentValue)
    });
  };

  isCorrect = index => {
    let correctness = this.state.wordCorrectness[index];
    if (correctness === this.WordCorrectnessEnum.CORRECT) {
      return this.WordCorrectnessEnum.CORRECT.toLowerCase();
    } else if (correctness === this.WordCorrectnessEnum.UNAVAILABLE) {
      return this.WordCorrectnessEnum.UNAVAILABLE.toLowerCase();
    } else {
      return this.WordCorrectnessEnum.INCORRECT.toLowerCase();
    }
  };

  calculateTypingSpeed = () => {
    let lastTypedIndex = this.state.wordCorrectness.findIndex(
      word => word === this.WordCorrectnessEnum.UNAVAILABLE
    );
    let allTypedEntries = this.textSplit.slice(0, lastTypedIndex).join(" ")
      .length;
    let totalTypedWords = allTypedEntries / 5;
    let totalTime = 0.05; // TODO: pass this in
    let grossWpm = totalTypedWords / totalTime;
    let incorrectWords = this.state.wordCorrectness.filter(
      word => word === this.WordCorrectnessEnum.INCORRECT
    ).length;
    let netWpm = (totalTypedWords - incorrectWords) / totalTime;
    let totalWords = this.textSplit.length;
    let correctWords = this.state.wordCorrectness.filter(
      word => word === this.WordCorrectnessEnum.CORRECT
    ).length;
    let accuracy = (correctWords / totalWords) * 100;

    this.props.onFinish(
      grossWpm.toFixed(1),
      netWpm.toFixed(1),
      Math.round(accuracy)
    );
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isStarted && !this.props.isStarted) {
      this.calculateTypingSpeed();
      this.refs.textbox.value = "";
      this.hasStarted = false;
      this.setState({
        wordCorrectness: this.textSplit.map(
          word => this.WordCorrectnessEnum.UNAVAILABLE
        )
      });
    }
  }

  render() {
    return (
      <div>
        {this.textSplit.map((value, index) => {
          return (
            <span
              key={"word-" + index}
              className={"reference-text " + this.isCorrect(index)}
            >
              {value}
            </span>
          );
        })}
        <textarea
          className="typing-area"
          ref="textbox"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default TypingArea;
