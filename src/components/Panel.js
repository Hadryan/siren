import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

class Panel extends Component {
  render () {
    return (
      <View style={styles.panel}>
        <View>
          <Text style={styles.title}>
            {this.props.title || '标题'}
          </Text>
        </View>
        <View>
          {this.props.children}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  panel: {
    padding: 20
  },
  title: {
    fontSize: 30,
    color: '#333',
    marginBottom: 20
  }
})

export default Panel
