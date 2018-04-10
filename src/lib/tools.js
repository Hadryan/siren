import moment from 'moment'
/**
 * 对象数组去重
 * @param {Array} arr 原数组
 * @param {*} key 唯一键 
 */
export const unique = (arr, key) => {
  const bucket = {}
  const resultArr = []

  arr.forEach((item) => {
    if (bucket[item[key]]) {
      return
    }

    bucket[item[key]] = true
    resultArr.push(item)
  })

  return resultArr
}

/**
 * 转换时间
 * @param {Number} second 
 */
export const durationFormat = (second) => {
  return moment('2018-01-01 00:00:00')
    .seconds(second)
    .format('mm:ss')
}