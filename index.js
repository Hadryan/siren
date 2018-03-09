import App from './App';

import Home from './views/Home'
import Search from './views/Search'

import { Navigation } from 'react-native-navigation';

// AppRegistry.registerComponent('crnaproject', () => App);
Navigation.registerComponent('crnaproject.Home', () => Home);
Navigation.registerComponent('crnaproject.Search', () => Search);

Navigation.startSingleScreenApp({
  screen: {
      label: 'Home',
      screen: 'crnaproject.Home',
      title: 'Home'
    }
})
