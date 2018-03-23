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
  ActivityIndicator
} from 'react-native'
import Slider from 'react-native-slider'
import ProgressSlider from '../components/ProgressSlider'
import moment from 'moment'

import TrackPlayer from 'react-native-track-player'
import Icon from '../lib/icon'

let interval

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
              TrackPlayer.seekTo(value * this.state.duration)
            }}
            buffering={this.getBufferedProgress()}
            played={this.state.position > 0}
          ></ProgressSlider>
        </View>
        <Text
          style={styles.time}
        >{formatTime(this.state.duration)}</Text>
      </View>
    )
  }
}

class Play extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state = {
    title: '标题',
    author: ['艺术家'],
    cover: 'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
    playing: false
  }
  componentDidMount () {
    this.updateUI()
  }
  updateUI () {
    TrackPlayer.getCurrentTrack()
      .then(TrackPlayer.getTrack)
      .then((track) => {
        this.setState({
          title: track.title,
          author: track.artist,
          cover: track.artwork
        })
      })

    TrackPlayer.getState().then((state) => {
      this.setState({
        playing: state !== TrackPlayer.STATE_PAUSED
      })
    })
  }
  componentWillUnmount () {
    clearInterval(interval)
  }
  render () {

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
              uri: this.state.cover
            }}
          ></Image>
        </View>
        <View style={styles.container}>
          <View style={styles.info}>
            <Text style={styles.name}>{this.state.title}</Text>
            <Text style={styles.singer}>{this.state.author}</Text>
          </View>
          <View style={styles.cover}>
            <View style={styles.coverContent}>
              <Image
                style={styles.coverImage}
                source={{
                  uri: this.state.cover
                }}
              ></Image>
            </View>
          </View>
          <View style={styles.controller}>
            <ProgressBar></ProgressBar>
            <View style={styles.controllerContainer}>
              <View>
                <Icon style={styles.button} name="random"></Icon>
              </View>
              <View>
                <Icon style={styles.button} name="prev"></Icon>
              </View>
              <View>
                {
                  this.state.playing
                    ? <Icon style={styles.button} onPress={() => {
                      TrackPlayer.pause()
                      this.updateUI()
                    }} name="pause"></Icon>
                    : <Icon style={styles.button} onPress={() => {
                      TrackPlayer.play()
                      this.updateUI()
                    }} name="play"></Icon>
                }
              </View>
              <View>
                <Icon style={styles.button} name="next"></Icon>
              </View>
              <View>
                <Icon style={styles.button} name="list"></Icon>
              </View>
            </View>
          </View>
        </View>
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
