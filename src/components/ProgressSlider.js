/**
 * music player progress controller
 */

 import React, { Component } from 'react'
 import {
   View,
   Text,
   PanResponder,
   ActivityIndicator
 } from 'react-native'
 
 

class ProgressSlider extends Component {
  state = {
    left: 0,
    sliderSize: 20,
    buffering: 0
  }
  width = 0
  prevLeft = 0
  touching = false
  getValue (value) {
    if (value < 0) {
      return 0
    }
    if (value > this.width - this.state.sliderSize) {
      return this.width - this.state.sliderSize
    }
    return value
  }
  componentWillMount () {
    this._panResponder = PanResponder.create({
      onPanResponderMove: (evt, gestureState) => {
        this.setState({
          left: this.getValue(gestureState.dx + this.prevLeft)
        })
        return true
      },
      onStartShouldSetPanResponder: (e, gestureState) => {
        return true;
      },
      onPanResponderEnd: (e, gestureState) => {
        return true;
      },
      onPanResponderStart: () => {
        this.touching = true
        this.prevLeft = this.state.left
      },
      onPanResponderRelease: () => {
        this.touching = false
        let value = this.state.left / (this.width - this.state.sliderSize)
        this.props.onSlidingComplete(value)
      }
    })
  }
  componentWillReceiveProps (nextProps) {
    if (!this.touching && nextProps.value !== this.props.value) {
      this.setState({
        left: this.getValue(nextProps.value * (this.width - this.state.sliderSize))
      })
    }
    this.setState({
      buffering: nextProps.buffering * this.width
    })
  }
  render () {
    return (
      <View
        style={{width: '100%', position: 'relative'}}
        ref={ref => this.view = ref}
        onLayout={(event) => {
          this.width = event.nativeEvent.layout.width

          this.setState({
            left: this.getValue(this.props.value * this.width),
            buffering: this.props.buffering * this.width
          })
        }}
      >
        <View
          style={{
            height: 5,
            backgroundColor: '#d3d3d3',
            borderRadius: 2.5,
            position: 'absolute',
            width: '100%',
            top: '50%',
            zIndex: 1,
            transform: [
              {
                translateY: -2.5
              }
            ]
          }}
        ></View>
        <View
          style={{
            height: 5,
            backgroundColor: '#aaa',
            borderRadius: 2.5,
            position: 'absolute',
            width: this.state.buffering,
            top: '50%',
            zIndex: 2,
            transform: [
              {
                translateY: -2.5
              }
            ]
          }}
        ></View>
        <View
          style={{
            height: 5,
            backgroundColor: '#1fb28a',
            borderRadius: 2.5,
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
            position: 'absolute',
            width: this.state.left,
            top: '50%',
            zIndex: 3,
            transform: [
              {
                translateY: -2.5
              }
            ]
          }}
        ></View>
        <View
          style={{
            width: this.state.sliderSize,
            height: this.state.sliderSize,
            backgroundColor: '#1fb28a',
            borderRadius: this.state.sliderSize / 2,
            left: this.state.left,
            zIndex: 4
          }}
          {...this._panResponder.panHandlers}
        >
          {
          this.props.isBuffer
            ? <ActivityIndicator
              color='#fff'
            ></ActivityIndicator>
            : null
          }
        </View>
      </View>
    )
  }
}

ProgressSlider.defaultProps = {
  value: 0,
  buffering: 0,
  played: false,
  onSlidingComplete: () => {},
  isBuffer: true
}

export default ProgressSlider
 