import React, { Component } from 'react'
import { View } from 'react-native'
import { NativeRouter, Route, Redirect } from 'react-router-native'

import Home from './views/Home'
import Search from './views/Search'

class App extends Component {
  render () {
    return (
      <NativeRouter>
        <View style={{flex: 1}}>
          <Route exact path="/" component={
            () => <Redirect to="/search" />
          }></Route>
          <Route path="/search" component={Search}></Route>
          <Route path="/home" component={Home}></Route>
        </View>
      </NativeRouter>
    )
  }
}

export default App
