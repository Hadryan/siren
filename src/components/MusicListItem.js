import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'
import {
  inject,
  observer
} from 'mobx-react'
import LinearGradient from 'react-native-linear-gradient'
import Icon from '../lib/icon'

@inject('music')
@observer
class MusicListItem extends Component {
  render () {
    console.log('render')
    return (
      <View
        style={styles.item}
        shadowColor='#BDBDBD'
        shadowOffset={{width: 0, height: 2}}
        shadowRadius={1}
        shadowOpacity={1}
        elevation={1}
      >
        <View style={styles.content}>
          <View style={styles.text}>
            <Text numberOfLines={2} style={{fontSize: 14, color: '#616161'}}>{this.props.data.title}</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                this.props.music.removeTrack(this.props.data.id)
              }}
            >
              <Icon name="delete" style={{fontSize: 25, color: '#FF8F8F'}}></Icon>
            </TouchableOpacity>
          </View>
        </View>

        {
          this.props.active ? 
          <View style={styles.background}>
            <Image style={{width: '100%', height: '100%'}} source={{uri: this.props.data.artwork}}></Image>
            <View style={styles.filter}>
              <LinearGradient
                start={{x: 0.0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={{
                  width: '100%',
                  height: '100%'
                }}
                colors={[
                  'rgba(255,255,255,1)',
                  'rgba(255,255,255,0.9)',
                  'rgba(255,255,255,0.8)'
                ]}
              ></LinearGradient>
            </View>
          </View> :
          null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    height: 55,
    borderRadius: 8,
    borderStyle: 'solid',
    width: '100%'
  },
  text: {
    flex: 1
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    zIndex: 3
  },
  background: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden'
  },
  filter: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  }
})

MusicListItem.defaultProps = {
  data: {
    title: '',
    artwork: ''
  }
}

export default MusicListItem
