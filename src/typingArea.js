import React from "react";

class TypingArea extends React.Component {
  constructor(props) {
    super(props);
    this.hasStarted = false;
  }

  handleChange = () => {
    if (!this.hasStarted) {
      this.hasStarted = true;
      this.props.onStart();
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isStarted && !this.props.isStarted) {
      this.refs.textbox.value = "";
      this.hasStarted = false;
    }
  }

  render() {
    return (
      <textarea
        className="typing-area"
        ref="textbox"
        onChange={this.handleChange}
      />
    );
  }
}

export default TypingArea;
