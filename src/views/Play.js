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
  StatusBar
} from 'react-native'
import Slider from 'react-native-slider'

import Icon from '../lib/icon'

class Play extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  render () {
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
              uri: 'http://p0j938qnq.bkt.clouddn.com/1125020005339bd9a0o.jpg'
            }}
          ></Image>
        </View>
        <View style={styles.container}>
          <View style={styles.info}>
            <Text style={styles.name}>标题</Text>
            <Text style={styles.singer}>歌手</Text>
          </View>
          <View style={styles.cover}>
            <View style={styles.coverContent}>
              <Image
                style={styles.coverImage}
                source={{
                  uri: 'http://p0j938qnq.bkt.clouddn.com/1125020005339bd9a0o.jpg'
                }}
              ></Image>
            </View>
          </View>
          <View style={styles.controller}>
            <View style={styles.progressContent}>
              <Text
                style={{
                  color: '#fff'
                }}
              >01:23</Text>
              <View style={{
                flex: 1,
                marginLeft: 10,
                marginRight: 10,
                position: 'relative'
              }}>
                <Slider
                  minimumTrackTintColor='#1fb28a'
                  maximumTrackTintColor='#d3d3d3'
                  thumbTintColor='#1a9274'
                ></Slider>
              </View>
              <Text
                style={{
                  color: '#fff'
                }}
              >04:40</Text>
            </View>
            <View style={styles.controllerContainer}>
              <View>
                <Icon style={styles.button} name="random"></Icon>
              </View>
              <View>
                <Icon style={styles.button} name="prev"></Icon>
              </View>
              <View>
                <Icon style={styles.button} name="play"></Icon>
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
  }
})

export default Play
