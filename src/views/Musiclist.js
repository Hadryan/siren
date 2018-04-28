import React, { Component } from 'react'
import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  Animated,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Easing
} from 'react-native'
import {
  inject,
  observer
} from 'mobx-react'
import SkeletonItem from '../components/SkeletonItem'

import Icon from '../lib/icon'
import api from '../lib/api'
import { durationFormat } from '../lib/tools'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

class MusicItem extends Component {
  render () {
    return (
      <View style={{
        paddingLeft: 10,
        paddingRight: 10
      }}>
        <View style={styles.songItem}>
          <View>
            <Text style={{
              fontSize: 16,
              color: '#6F6F6F'
            }}>{this.props.data.name}</Text>
            <Text style={{
              fontSize: 12,
              color: '#9d9d9d',
              marginTop: 10
            }}>{this.props.data.ar.map(i => i.name).join('/')}</Text>
          </View>
          <View>
            <Text style={{
              fontSize: 14,
              color: '#6F6F6F'
            }}>{durationFormat(this.props.data.dt/1000)}</Text>
          </View>
        </View>
      </View>
    )
  }
}

class HeaderComponent extends Component {
  render () {
    return (
      <Animated.View
        style={this.props.style}
        onLayout={this.props.onLayout}
      >
        <View
          style={styles.header}
        >
          <Image
            source={{
              uri: this.props.cover || 'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'
            }}
            style={{
              width: 130,
              height: 130
            }}
            borderRadius={10}
          ></Image>
          <Text style={styles.title}>
            {this.props.name}
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.describe} numberOfLines={4}>
            {this.props.description}
          </Text>
        </View>
      </Animated.View>
    )
  }
}

class PlayAll extends Component {
  render () {
    return (
      <View style={{
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
        backgroundColor: '#fff'
      }}>
        <View style={styles.playAll}>
          <Icon name="play" style={{color: '#6E6E6E', fontSize: 20}}></Icon>
          <Text style={{color: '#6E6E6E', marginLeft: 10}}>全部播放</Text>
        </View>
      </View>
    )
  }
}

// skeleton component
class Skeleton extends Component {
  render () {
    return (
      <View>
        <View style={styles.header}>
          <SkeletonItem borderRadius={10} style={{ height: 130, width: 130}}></SkeletonItem>
          <View style={{
            flex: 1,
            marginLeft: 20
          }}>
            <SkeletonItem borderRadius={4} style={{ height: 20 }}></SkeletonItem>
            <SkeletonItem borderRadius={4} style={{ height: 20, marginTop: 5 }}></SkeletonItem>
          </View>
        </View>
        <View style={styles.info}>
          <SkeletonItem borderRadius={4} style={{ height: 15 }}></SkeletonItem>
          <SkeletonItem borderRadius={4} style={{ height: 15, marginTop: 5 }}></SkeletonItem>
          <SkeletonItem borderRadius={4} style={{ height: 15, marginTop: 5 }}></SkeletonItem>
        </View>
        <View style={{
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom: 20,
          backgroundColor: '#fff'
        }}>
          <SkeletonItem borderRadius={4} style={{
            height: 45,
            marginTop: 30
          }}></SkeletonItem>
        </View>
      </View>
    )
  }
}

@inject('music')
@observer
class Musiclist extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: '#fff'
  }
  state = {
    animatedValue: new Animated.Value(0),
    headerHeight: 300,
    tracks: [],
    name: '',
    cover: '',
    description: '',
    fetch: true
  }
  componentDidMount () {
    api.getMusiclistDetail(this.props.id)
      .then((data) => {
        const { playlist } = data
        this.setState({
          name: playlist.name,
          description: playlist.description,
          cover: playlist.coverImgUrl,
          tracks: playlist.tracks,
          fetch: false
        })
      })
  }
  render () {
    const { music } = this.props
    
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar
          barStyle="dark-content"
          translucent
        ></StatusBar>

        {
          this.state.fetch ?
          <Skeleton></Skeleton> :
          <AnimatedFlatList
              data={
                [
                  {
                    id: 1,
                    component: <HeaderComponent
                      style={{
                        opacity: this.state.animatedValue.interpolate({
                          inputRange: [0, this.state.headerHeight],
                          outputRange: [1, 0]
                        })
                      }}
                      name={this.state.name}
                      cover={this.state.cover}
                      description={this.state.description}
                      onLayout={(event) => {
                        this.setState({
                          headerHeight: event.nativeEvent.layout.height
                        })
                      }}
                    ></HeaderComponent>
                  },
                  {
                    id: 2,
                    component: 
                    <TouchableOpacity
                      onPress={() => {
                        music.playList(this.state.tracks.map((item) => {
                          return {
                            id: String(item.id),
                            title: item.name,
                            artist: item.ar.map(i => i.name).join('/')
                          }
                        }))
                          .then(() => {
                            this.props.navigator.push({
                              screen: 'crnaproject.Play'
                            })
                          })
                      }}
                    >
                      <PlayAll></PlayAll>
                    </TouchableOpacity>
                  },
                  {
                    id: 3,
                    component: <View style={styles.divide}></View>
                  }
                ].concat(this.state.tracks)
              }
              style={{height: 200}}
              renderItem={({item}) =>
                item.component ?
                item.component :
                <TouchableOpacity
                  onPress={() => {
                    music.fetchPlay({
                      ...item,
                      artists: item.ar
                    })
                      .then(() => {
                        this.props.navigator.push({
                          screen: 'crnaproject.Play'
                        })
                      })
                  }}
                >
                  <MusicItem data={item}></MusicItem>
                </TouchableOpacity>
              }
              stickyHeaderIndices={[1]}
              onScroll={(event) => {
                Animated.event([
                  {
                    y: this.state.animatedValue
                  }
                ])(event.nativeEvent.contentOffset)
              }}
              keyExtractor={(item) => item.id}
            >
          </AnimatedFlatList>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 45
  },
  title: {
    flex: 1,
    marginLeft: 20,
    fontSize: 16,
    color: '#4D4D4D',
    lineHeight: 20
  },
  info: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20
  },
  describe: {
    fontSize: 12,
    color: '#676767',
    lineHeight: 18
  },
  playAll: {
    width: '100%',
    height: 45,
    backgroundColor: '#F4F4F4',
    marginTop: 20,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingLeft: 10,
    paddingRight: 10
  },
  divide: {
    height: 1,
    backgroundColor: '#f6f6f6'
  },
  songItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#F6F6F6'
  }
})

export default Musiclist
