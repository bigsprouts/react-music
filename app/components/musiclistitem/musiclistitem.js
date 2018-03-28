import React from 'react';
import './musiclistitem.less';
import Pubsub from 'pubsub-js'

class MusicListItem extends React.Component {

  playMusic(item) {
    Pubsub.publish('PLAY_MUSIC',item)
  }

  deleteMusic(item,e) {
    e.stopPropagation();
    Pubsub.publish('DELETE_MUSIC',item)
  }

  render() {
    let musicItem = this.props.musicItem;
    return (
      <li
        className={`components-musiclistitem row ${this.props.focus?'focus':''}`}
        onClick={this.playMusic.bind(this, musicItem)}>
        <p>{musicItem.title} - {musicItem.artist}</p>
        <p onClick={this.deleteMusic.bind(this, musicItem)} className="-col-auto delete"></p>
      </li>
    )
  }
}
// onClick={this.playMusic.bind(this, musicItem)}传入参数musicItem
// Pubsub.publish('PLAY_MUSIC',item) 发布一个事件，以及传入一个参数
export default MusicListItem
//
