import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import Icon from '../src/lib/icon'

class Search extends Component {
  render () {
    return (
      <View>
        <Icon name="search"></Icon>
        <Text>搜索</Text>
      </View>
    )
  }
}

export default Search
