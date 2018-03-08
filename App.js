import React, { Component } from 'react'
import { View } from 'react-native'
import { NativeRouter, Route } from 'react-router-native'

import Home from './views/Home'
import Search from './views/Search'

class App extends Component {
  render () {
    return (
      <NativeRouter>
        <View style={{flex: 1}}>
          <Route exact path="/" component={Home}></Route>
          <Route path="/search" component={Search}></Route>
        </View>
      </NativeRouter>
    )
  }
}

export default App
