import { createIconSet } from 'react-native-vector-icons'
const glyphMap = { 
  'search': 59052,
  'play': 58907,
  'pause': 61059,
  'list': 59065,
  'circulation': 59165,
  'random': 58987,
  'repeatOne': 58898,
  'prev': 59032,
  'next': 58897,
  'clear': 58937,
  'delete': 59054
}
const Icon = createIconSet(glyphMap, 'iconfont')

export default Icon