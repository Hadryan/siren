/**
 * 播放页面
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Animated,
  Easing
} from 'react-native'
import {
  inject,
  observer
} from 'mobx-react'
import Slider from 'react-native-slider'
import ProgressSlider from '../components/ProgressSlider'
import moment from 'moment'

import TrackPlayer from 'react-native-track-player'
import TrackPlayerType from '../lib/TrackPlayerType'
import Icon from '../lib/icon'

import MusicList from '../components/MusicList'

import * as types from '../lib/playModeType'

class ProgressBar extends TrackPlayer.ProgressComponent {
  render () {

    const formatTime = (second) => {
      return moment('2018-01-01 00:00:00')
              .seconds(second)
              .format('mm:ss')
    }

    return (
      <View style={styles.progressContent}>
        <Text
          style={styles.time}
        >
        {formatTime(this.state.position)}
        </Text>
        <View style={{
          flex: 1,
          marginLeft: 10,
          marginRight: 10,
          position: 'relative'
        }}>
          <ProgressSlider
            value={this.getProgress()}
            onSlidingComplete={(value) => {
              console.log(value, value * this.state.duration)
              TrackPlayer.seekTo(value * this.state.duration)
            }}
            buffering={this.getBufferedProgress()}
            isBuffer={this.props.isBuffer}
          ></ProgressSlider>
        </View>
        <Text
          style={styles.time}
        >{formatTime(this.state.duration)}</Text>
      </View>
    )
  }
}

@inject('music')
@observer
class Play extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state = {
    rotateValue: new Animated.Value(0),
    musicList: false
  }
  rotateAnimation = Animated.loop(
    Animated.timing(this.state.rotateValue, {
      toValue: 1,
      duration: 50000,
      easing: Easing.linear,
      useNativeDriver: true
    })
  )
  rotating = false
  startRotate () {
    if (this.rotating) return
    this.rotating = true
    this.rotateAnimation.start()
  }
  stopRotate () {
    this.rotating = false
    this.rotateAnimation.stop()
  }
  componentDidUpdate () {
    const { music } = this.props
    if (music.playerState === TrackPlayerType.STATE_PLAYING) {
      this.startRotate()
    } else {
      this.stopRotate()
    }
  }
  render () {
    const { music } = this.props
    const currentMusic = music.list.find(item => item.id === music.trackId)
    console.log(music.playerState)

    const getModeIcon = () => {
      let name = ''
      switch (music.mode) {
        case types.LIST_CYCLE:
          name = 'circulation'
          break
        case types.SINGLE_CYCLE:
          name = 'repeatOne'
          break
        case types.RANDOM:
          name = 'random'
          break
      }
      return <Icon style={styles.button} name={name} onPress={() => {music.switchMode()}}></Icon>
    }

    return (
      <View style={{flex: 1, backgroundColor: '#333'}}>
        <StatusBar
          barStyle="light-content"
          translucent
        ></StatusBar>
        <View style={styles.background}>
          <Image
            style={{
              flex: 1
            }}
            blurRadius={50}
            source={{
              uri: currentMusic ? currentMusic.artwork : 'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'
            }}
          ></Image>
        </View>
        <View style={styles.container}>
          <View style={styles.info}>
            <Text style={styles.name}>{ currentMusic ? currentMusic.title : '标题'}</Text>
            <Text style={styles.singer}>{ currentMusic ? currentMusic.artist : '艺术家'}</Text>
          </View>
          <View style={styles.cover}>
            <View style={styles.coverContent}>
              <Animated.Image
                style={[styles.coverImage, {
                  transform: [
                    {
                      rotate: this.state.rotateValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      })
                    }
                  ]
                }]}
                source={{
                  uri: currentMusic ? currentMusic.artwork : 'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'
                }}
              ></Animated.Image>
            </View>
          </View>
          <View style={styles.controller}>
            <ProgressBar isBuffer={music.playerState === TrackPlayerType.STATE_BUFFERING}></ProgressBar>
            <View style={styles.controllerContainer}>
              <View>
                {
                  getModeIcon()
                }
              </View>
              <View>
                <Icon
                  style={styles.button}
                  name="prev"
                  onPress={() => {
                    music.playPrev()
                  }}
                ></Icon>
              </View>
              <View>
              {
                music.playerState !== TrackPlayerType.STATE_PAUSED
                  ? <Icon style={styles.button} onPress={() => {
                    music.pause()
                  }} name="pause"></Icon>
                  : <Icon style={styles.button} onPress={() => {
                    music.play()
                  }} name="play"></Icon>
              }
              </View>
              <View>
                <Icon
                  style={styles.button}
                  name="next"
                  onPress={() => {
                    music.playNext()
                  }}
                ></Icon>
              </View>
              <View>
                <Icon style={styles.button} name="list" onPress={() => {
                  this.setState({
                    musicList: true
                  })
                }}></Icon>
              </View>
            </View>
          </View>
        </View>
        <MusicList show={this.state.musicList} onHide={() => {
          this.setState({
            musicList: false
          })
        }}></MusicList>
      </View>
    )
  }
}

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 1
  },
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  info: {
    // paddingTop: 100
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    fontSize: 20,
    color: '#fff',
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius:2,  
    textShadowColor:'#333'
  },
  singer: {
    fontSize: 12,
    color: '#E7E7E7',
    marginTop: 10,
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius:2,  
    textShadowColor:'#333' 
  },
  cover: {
    flex: 2,
    justifyContent: 'center'
  },
  coverContent: {
    width: (height * 0.6) - 100,
    height: (height * 0.6) - 100,
    backgroundColor: 'rgba(0,0,0,.23)',
    padding: 7,
    borderRadius: ((height * 0.6) - 100 ) / 2
  },
  coverImage: {
    flex: 1,
    borderRadius: ((height * 0.6) - 110 ) / 2 
  },
  controller: {
    flex: 1,
    width: '100%',
    justifyContent: 'center'
  },
  progressContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  controllerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    fontSize: 20,
    color: '#fff'
  },
  time: {
    color: '#fff',
    width: 50,
    textAlign: 'center'
  }
})

export default Play
