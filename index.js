import TrackPlayer from 'react-native-track-player'
import { Navigation } from 'react-native-navigation'

import Home from './src/views/Test'
import Search from './src/views/Search'
import Play from './src/views/Play'
import Notice from './src/components/Notice'

import event from './src/lib/playerEvent'

import Provider from './src/store/MobxRnnProvider'
import models from './src/store/models'

Navigation.registerComponent('crnaproject.Home', () => Home, models, Provider)
Navigation.registerComponent('crnaproject.Search', () => Search)
Navigation.registerComponent('crnaproject.Play', () => Play)
Navigation.registerComponent('crnaproject.Notice', () => Notice)

Navigation.startSingleScreenApp({
  screen: {
    screen: 'crnaproject.Home'
  }
})

TrackPlayer.registerEventHandler(event)