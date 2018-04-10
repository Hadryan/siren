import axios from 'axios'
import encrypt from './encrypt'

/**
 * covert data to x-www-form-urlencoded
 * @param {Object} data 
 */
function ConvertData (data) {
  const result = []
  for (let key in data) {
    result.push(
      `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
    )
  }

  return result.join('&')
}

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
      'Referer': 'http://music.163.com',
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
  },
  /**
   * 搜索接口
   * @param {String} s 搜索关键词
   * @param {Number} type 搜索类型 1-单曲 100-歌手 10-专辑 1000-歌单 1002-用户 
   * @param {Number} offset 偏移值 默认：0
   * @param {Bool} total ?
   * @param {Number} limit 数量限制
   */
  search (s, type = 1, offset = 0, total = true, limit = 20) {
    return request('http://music.163.com/api/search/get', {
      method: 'POST',
      body: ConvertData({
        s,
        type,
        offset,
        total,
        limit
      })
    })
  },
  /**
   * get music detail for id
   * @param {Number} id 歌曲id
   */
  getDetailById (id) {
    return Promise.all([
      encrypt(JSON.stringify({
        ids: [id],
        br: 320000,
        csrf_token: ''
      })).then(data => {
        return request(`http://music.163.com/weapi/song/enhance/player/url?csrf_token=`, {
          method: 'POST',
          body: ConvertData(data)
        })
      }),
      encrypt(JSON.stringify({
        ids: JSON.stringify([id]),
        c: JSON.stringify([{id}]),
        csrf_token: ''
      })).then(data => {
        return request(`http://music.163.com/weapi/v3/song/detail?csrf_token=`, {
          method: 'POST',
          body: ConvertData(data)
        })
      })
    ]).then((result) => {
      return {
        ...result[0].data[0],
        cover: result[1].songs[0].al.picUrl
      }
    })
  },
  /**
   * 获取歌单详情
   * @param {string} id 
   */
  getMusiclistDetail (id) {
    return encrypt(JSON.stringify({
      id,
      total: true,
      csrf_token: '',
      limit: 1000,
      n: 1000,
      offset: 0
    }))
      .then((data) => {
        return request('http://music.163.com/weapi/v3/playlist/detail', {
          method: 'POST',
          body: ConvertData(data)
        })
      })
  }
}