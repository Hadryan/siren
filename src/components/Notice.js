import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform
} from 'react-native'

class Notice extends Component {
  render () {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
          android: {
            // Android does not seem to compute the height correctly using flex
            height: 335,
          },
        })
      }}>
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
