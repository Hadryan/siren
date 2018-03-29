import { Navigation } from 'react-native-navigation'

import Home from './src/views/Home'
import Search from './src/views/Search'
import Play from './src/views/Play'
import Notice from './src/components/Notice'

import Provider from './src/store/MobxRnnProvider'
import store from './src/store/models'

Navigation.registerComponent('crnaproject.Home', () => Home, store, Provider)
Navigation.registerComponent('crnaproject.Search', () => Search, store, Provider)
Navigation.registerComponent('crnaproject.Play', () => Play, store, Provider)
Navigation.registerComponent('crnaproject.Notice', () => Notice, store, Provider)

Navigation.startSingleScreenApp({
  screen: {
    screen: 'crnaproject.Home'
  }
})
