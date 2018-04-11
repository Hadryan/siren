import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Slider
} from 'react-native'
import PlayListItem from '../components/PlayListItem'

class Test extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: '#fff'
  }
  state = {
    visible: false,
    value: 0,
    sliderValue: 0
  }
  render () {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <PlayListItem></PlayListItem>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Test
