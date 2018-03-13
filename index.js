import Home from './src/views/Home'
import Search from './src/views/Search'
import Play from './src/views/Play'

import { Navigation } from 'react-native-navigation'

Navigation.registerComponent('crnaproject.Home', () => Home)
Navigation.registerComponent('crnaproject.Search', () => Search)
Navigation.registerComponent('crnaproject.Play', () => Play)

Navigation.startSingleScreenApp({
  screen: {
    label: 'Home',
    screen: 'crnaproject.Home'
  }
})
