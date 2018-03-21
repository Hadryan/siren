import { Platform, AppRegistry } from 'react-native'
import TrackPlayer from 'react-native-track-player'
import { Navigation, NativeEventsReceiver } from 'react-native-navigation'

import Home from './src/views/Home'
import Search from './src/views/Search'
import Play from './src/views/Play'
import Notice from './src/components/Notice'

import event from './src/lib/playerEvent'

Navigation.registerComponent('crnaproject.Home', () => Home)
Navigation.registerComponent('crnaproject.Search', () => Search)
Navigation.registerComponent('crnaproject.Play', () => Play)
Navigation.registerComponent('crnaproject.Notice', () => Notice)

if (Platform.OS === 'android') {
  Navigation.isAppLaunched()
  .then(appLaunched => {
    if (appLaunched) {
      startApp(); // App is launched -> show UI
    }
    new NativeEventsReceiver().appLaunched(startApp); // App hasn't been launched yet -> show the UI only when needed.
  });

  AppRegistry.registerHeadlessTask()
}

function startApp() {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'crnaproject.Home'
    }
  })
}

TrackPlayer.setupPlayer().then(startApp)
TrackPlayer.registerEventHandler(event)