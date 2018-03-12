import Home from './src/views/Home'
import Search from './src/views/Search'

import { Navigation } from 'react-native-navigation';

Navigation.registerComponent('crnaproject.Home', () => Home);
Navigation.registerComponent('crnaproject.Search', () => Search);

Navigation.startSingleScreenApp({
  screen: {
      label: 'Home',
      screen: 'crnaproject.Home',
      title: 'Home'
    }
})
