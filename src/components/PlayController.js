import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'
import {
  observer,
  inject
} from 'mobx-react'
import * as Progress from 'react-native-progress'
import Icon from '../lib/icon'
import TrackPlayer from 'react-native-track-player'
import TrackPlayerType from '../lib/TrackPlayerType'

class ProgressCover extends TrackPlayer.ProgressComponent {
  render () {
    return (
      <View style={styles.cover}>
        <Progress.Circle
          progress={this.getProgress()}
          borderWidth={0}
          thickness={2}
          color='#11999E'
          strokeCap='round'
          style={{
            position: 'absolute',
            zIndex: 2
          }}
          size={50} />
        <Image
          source={{
            uri: this.props.cover
          }}
          style={{
            width: 50,
            height: 50,
            position: 'absolute',
            zIndex: 1,
            borderRadius: 25
          }}
        ></Image>
      </View>
    )
  }
}

@inject('music')
@observer
class PlayController extends Component {
  state = {
    title: '标题',
    author: ['艺术家'],
    cover: 'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
    playing: false
  }
  render () {
    const { music } = this.props
    const currentMusic = music.list.find(item => item.id === music.trackId)
    
    if (!currentMusic) {
      return null
    }
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <ProgressCover cover={currentMusic.artwork}></ProgressCover>
          <View style={{marginLeft: 10}}>
            <Text style={styles.name}>{currentMusic.title}</Text>
            <Text style={styles.singer}>{currentMusic.artist}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View>
          {
            music.playerState !== TrackPlayerType.STATE_PAUSED
              ? <Icon style={styles.controllerIcon} onPress={() => {
                music.pause()
              }} name="pause"></Icon>
              : <Icon style={styles.controllerIcon} onPress={() => {
                music.play()
              }} name="play"></Icon>
          }
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                this.props.listClick()
              }}
            >
              <Icon style={styles.list} name="list"></Icon>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

PlayController.defaultProps = {
  listClick: () => {}
}

const baseIcon = {
  color: '#6F6F6F',
  fontSize: 20
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  cover: {
    width: 50,
    height: 50,
    backgroundColor: '#ddd',
    borderRadius: 25,
    position: 'relative'
  },
  name: {
    fontSize: 16,
    color: '#616161'
  },
  singer: {
    fontSize: 12,
    marginTop: 5,
    color: '#A4A4A4'
  },
  controllerIcon: {
    marginRight: 15,
    ...baseIcon
  },
  list: {
    fontSize: 20,
    ...baseIcon
  }
})

export default PlayController
