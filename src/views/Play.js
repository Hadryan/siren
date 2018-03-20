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
import moment from 'moment'

import Sound from '../lib/sound'
import Icon from '../lib/icon'

const sound = Sound.instance
let interval

class ProgressBar extends Component {
  touching = false
  shouldComponentUpdate () {
    return !this.touching
  }
  render () {
    return <Slider
      minimumTrackTintColor='#1fb28a'
      maximumTrackTintColor='#d3d3d3'
      thumbTintColor='#1a9274'
      value={this.props.value}
      onSlidingStart={() => {
        this.touching = true
      }}
      onSlidingComplete={(value) => {
        this.touching = false
        this.props.onSlidingComplete && this.props.onSlidingComplete(value)
      }}
    ></Slider>
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
    time: {
      duration: -1,
      current: 0
    },
    playing: false,
    loaded: false
  }
  componentDidMount () {
    this.setState({
      title: sound.title,
      author: sound.author,
      cover: sound.cover
    })

    // um...🤕 WIP[!]
    this.updateUI()
    interval = setInterval(() => { this.updateUI() }, 1000)
  }
  updateUI () {
    sound.player.getCurrentTime((seconds, isPlaying) => {
      this.setState({
        time: {
          duration: sound.player.getDuration(),
          current: seconds
        },
        playing: isPlaying,
        loaded: sound.player.isLoaded()
      })
    })
  }
  componentWillUnmount () {
    clearInterval(interval)
  }
  render () {
    const formatTime = (second) => {
      return moment('2018-01-01 00:00:00')
              .seconds(second)
              .format('mm:ss')
    }

    return (
      <View style={{flex: 1}}>
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
            <Text style={styles.singer}>{this.state.author.join('/')}</Text>
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
            <View style={styles.progressContent}>
              <Text
                style={styles.time}
              >
              {formatTime(this.state.time.current)}
              </Text>
              <View style={{
                flex: 1,
                marginLeft: 10,
                marginRight: 10,
                position: 'relative'
              }}>
                <ProgressBar
                  value={this.state.time.current/this.state.time.duration}
                  onSlidingComplete={value => sound.player.setCurrentTime( value * this.state.time.duration )}
                ></ProgressBar>
              </View>
              <Text
                style={styles.time}
              >{formatTime(this.state.time.duration)}</Text>
            </View>
            <View style={styles.controllerContainer}>
              <View>
                <Icon style={styles.button} name="random"></Icon>
              </View>
              <View>
                <Icon style={styles.button} name="prev"></Icon>
              </View>
              <View>
                {
                  this.state.loaded
                  ? this.state.playing
                    ? <Icon style={styles.button} onPress={() => {
                      sound.player.pause()
                      this.updateUI()
                    }} name="pause"></Icon>
                    : <Icon style={styles.button} onPress={() => {
                      sound.player.play()
                      this.updateUI()
                    }} name="play"></Icon>
                  : <ActivityIndicator></ActivityIndicator>
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
    color: '#fff'
  },
  singer: {
    fontSize: 12,
    color: '#E7E7E7',
    marginTop: 10
  },
  cover: {
    flex: 2,
    justifyContent: 'center'
  },
  coverContent: {
    width: (height / 2) - 100,
    height: (height / 2) - 100,
    backgroundColor: 'rgba(0,0,0,.23)',
    padding: 7,
    borderRadius: ((height / 2) - 100 ) / 2
  },
  coverImage: {
    flex: 1,
    borderRadius: ((height / 2) - 110 ) / 2 
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
