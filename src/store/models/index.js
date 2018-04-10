import TrackPlayer from 'react-native-track-player'
import { AsyncStorage } from 'react-native'
import { create } from 'mobx-persist'
import music from './music'

TrackPlayer.setupPlayer({})
  .then(() => {
    TrackPlayer.updateOptions({
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS
      ]
    })
  })
    
const hydrate = create({ storage: AsyncStorage })

hydrate('music', music)
  .then(() => {
    // console.log(music.list.slice())
    // TrackPlayer.reset()
    // TrackPlayer.add(music.list.slice())
  })
export default {
  music
}