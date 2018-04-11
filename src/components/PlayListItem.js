/**
 * 歌单展示组件
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'

class PlayListItem extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: this.props.data.coverImgUrl || 'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 8
          }}
        ></Image>
        <View style={styles.text}>
          <Text style={{
            fontSize: 14,
            color: '#6B6B6B'
          }} numberOfLines={2}>{this.props.data.name}</Text>
          <Text style={{
            fontSize: 12,
            color: '#999999'
          }} numberOfLines={1}>播放量:{this.props.data.playCount}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FBFBFB',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row'
  },
  text: {
    flex: 1,
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10
  }
})

export default PlayListItem
