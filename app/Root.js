import React from 'react';
import Buttons from './containers/buttons/buttons';
import Header from './containers/header/header';
import Player from './containers/player/player';
import MusicList from './containers/musiclist/musiclist'
import $ from 'jquery';
import 'jplayer';
import {MUSIC_LIST} from './config/musiclist';
import {Router,IndexRoute,Link,Route,hashHistory} from 'react-router'
import Pubsub from 'pubsub-js';
import { randomRange } from './components/utils/utils'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      musicList: MUSIC_LIST,
      currentMusicItem: MUSIC_LIST[0],
      repeatType: 'cycle'
    }
  }

  playMusic(musicItem) {
    $('#player').jPlayer('setMedia',{mp3:musicItem.file}).jPlayer('play');
    this.setState({
      currentMusicItem: musicItem
    })
  }

  playNext(type = "next") {
    let index = this.findMusicIndex(this.state.currentMusicItem);
    let newIndex = null;
    let musicListLength = this.state.musicList.length;
    if(type==='next') {
      newIndex = (index+1) % musicListLength;
    } else{
      newIndex = (index-1+musicListLength) % musicListLength;
    }

    this.playMusic(this.state.musicList[newIndex])
  }

  findMusicIndex(musicItem) {
    return this.state.musicList.indexOf(musicItem);
  }

  playWhenEnd() {
    if(this.state.repeatType === 'random') {
      let index = this.findMusicIndex(this.currentMusicItem)
      let randomIndex = randomRange(0, this.state.musicList.length)
      while(index === randomIndex) {
        randomIndex = randomRange(0, this.state.musicList.length)
      }
      this.playMusic(this.state.musicList[randomIndex])
    }else if(this.state.repeatType === 'once') {
      this.playMusic(this.state.currentMusicItem)
    }else{
      this.playNext()
    }
  }

  componentDidMount() {
    $('#player').jPlayer ({
      // ready: function() {
      //   $(this).jPlayer('setMedia',{
      //     mp3:'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
      //   }).jPlayer('play')
      // },
      supplied: 'mp3',
      wmode:'window',
      useStateClassSkin:true
    });

    this.playMusic(this.state.currentMusicItem);

    $('#player').bind($.jPlayer.event.ended, (e)=>{
      this.playWhenEnd();
    })

    Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
      this.setState({
        musicList: this.state.musicList.filter( item => {
          return item !== musicItem
        })
      })
      if(this.state.currentMusicItem === musicItem){
        this.playNext()
      }
    });

    Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
      this.playMusic(musicItem)
    })

    Pubsub.subscribe('PLAY_PREV', (msg, musicItem) => {
      this.playNext('prev')
    })

    Pubsub.subscribe('PLAY_NEXT', (msg, musicItem) => {
      this.playNext()
    })

    let repeatlist = ['cycle','once','random']
    Pubsub.subscribe('CHANGE_REPEAT', ()=>{
      let repeatIndex = repeatlist.indexOf(this.state.repeatType)
      repeatIndex = (repeatIndex+1)%repeatlist.length
      this.setState({
        repeatType: repeatlist[repeatIndex]
      })
    })

  }

  componentWillUnMount() {
    Pubsub.unsubscribe('PLAY_MUSIC');
    Pubsub.unsubscribe('DELETE_MUSIC');
    Pubsub.unsubscribe('PLAY_PREV');
    Pubsub.unsubscribe('PLAY_NEXT');
    Pubsub.unsubscribe('CHANGE_REPEAT');
    $('#player').unbind($.jPlayer.event.ended);
  }

  render () {
    return(
      <div>
        <Buttons />
        <div>
          <h3>二.音乐起</h3>
          <Header />
          {React.cloneElement(this.props.children,this.state)}
        </div>
      </div>
    )
  }
}

//  { this.props.children } 指的是当前页面对应的路由的component，但是 怎么传入参数，clone,<MusicList
//   currentMusicItem = {this.state.currentMusicItem}
//   musicList = {this.state.musicList} />
//Pubsub.subscribe('DELETE_MUSIC', (msg, item) => {}); msg是Pubsub传过来的一个参数，第二个开始才是发布传过来的参数
class Root extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Player} />
          <Route path="/list" component={MusicList}></Route>
        </Route>
      </Router>
    )
  }

}


export default Root
