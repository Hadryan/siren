import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  ScrollView,
  RefreshControl,
  TouchableHighlight
} from 'react-native'
import TrackPlayer from 'react-native-track-player'
import TrackPlayerType from '../lib/TrackPlayerType'

import Panel from '../components/Panel'
import PlayList from '../components/PlayList'
import Album from '../components/Album'
import PlayController from '../components/PlayController'
import MusicList from '../components/MusicList'

import Api from '../lib/api'

class Home extends Component {
  constructor (props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }
  static navigatorStyle = {
    navBarHidden: true
  }
  state = {
    topList: [],
    newAlbums: [],
    refreshing: false,
    playController: false,
    musicList: false
  }
  async componentDidMount () {
    await TrackPlayer.setupPlayer({})
    TrackPlayer.updateOptions({
        capabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE,
            TrackPlayer.CAPABILITY_SEEK_TO,
            TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
            TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS
        ]
    })
    this.updateUI()
  }
  componentWillMount () {
    this.fetchData()
  }
  fetchData () {
    this.setState({refreshing: true})

    Promise.all(
      [
        Api.topPlayList().then((response) => {
          this.setState({
            topList: response.playlists
          })
        }),
        Api.newAlbums().then((response) => {
          this.setState({
            newAlbums: response.albums
          })
        })
      ]
    ).then(() => {
      this.setState({
        refreshing: false
      })
    })
  }
  onNavigatorEvent (event) {
    if (event.id === 'didAppear') {
      this.updateUI()
    }
  }
  updateUI () {
    TrackPlayer.getState().then((state) => {
      
      this.setState({
        playController:
          state !== TrackPlayerType.STATE_NONE &&
          state !== TrackPlayerType.STATE_STOPPED
      })
    }).catch((error) => {
      console.log('error', error)
    })
  }
  render () {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="rgba(0,0,0,0.4)"
        ></StatusBar>
        <View style={styles.search}>
          <TouchableHighlight
            underlayColor="#12686b"
            onPress={() => {
              this.props.navigator.push({
                screen: 'crnaproject.Search',
                title: 'Pushed Screen'
              });
            }}
            style={styles.searchBox} 
          >
            <Text style={{
              color: '#fff',
              fontSize: 12
            }}>请输入搜索关键词</Text>
          </TouchableHighlight>
        </View>
        
        <View style={styles.list}>
          <ScrollView
            refreshControl={
              <RefreshControl 
                refreshing={this.state.refreshing}
                onRefresh={() => {
                  this.fetchData()
                }}
              />
            }
          >
            <Panel
              title="推荐"
            >
              <FlatList
                horizontal
                data={this.state.topList}
                keyExtractor={(_, index) => `list${index}`}
                renderItem={({item, index}) => 
                  <View style={{
                    marginRight: index === this.state.topList.length - 1 ? 0 : 30
                  }}>
                    <PlayList data={item} />
                  </View>
                }
              ></FlatList>
            </Panel>
            <Panel
              title="最新专辑"
            >
              <FlatList
                horizontal
                data={this.state.newAlbums}
                keyExtractor={(_, index) => `list${index}`}
                renderItem={({item, index}) => 
                  <View style={{
                    marginRight: index === this.state.newAlbums.length - 1 ? 0 : 30
                  }}>
                    <Album data={item} />
                  </View>
                }
              ></FlatList>
            </Panel>
          </ScrollView>
        </View>
        
        {
          this.state.playController
          ? <TouchableHighlight
            onPress={() => {
              this.props.navigator.push({
                screen: 'crnaproject.Play'
              })
            }}
          >
            <View style={{
              backgroundColor: '#FBFBFB'
            }}>
              <PlayController listClick={() => {
                this.setState({
                  musicList: true
                })
              }}></PlayController>
            </View>
          </TouchableHighlight>
          : null
        }
        <MusicList show={this.state.musicList} onHide={() => {
          this.setState({
            musicList: false
          })
        }}></MusicList>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    flex: 1,
    width: '100%',
    flexGrow: 1
  },
  search: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#11999E'
  },
  searchBox: {
    padding: 8,
    width: '50%',
    backgroundColor: '#138286',
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10
  }
})

export default Home
