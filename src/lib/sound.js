// import Sound from 'react-native-sound'
import TrackPlayer from 'react-native-track-player';

let _singleton = 'singletoken'

class SoundApi {
  list = []
  constructor (token) {
    TrackPlayer.setupPlayer()
    if (_singleton !== token)
      throw new Error('Cannot instantiate directly.');
  }
  add (track) {
    this.list = [track].concat(this.list)
    return TrackPlayer.add(track)
  }
  async play (trackId) {
    if (trackId) {
      await TrackPlayer.skip(trackId)
    }
    return TrackPlayer.play()
  }
  static get instance () {
    if (!this[_singleton])
      this[_singleton] = new SoundApi(_singleton)
    
    return this[_singleton]
  }
}

export default SoundApi