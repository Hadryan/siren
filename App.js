import React, { Component } from 'react'
import { View } from 'react-native'
import { NativeRouter, Route } from 'react-router-native'

import Home from './views/Home'

class App extends Component {
  render () {
    return (
      <NativeRouter>
        <Route exact path="/" component={Home}></Route>
      </NativeRouter>
    )
  }
}

export default App
