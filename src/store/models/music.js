import {
  observable,
  action,
  computed,
  runInAction
} from 'mobx'
import {
  Platform
} from 'react-native'
import { persist } from 'mobx-persist'
import TrackPlayer from 'react-native-track-player'
import * as types from '../../lib/playModeType'
import TrackPlayerType from '../../lib/TrackPlayerType'

class Music {
  @persist @observable trackId = ''
  @persist('list') @observable list = []
  @persist @observable playerState = ''
  @persist @observable mode = types.LIST_CYCLE
  history = []
  
  @action
  add (track) {
    let isHave = !!this.list.find((i) => i.id === track.id)
    console.log('isHave', isHave)
    if (!isHave) {
      this.list.unshift(track)
      return TrackPlayer.add(track)
    }
    return Promise.resolve()
  }
  @action
  async play (trackId, addTrack = true) {
    if (this.list.length === 0) return
    
    if (trackId) {
      if (addTrack) {
        this.history.push(this.trackId)
      }
      this.trackId = trackId
      await TrackPlayer.skip(trackId)
    }
    return TrackPlayer.play()
  }
  @action
  async pause () {
    return TrackPlayer.pause()
  }
  @action
  async updateState() {
    const state = await TrackPlayer.getState()
    
    runInAction(() => {
      this.playerState = state
    })
  }
  @action
  clearList() {
    this.list = []
    TrackPlayer.reset()
  }
  @action
  async removeTrack(id) {
    if (!id) {
      console.warn('need track id')
      return
    }
    if (id === this.trackId) {
      TrackPlayer.stop()
    }
    // WIP[remove will auto play on iOS]
    if (Platform.OS === 'android') {
      await TrackPlayer.remove(id)
    }
    this.list = this.list.filter((item) => item.id !== id)
  }
  @action
  switchMode () {
    switch (this.mode) {
      case types.LIST_CYCLE:
        this.mode = types.SINGLE_CYCLE
        break
      case types.SINGLE_CYCLE:
        this.mode = types.RANDOM
        break
      case types.RANDOM:
        this.mode = types.LIST_CYCLE
        break
    }
  }
  @action
  async playNext () {
    this.history.push(this.trackId)
    let current,nextTackid
    this.list.forEach((item, index) => {
      if (item.id === this.trackId) {
        current = index + 1 > this.list.length - 1 ? 0 : index + 1
        console.log(`当前${index},下一个${current}`, Array.from(this.list))
      }
    })
    
    switch (this.mode) {
      case types.LIST_CYCLE:
        nextTackid = this.list[current].id
        break
      case types.SINGLE_CYCLE:
        nextTackid = this.trackId
        break
      case types.RANDOM:
        nextTackid = this.list[Math.floor(Math.random() * this.list.length)].id
        break
    }
    await this.play(nextTackid)
  }
  @action 
  async playPrev() {
    console.log(this.history)
    let track = this.history.pop()
    // WIP[]
    if (track === this.trackId) {
      track = this.history.pop()
    }
    if (!track) {
      track = this.trackId
    }
    await this.play(track, false)
  }
}

const music = new Music()

TrackPlayer.registerEventHandler(async (data) => {
  console.log('event', data.type)
  switch (data.type) {
    case 'remote-play':
      await music.play()
      break
    case 'remote-pause':
      await music.pause()
      break
    case 'playback-state':
      // WIP[] accurate case state 
      let durantion = await TrackPlayer.getDuration()
      let position = await TrackPlayer.getPosition()
      const state = await TrackPlayer.getState()
      if(state === TrackPlayerType.STATE_PAUSED && durantion === position) {
        await music.playNext()
      }
      break
  }

  await music.updateState()
})

music.updateState()
export default music