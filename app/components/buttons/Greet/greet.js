import React from 'react';

class Greet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isToggleOn : this.props.isToggleOn
    }
  }

  render() {

    return <p>{this.state.isToggleOn ? 'on':'off'}</p>

  }
}

//并不会实时变化

export default Greet
