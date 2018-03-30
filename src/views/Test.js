import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  findNodeHandle
} from 'react-native'
import {observer, inject} from 'mobx-react'
import LinearGradient from 'react-native-linear-gradient'

import MusicList from '../components/MusicList'
import Item from '../components/MusicListItem'

@inject('music')
@observer
class Test extends Component {
  state = {
    visible: false
  }
  render () {
    console.log(this.props)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.music.testAction()
          }}
        >
          <Text>修改</Text>
        </TouchableOpacity>
        <Text>值{this.props.music.playerState}</Text>
        <MusicList show></MusicList>
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
