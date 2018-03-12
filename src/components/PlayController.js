import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import Icon from '../lib/icon'

class PlayController extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.cover}></View>
          <View style={{marginLeft: 10}}>
            <Text style={styles.name}>色は匂へど散りぬるを</Text>
            <Text style={styles.singer}>幽閉サテライト</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Icon style={styles.controllerIcon} name="play"></Icon>
          </View>
          <View>
            <Icon style={styles.list} name="list"></Icon>
          </View>
        </View>
      </View>
    )
  }
}

const baseIcon = {
  color: '#6F6F6F',
  fontSize: 20
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  cover: {
    width: 50,
    height: 50,
    backgroundColor: '#ddd',
    borderRadius: 25
  },
  name: {
    fontSize: 14,
    color: '#616161'
  },
  singer: {
    fontSize: 12,
    marginTop: 5,
    color: '#A4A4A4'
  },
  controllerIcon: {
    marginRight: 15,
    ...baseIcon
  },
  list: {
    fontSize: 20,
    ...baseIcon
  }
})

export default PlayController
