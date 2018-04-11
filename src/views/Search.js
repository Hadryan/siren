import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  Animated,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Alert,
  AsyncStorage
} from 'react-native'
import { Navigation } from 'react-native-navigation'
import { observer, inject } from 'mobx-react'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import Icon from '../lib/icon'
import SongItem from '../components/SongItem'
import PlayListItem from '../components/PlayListItem'
import Tabbar from '../components/Tabbar'

import api from '../lib/api'
import { unique } from '../lib/tools'
import Sound from '../lib/sound'

const sound = Sound.instance

@inject('music')
@observer
class Search extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: '#fff'
  }
  state = {
    anis: [],
    search: 0,
    searchKey: '',
    history: [],
    // 歌曲搜索结果
    musicData: {
      list: [], // 列表
      loading: false, // 加载状态
      total: 1, // 总数量
      page: 0 // 页数
    },
    // 歌单搜索结果
    musiclistData: {
      list: [], // 列表
      loading: false, // 加载状态
      total: 1, // 总数量
      page: 0 // 页数
    }
  }
  componentDidMount() {
    this.updateHistory()
  }
  componentDidUpdate () {
    if (this.state.search === 0) {
      Animated.stagger(200, this.state.anis.map((anis) => {
        return Animated.timing(anis, {
          toValue: 0,
          useNativeDriver: true
        })
      })).start()
    }
  }
  fetchData (type = 1) {
    if (this.state.searchKey.trim() === '') {
      Alert.alert('提示', '请输入正确的关键词', [
        {
          text: '好'
        }
      ])
      return
    }
    let stateKey = 'musicData'
    switch (type) {
      case 1:
        stateKey = 'musicData'
        break
      case 1000:
        stateKey = 'musiclistData'
        break
    }
    let handler = this.state[stateKey]
    // break check
    if (handler.loading) return
    if (handler.list.length >= handler.total) {
      return
    }

    this.addHistory(this.state.searchKey)

    this.setState({
      ...this.state,
      [stateKey]: {
        ...handler,
        loading: true
      }
    })
    api.search(this.state.searchKey, type, handler.page * 20, true, 20)
      .then((data) => {
        console.log(data)
        let baselist = []
        switch (type) {
          case 1:
            baselist = data.result.songs
            break
          case 1000:
            baselist = data.result.playlists
            break
        }
        data.code === 200 && this.setState({
          ...this.state,
          [stateKey]: {
            ...handler,
            list: unique(handler.list.concat(baselist), 'id'),
            loading: false,
            total: data.result.songCount,
            page: handler.page + 1
          }
        })
      })
  }
  setStateToDefault () {
    return new Promise((resolve, reject) => {
      this.setState({
        musicData: {
          list: [], // 列表
          loading: false, // 加载状态
          total: 1, // 总数量
          page: 0 // 页数
        }
      }, resolve)
    })
  }
  toSearch () {
    this.setStateToDefault()
      .then(() => {
        this.setState({
          search: 1
        }, () => {
          this.fetchData(1)
        })
      })
  }
  addHistory (name) {
    // update search history
    AsyncStorage.getItem('searchHistory', (error, result) => {
      if (error) return
      const arr = new Set(JSON.parse(result))
      
      arr.add(name)
      
      AsyncStorage.setItem('searchHistory', JSON.stringify([...arr]), () => this.updateHistory())
    })
  }
  updateHistory (callback = () => {}) {
    AsyncStorage.getItem('searchHistory', (error, result) => {
      if (error) return
      let arr = JSON.parse(result) || []
      this.setState({
        history: arr,
        anis: Array.from({ length: arr.length }).map(() => {
          return new Animated.Value(10)
        })
      }, callback)
    })
  }
  clearHistoty () {
    AsyncStorage.setItem('searchHistory', '[]', (error) => {
      if (error) return
      Animated.stagger(200, this.state.anis.map((anis) => {
        return Animated.timing(anis, {
          toValue: 10,
          useNativeDriver: true
        })
      })).start(() => {
        this.setState({
          history: [],
          anis: []
        })
      })
    })
  }
  render () {
    const { music } = this.props
    const SearchHistory = (
      <View style={styles.history}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end'
        }}>
          <Text style={styles.title}>搜索历史</Text>
          
          <TouchableOpacity onPress={() => this.clearHistoty()}>
            <Text style={{
              color: '#B3B3B3'
            }}>清除记录</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.historys}>
          {
            this.state.history.map(
              (item, index) => <Animated.View key={index} style={[styles.historyItem, {
                transform: [{
                  translateY: this.state.anis[index]
                }],
                opacity: this.state.anis[index].interpolate({
                  inputRange: [0, 10],
                  outputRange: [1, 0]
                })
              }]}>
                <TouchableOpacity onPress={() => {
                  this.setState({
                    searchKey: item
                  }, () => {
                    this.toSearch()
                  })
                }}>
                  <Text style={styles.historyItemText}>{item}</Text>
                </TouchableOpacity>
              </Animated.View>
            )
          }
        </View>
      </View>
    )

    const SearchResult = (
      <View style={styles.result}>
        <ScrollableTabView
          renderTabBar={() => <Tabbar></Tabbar>}
        >
          <View style={{marginTop: 15, flexGrow: 1}} tabLabel="歌曲">
            <FlatList
              style={{marginBottom: 20}}
              data={this.state.musicData.list}
              renderItem={({item}) =>
                <View style={{marginBottom: 10}}>
                  <TouchableOpacity onPress={() => {
                    music
                      .fetchPlay(item)
                      .then(() => {
                        this.props.navigator.push({
                          screen: 'crnaproject.Play'
                        })
                      })
                  }}>
                    <SongItem data={item}></SongItem>
                  </TouchableOpacity>
                </View>
              }
              keyExtractor={(item) => item.id}
              ListFooterComponent={() => 
                <View style={{marginTop: 10}}>
                  {
                    this.state.musicData.loading ?
                    <ActivityIndicator></ActivityIndicator> :
                    <Text style={{textAlign: 'center'}}>~</Text>
                  }
                </View>
              }
              onEndReached={() => {
                this.fetchData(1)
              }}
            ></FlatList>
          </View>
          <View style={{marginTop: 15, flexGrow: 1}} tabLabel="歌单">
            <FlatList
              style={{marginBottom: 20}}
              data={this.state.musiclistData.list}
              renderItem={({item}) =>
                <View style={{marginBottom: 10}}>
                  <TouchableOpacity onPress={() => {
                    this.props.navigator.push({
                      screen: 'crnaproject.Musiclist',
                      passProps: {
                        id: item.id
                      }
                    })
                  }}>
                    <PlayListItem data={item}></PlayListItem>
                  </TouchableOpacity>
                </View>
              }
              keyExtractor={(item) => item.id}
              ListFooterComponent={() => 
                <View style={{marginTop: 10}}>
                  {
                    this.state.musiclistData.loading ?
                    <ActivityIndicator></ActivityIndicator> :
                    <Text style={{textAlign: 'center'}}>~</Text>
                  }
                </View>
              }
              onEndReached={() => {
                this.fetchData(1000)
              }}
            ></FlatList>
          </View>
        </ScrollableTabView>
        
      </View>
    )

    return (
      <View style={{ 
        flex: 1,
        backgroundColor: '#fff'
      }}>
        <StatusBar
          barStyle="dark-content"
          translucent
        ></StatusBar>

        <View style={styles.search}>
          <View style={styles.searchBox}>
            <Icon
              name="search"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="请输入搜索关键词"
              autoFocus
              underlineColorAndroid='rgba(0,0,0,0)'
              returnKeyType='search'
              value={this.state.searchKey}
              onChangeText={(text) => {
                this.setState({
                  searchKey: text,
                  search: text.trim().length === 0 ? 0 : this.state.search
                })}
              }
              onSubmitEditing={() => this.toSearch()}
            ></TextInput>
          </View>
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => {
              this.toSearch()
            }}
          >
            <Text style={styles.searchText}>搜索</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          flexGrow: 1
        }}>
          {
            this.state.search === 1
            ? SearchResult
            : SearchHistory
          }
        </View>
      </View>
    )
  }
}

const baseContainer = {
  paddingLeft: 20,
  paddingRight: 20,
  position: 'absolute',
  width: '100%',
  height: '100%',
}

const styles = StyleSheet.create({
  search: {
    padding: 20,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchBox: {
    backgroundColor: '#F9F9F9',
    flexGrow: 1,
    borderStyle: 'solid',
    borderColor: '#E6E6E6',
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40
  },
  searchIcon: {
    marginLeft: 5,
    marginRight: 5,
    color: '#D4D4D4'
  },
  input: {
    flexGrow: 1,
    fontSize: 12
  },
  searchText: {
    fontSize: 14,
    color: '#6E6E6E'
  },
  searchBtn: {
    marginLeft: 20,
    alignItems: 'flex-end'
  },
  title: {
    fontSize: 18,
    color: '#626262'
  },
  history: {
    ...baseContainer
  },
  historys: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  historyItem: {
    marginTop: 10,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginRight: 10
  },
  historyItemText: {
    color: '#929292'
  },
  result: {
    ...baseContainer,
    paddingBottom: 20
  }
})

export default Search
