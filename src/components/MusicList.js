/**
 * local play list
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  FlatList,
  Platform
} from 'react-native'
import {
  observer,
  inject
} from 'mobx-react'
import { BlurView } from 'react-native-blur'
import Item from './MusicListItem'
import Icon from '../lib/icon'

@inject('music')
@observer
class MusicList extends Component {
  /**
   * hide this component logic code 
   */
  state = {
    animate: new Animated.Value(this.props.show ? 1 : 0)
  }
  hideLayout () {
    Animated.timing(this.state.animate, {
      toValue: 0
    }).start(this.props.onHide)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.show) {
      Animated.timing(this.state.animate, {
        toValue: 1
      }).start()
    }
  }
  componentWillMount () {
  }
  render () {
    const { music } = this.props

    if (!this.props.show) {
      return null
    }

    const getPanel = (child) => {
      if (Platform.OS === 'android') {
        return <View style={[styles.panelBody, {
          backgroundColor: 'rgba(255,255,255,.8)'
        }]}>{child}</View>
      } else {
        return <BlurView
        blurType="xlight"
        style={styles.panelBody}
        blurAmount={30}
      >{child}</BlurView>
      }
    }

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={()=>{
          this.hideLayout()
        }}>
          <Animated.View
            style={[styles.background, {
              opacity: this.state.animate
            }]}
          >
          </Animated.View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={[styles.panel, {
            height: this.props.height,
            transform: [{
              translateY: this.state.animate.interpolate({
                inputRange: [0, 1],
                outputRange: [this.props.height, 0]
              })
            }]
          }]}
        >
          {
            getPanel(
              music.list.length > 0 ?
              (
                <View style={{flex:1, width: '100%'}}>
                  <View style={styles.clear}>
                    <TouchableOpacity onPress={() => {
                      music.clearList()
                    }}>
                      <Icon style={{fontSize: 20,color: '#757575'}} name="clear"></Icon>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.list}>
                    <FlatList
                      keyExtractor={(item) => item.id}
                      data={music.list.slice()}
                      extraData={music.trackId}
                      renderItem={({item}) => <View style={{marginBottom: 10}}>
                        <TouchableOpacity
                          onPress={() => {
                            music.fetchPlay(item)
                          }}
                        >
                          <Item data={item} active={item.id === music.trackId}></Item>
                        </TouchableOpacity>
                      </View>}
                    ></FlatList>
                  </View>
                </View>
              ) :
              <View>
                <Text style={{color: '#888', fontSize: 20}}>😉播放列表还没有歌曲</Text>
              </View>
            )
          }
        </Animated.View>
      </View>
    )
  }
}

MusicList.defaultProps = {
  show: false,
  height: 400,
  onHiden: () => {}
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10
  },
  background: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    height: '100%'
  },
  panel: {
    position: 'absolute',
    width: '100%',
    bottom: 0
  },
  panelBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  clear: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1
  }
})

export default MusicList
