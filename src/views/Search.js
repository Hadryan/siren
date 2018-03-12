import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
  Button,
  Animated
} from 'react-native'
import Icon from '../lib/icon'

class Search extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state = {
    anis: Array.from({ length: 4}).map(() => {
      return new Animated.Value(10)
    })
  }
  componentDidMount() {
    Animated.stagger(200, this.state.anis.map((anis) => {
      return Animated.timing(anis, {
        toValue: 0,
        useNativeDriver: true
      })
    })).start()
  }
  render () {
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
            ></TextInput>
          </View>
          <TouchableHighlight
            style={styles.searchBtn}
          >
            <Text style={styles.searchText}>搜索</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.history}>
          <Text style={styles.title}>搜索历史</Text>
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
      </View>
    )
  }
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
    paddingLeft: 20,
    paddingRight: 20
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
  }
})

export default Search
