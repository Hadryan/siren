import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

class Notice extends Component {
  render () {
    return (
      <View>
        <Text style={styles.text}>{this.props.message}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#888'
  }
})

export default Notice
