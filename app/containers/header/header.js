import React from "react";
import './header.less'

class Header extends React.Component {
  render() {
    return (
      <div className="components-header">
        <img className="logo" src="/static/images/logo.png" width="40" />
        <span className="caption">React Music Player</span>
      </div>
    )
  }
}

export default Header
