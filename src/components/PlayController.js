import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native'
import * as Progress from 'react-native-progress'
import Icon from '../lib/icon'

class PlayController extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.cover}>
            <Progress.Circle
              progress={0.4}
              borderWidth={0}
              thickness={5}
              color='#11999E'
              strokeCap='round'
              style={{
                position: 'absolute',
                zIndex: 2
              }}
              size={50} />
            <Image
              source={{
                uri: 'http://p0j938qnq.bkt.clouddn.com/1125020005339bd9a0o.jpg'
              }}
              style={{
                width: 50,
                height: 50,
                position: 'absolute',
                zIndex: 1,
                borderRadius: 25
              }}
            ></Image>
          </View>
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
    borderRadius: 25,
    position: 'relative'
  },
  name: {
    fontSize: 16,
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
