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
