import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import Icon from '../lib/icon'

class MusicListItem extends Component {
  render () {
    return (
      <View
        style={styles.item}
        shadowColor='#BDBDBD'
        shadowOffset={{width: 0, height: 2}}
        shadowRadius={1}
        shadowOpacity={1}
        elevation={1}
      >
        <View style={styles.text}>
          <Text numberOfLines={2} style={{fontSize: 14, color: '#616161'}}>item</Text>
        </View>
        <View>
          <Icon name="delete" style={{fontSize: 25, color: '#FF8F8F'}}></Icon>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderStyle: 'solid',
    paddingLeft: 15,
    paddingRight: 15
  },
  text: {
    flex: 1
  }
})

export default MusicListItem
