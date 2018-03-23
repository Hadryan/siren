import { Platform } from 'react-native'

export default {
  STATE_NONE: Platform.OS === 'android' ? 0 : 'STATE_NONE',
  STATE_STOPPED: Platform.OS === 'android' ? 1 : 'STATE_STOPPED',
  STATE_PAUSED: Platform.OS === 'android' ? 2 : 'STATE_PAUSED',
  STATE_PLAYING: Platform.OS === 'android' ? 3 : 'STATE_PLAYING',
  STATE_BUFFERING: Platform.OS === 'android' ? 6 : 'STATE_BUFFERING',
}
