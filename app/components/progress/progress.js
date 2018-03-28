import React from 'react';
import './progress.less'

class Progress extends React.Component {

  changeProgress(e) {
    let progressBar = this.refs.progressBar;
    let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
    this.props.onProgressChange && this.props.onProgressChange(progress);
  }

  render() {
    return (
      <div className="components-Progress" ref="progressBar"
        onClick={this.changeProgress.bind(this)}>
        <div className="progress" style = {{ width: `${this.props.progress}%`,backgroundColor: `${this.props.barColor}` }}></div>
      </div>
    )
  }

}

// ref="" 解决react不能直接操作dom的问题 ，react会把定义了ref属性的真实的DOM，传入refs。
// 点击子组件变化，去通知父组建（回调函数的方式）

export default Progress;
