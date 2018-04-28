/**
 * 骨架项
 */
import React, { Component } from 'react'
import {
  View,
  Animated,
  Easing
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

class SkeletonItem extends Component {
  state = {
    animation: new Animated.Value(0),
    width: 0
  }
  startAnimation (width) {
    this.setState({
      width
    })
    Animated.loop(
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: width * 6,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start()
  }
  render () {
    const LinearView = Animated.createAnimatedComponent(LinearGradient)

    return (
      <View
        {...this.props}
        onLayout={(event) => {
          this.startAnimation(event.nativeEvent.layout.width)
        }}
        style={{
          ...this.props.style,
          backgroundColor: '#eee',
          position: 'relative',
          overflow: 'hidden'
        }}>
        <LinearView
          start={{x: 0.0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={{
            position: 'absolute',
            width: 30,
            height: '100%',
            transform: [
              {
                translateX: this.state.animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-30, this.state.width]
                })
              }
            ]
          }}
          colors={[
            'rgba(255,255,255,0)',
            'rgba(255,255,255,0.4)',
            'rgba(255,255,255,0.6)',
            'rgba(255,255,255,0.4)',
            'rgba(255,255,255,0)',
          ]}
        ></LinearView>
      </View>
    )
  }
}

export default SkeletonItem
