import React from 'react';
import Greet from './Greet/greet'

class ButtonSwitch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isToggleOn : false
    }
  }

  handleClick() {
    this.setState(prevState=>({
        isToggleOn : !prevState.isToggleOn
      }))
  }

  render() {

    return (
      <div>
        <p>遗留问题：父组件向子组件传值，当父组件值变化时，子组件不会实时变化？大概是需要redux了？</p>
        <Greet isToggleOn={this.state.isToggleOn}/>
        <button style={ this.state.isToggleOn ? {}:{backgroundColor:'#aaa',color:'#000'} } onClick={this.handleClick.bind(this)}>{ this.state.isToggleOn ? 'LoginOut' : 'Login' }</button>
      </div>
    )
  }

}

//'ON' : 'OFF'  必须带引号，不然就成变量 undefined了

export default ButtonSwitch
