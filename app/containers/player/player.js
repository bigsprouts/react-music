import React from 'react';
import Progress from '../../components/progress/progress';
import './player.less';
import $ from 'jquery';
import 'jplayer';
import { Link } from 'react-router';
import Pubsub from 'pubsub-js';

let duration = null;
class Player extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      progress : 0,
      volume: 0,
      isPlay: true,
      leftTime: '',
    }
  }

  componentDidMount() {

    var _this = this
    $("#player").bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration;
			_this.setState({
        volume: e.jPlayer.options.volume * 100,
				progress: e.jPlayer.status.currentPercentAbsolute,
        leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute/100))
			});
		});
  }

  componentWillUnmount() {
    $("#player").unbind($.jPlayer.event.timeupdate);
  }

  changeProgressHandler(progress) {
    $('#player').jPlayer('play',duration*progress);
    this.setState({isPlay:true});
  }

  changeVolumeHandler(progress) {
    $('#player').jPlayer('volume',progress)
    this.setState({volume:progress*100})
  }

  play() {
    this.state.isPlay?$('#player').jPlayer('pause'):$('#player').jPlayer('play')
    this.setState({
      isPlay: !this.state.isPlay
    })
  }

  playPrev() {
    Pubsub.publish('PLAY_PREV')
  }

  playNext() {
    Pubsub.publish('PLAY_NEXT')
  }

  formatTime(time) {
    time = Math.floor(time);
    let m = Math.floor(time/60);
    let s = Math.floor(time%60);
    s = s<10 ? `0${s}`:s;
    return `${m}:${s}`;
  }

  changeRepeatHandler() {
    Pubsub.publish('CHANGE_REPEAT')
  }

  render () {
    return(
      <div className="player-page">
          <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
          <div className="mt20 row">
            <div className="controll-wrapper">
              <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
              <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
              <div className="row mt20">
                <div className="left-time -col-auto">-{this.state.leftTime}</div>
                <div className="volume-container">
                  <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                  <div className="volume-wrapper">
                    <Progress progress={this.state.volume}
                      onProgressChange = {this.changeVolumeHandler.bind(this)}
                      barColor="#aaa" />
                  </div>
                </div>
              </div>
              <div style={{height: 10, lineHeight: '10px', marginTop: 10}}>
                <Progress
                  progress={this.state.progress}
                  barColor={this.state.barColor}
                  onProgressChange={this.changeProgressHandler.bind(this)}
                  barColor="#113c2b"
                >
                </Progress>
              </div>
              <div className="mt35 row">
                <div>
                  <i className="icon prev" onClick={this.playPrev.bind(this)}></i>
                  <i className={`icon ml20 ${this.state.isPlay? 'pause' : 'play'}`} onClick={this.play.bind(this)}></i>
                  <i className="icon next ml20" onClick={this.playNext.bind(this)}></i>
                </div>
                <div className="-col-auto">
                  <i className={`icon repeat-${this.props.repeatType}`} onClick={this.changeRepeatHandler.bind(this)}></i>
                </div>
              </div>
            </div>
            <div className="-col-auto cover">
              <img className={this.state.isPlay?'rotate':''} src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
            </div>
        </div>
      </div>
    )
  }

}

export default Player
