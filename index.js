import TrackPlayer from 'react-native-track-player'
import { Navigation } from 'react-native-navigation'

import Home from './src/views/Home'
import Search from './src/views/Search'
import Play from './src/views/Play'
import Notice from './src/components/Notice'

import event from './src/lib/playerEvent'

Navigation.registerComponent('crnaproject.Home', () => Home)
Navigation.registerComponent('crnaproject.Search', () => Search)
Navigation.registerComponent('crnaproject.Play', () => Play)
Navigation.registerComponent('crnaproject.Notice', () => Notice)

Navigation.startSingleScreenApp({
  screen: {
    screen: 'crnaproject.Home'
  }
})

TrackPlayer.registerEventHandler(event)