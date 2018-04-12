import {
  observable,
  action,
  computed,
  runInAction
} from 'mobx'
import {
  Platform,
  Alert
} from 'react-native'
import { persist } from 'mobx-persist'
import TrackPlayer from 'react-native-track-player'
import * as types from '../../lib/playModeType'
import TrackPlayerType from '../../lib/TrackPlayerType'
import api from '../../lib/api'

class Music {
  @persist @observable trackId = ''
  @persist('list') @observable list = []
  @persist @observable playerState = ''
  @persist @observable mode = types.LIST_CYCLE
  history = []
  
  @action
  async add (track) {
    let isHave = !!this.list.find((i) => i.id === track.id)
    let playerQueenTrack = true
    if (!isHave) {
      this.list.unshift(track)
    }
  }
  @action
  async play (trackId, addHistory = true) {
    if (this.list.length === 0) return
    
    if (trackId) {
      let track = this.list.find((i) => i.id === trackId)
  
      if (!track) {
        return new Error('歌曲未添加到列表')
      }
      
      let playerQueenTrack = true
      try {
        await TrackPlayer.getTrack(track.id)
      } catch (e) {
        console.log('查询错误', e)
        playerQueenTrack = false
      }
      if (!playerQueenTrack) {
        
        if (!track.artwork) {
          track.artwork = 'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'
        }
        
        console.log('add Track', track)
        await TrackPlayer.add(track)
      }

      if (addHistory) {
        this.history.push(this.trackId)
      }
      this.trackId = trackId
      await TrackPlayer.skip(trackId)
    }
    await TrackPlayer.play()
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
      return
    }
    if (id === this.trackId) {
      await TrackPlayer.stop()
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
    await this.fetchPlay({
      id: nextTackid
    })
  }
  @action 
  async playPrev() {
    let track = this.history.pop()
    // WIP[]
    if (track === this.trackId) {
      track = this.history.pop()
    }
    if (!track) {
      track = this.trackId
    }
    await this.fetchPlay({
      id: track
    })
  }
  /**
   * 远程播放
   * @param {Object} item 列表获取的原音乐项
   */
  async fetchPlay (item, played = true, alert = true) {
    const detail = await api.getDetailById(item.id)

    if (!detail.url && alert) {
      Alert.alert('没有获取到播放链接')
      return
    }
    let track = await this.list.find(i => i.id === String(item.id))
    if (!track) {
      track = {
        id: String(item.id),
        title: item.name,
        artist: item.artists.map(i => i.name).join('/')
      }
    }
    track.artwork = detail.cover
    track.url = detail.url
    await this.add(track)

    if (played) {
      await this.play(String(item.id))
    }
  }
  async playList (list) {
    await this.clearList()
    
    for (let item of Array.from(list).reverse()) {
      await this.add(item)
    }
    await this.fetchPlay(list[0])
  }
}

const music = new Music()

TrackPlayer.registerEventHandler(async (data) => {
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