import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

class SongItem extends Component {
  render () {
    const { data } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.name}>
          {data.name}
        </Text>
        <View style={styles.info}>
          <Text style={styles.infoText}>{
            data.artists.map((item) => item.name).join('/')
          }</Text>
          <Text style={[styles.infoText, styles.divider]}>·</Text>
          <Text style={styles.infoText}>{
            data.album.name
          }</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBFBFB',
    width: '100%',
    paddingTop: 20,
    paddingRight: 15,
    paddingBottom: 20,
    paddingLeft: 15,
    borderRadius: 8
  },
  name: {
    fontSize: 16,
    color: '#848484'
  },
  info: {
    flexDirection: 'row',
    marginTop: 10
  },
  infoText: {
    fontSize: 12,
    color: '#C1C1C1',
  },
  divider: {
    marginLeft: 5,
    marginRight: 5
  }
})

export default SongItem
