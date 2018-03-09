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

import Panel from '../src/components/Panel'
import PlayList from '../src/components/PlayList'
import Album from '../src/components/Album'

import Api from '../src/lib/api'

class Home extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state = {
    topList: [],
    newAlbums: [],
    refreshing: false
  }
  componentWillMount () {
    // this.fetchData()
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
  render () {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          // translucent
          backgroundColor="#12686b"
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
