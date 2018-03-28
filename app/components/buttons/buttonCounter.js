import React from 'react';

class ButtonCounter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  handleCounter() {
    this.setState({
      count: this.state.count + 1
    });
  }

  render() {
    return <button onClick={this.handleCounter.bind(this)}>Count {this.state.count}</button>
  }
}

export default ButtonCounter;
