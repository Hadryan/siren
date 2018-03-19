import Sound from 'react-native-sound'

let _singleton = Symbol()

Sound.setCategory('Playback');

class SoundApi {
  constructor (token) {
    this.token = Math.random()
    if (_singleton !== token)
      throw new Error('Cannot instantiate directly.');
  }
  setURL (url) {
    return new Promise((resolve, reject) => {
      this.player = new Sound(url, '', (error) => {
        if (error) {
          console.log(error)
          reject(error)
          return
        }
        resolve(this)
      })
    })
  }
  play () {
    console.log('play')
    this.player.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
        // reset the player to its uninitialized state (android only)
        // this is the only option to recover after an error occured and use the player again
        this.player.reset();
      }
    })
  }
  static get instance () {
    if (!this[_singleton])
      this[_singleton] = new SoundApi(_singleton)
    
    return this[_singleton]
  }
}

export default SoundApi