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
  Alert
} from 'react-native'
import Icon from '../lib/icon'
import SongItem from '../components/SongItem'

import api from '../lib/api'
import { unique } from '../lib/tools'

class Search extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state = {
    anis: Array.from({ length: 4}).map(() => {
      return new Animated.Value(10)
    }),
    search: 0,
    searchKey: '',
    datas: {
      type: 1, // 对应结果类型
      list: [], // 数据存放位置
      loading: false, // 加载状态
      total: 1, // 总数量
      page: 0 // 页数
    }
  }
  componentDidMount() {
    Animated.stagger(200, this.state.anis.map((anis) => {
      return Animated.timing(anis, {
        toValue: 0,
        useNativeDriver: true
      })
    })).start()
  }
  fetchData () {
    if (this.state.searchKey.trim() === '') {
      Alert.alert('提示', '请输入正确的关键词', [
        {
          text: '好'
        }
      ])
      return
    }
    if (this.state.datas.loading) return
    if (this.state.datas.list.length >= this.state.datas.total) {
      return
    }
    this.setState({
      ...this.state,
      datas: {
        ...this.state.datas,
        loading: true
      }
    })
    api.search(this.state.searchKey, 1, this.state.datas.page * 20, true, 20)
      .then((data) => {
        data.code === 200 && this.setState({
          ...this.state,
          datas: {
            ...this.state.datas,
            type: 1,
            list: unique(this.state.datas.list.concat(data.result.songs)),
            loading: false,
            total: data.result.songCount,
            page: this.state.datas.page + 1
          }
        })
      })
  }
  toSearch () {
    this.setState({
      search: 1,
      datas: {
        type: 1, // 对应结果类型
        list: [], // 数据存放位置
        loading: false, // 加载状态
        total: 1, // 总数量
        page: 0 // 页数
      }
    },
      this.fetchData
    )
  }
  render () {

    const SearchHistory = (
      <View style={styles.history}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end'
        }}>
          <Text style={styles.title}>搜索历史</Text>
          <Text style={{
            color: '#B3B3B3'
          }}>清除记录</Text>
        </View>
        <View style={styles.historys}>
          {
            ['田馥甄','五月天','Taylor Swift', 'Nicki Miniaj'].map(
              (item, index) => <Animated.View key={index} style={[styles.historyItem, {
                transform: [{
                  translateY: this.state.anis[index]
                }],
                opacity: this.state.anis[index].interpolate({
                  inputRange: [0, 10],
                  outputRange: [1, 0]
                })
              }]}>
                <Text style={styles.historyItemText}>{item}</Text>
              </Animated.View>
            )
          }
        </View>
      </View>
    )

    const SearchResult = (
      <View style={styles.result}>
        <Text style={styles.title}>搜索结果</Text>
        
        <View style={{marginTop: 15, flexGrow: 1}}>
          <FlatList
            style={{marginBottom: 20}}
            data={this.state.datas.list}
            renderItem={({item}) => <View style={{marginBottom: 10}}>
              <SongItem data={item}></SongItem>
            </View>}
            keyExtractor={(item) => item.id}
            ListFooterComponent={() => 
              <View style={{marginTop: 10}}>
                {
                  this.state.datas.loading ?
                  <ActivityIndicator></ActivityIndicator> :
                  <Text style={{textAlign: 'center'}}>~</Text>
                }
              </View>
            }
            onEndReached={() => {
              this.fetchData()
            }}
          ></FlatList>
        </View>
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
          backgroundColor="#fff"
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
              onChangeText={(text) => this.setState({ searchKey: text })}
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
