import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Slider,
  findNodeHandle
} from 'react-native'
import {observer, inject} from 'mobx-react'
import LinearGradient from 'react-native-linear-gradient'
import ProgressSlider from '../components/ProgressSlider'

@inject('music')
@observer
class Test extends Component {
  state = {
    visible: false,
    value: 0,
    sliderValue: 0
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
            this.setState({
              value: this.state.sliderValue
            })
          }}
        >
          <Text>修改</Text>
        </TouchableOpacity>
        <Text>值{this.props.music.playerState}</Text>
        <Slider
          style={{
            width: '100%'
          }}
          onValueChange={(data) => {
            this.setState({
              sliderValue: data
            })
          }}
        ></Slider>
        <Text>滑块值:{this.state.sliderValue}</Text>
        <View style={{width: 200}}>
        <ProgressSlider
          isBuffer={true}
          value={this.state.value}
        ></ProgressSlider>
        </View>
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
