import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'

class PlayList extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Image source={{uri: this.props.data.coverImgUrl}} style={styles.cover}></Image>
        <Text
          numberOfLines={2}
          style={styles.name}
        >{this.props.data.name}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 150
  },
  cover: {
    width: 150,
    height: 150,
    borderRadius: 10
  },
  name: {
    color: '#444',
    fontSize: 12,
    marginTop: 10
  }
})

export default PlayList
