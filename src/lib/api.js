import axios from 'axios'

/**
 * 请求方法封装
 * @param {String} url 
 * @param {Object} options 
 */
function request (url, options) {
  return fetch(url, {
    ...options,
    headers: {
      'Accept':'application/json',
      // 'Accept-Encoding': 'gzip,deflate,sdch',
      'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
      'Accept-Charset': 'utf-8',
      'Connection': 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Host': 'music.163.com',
      'Origin': 'http://music.163.com',
      'Referer': 'http://music.163.com/search/',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36'  // NOQA
    }
  })
  .then((response) => {
    return response.json()
  })
  .catch((error) => {
    console.error('请求出错', error)
  })
}

export default {
  topPlayList (category = '全部', order = 'hot', offset = 0, limit = 50) {
    return request(`http://music.163.com/api/playlist/list?cat=${category}&order=${order}&offset=${offset}&total=${!!offset}&limit=${limit}`)
  },
  newAlbums (offset = 0, limit = 50) {
    return request(`http://music.163.com/api/album/new?area=ALL&offset=${offset}&total=true&limit=${limit}`)
  }
}