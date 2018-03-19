/**
 * 加密算法，参考：https://keyin.me/posts/netease-music-api/
 */
import AesCrypto from 'react-native-aes-kit'
import bigInt from 'big-integer'

function addPadding(encText, modulus) {
  let ml = modulus.length
  for (i = 0; ml > 0 && modulus[i] == '0'; i++)
    ml--
  const num = ml - encText.length
  let prefix = ''
  for (let i = 0; i < num; i++) {
      prefix += '0'
  }
  return prefix + encText
}

function aesEncrypt (text, key) {
  // const cipher = crypto.createCipheriv('AES-128-CBC', key, '0102030405060708')
  // return cipher.update(text, 'utf8', 'base64') + cipher.final('base64')
  return AesCrypto.encrypt(text, key, '0102030405060708')
}

function rsaEncrypt(text, exponent, modulus) {
  const reText = Array.from(text).reverse().map(i => i.charCodeAt().toString(16)).join('')

  const number = new bigInt(reText, 16)
  const biEx = new bigInt(exponent, 16)
  const biMo = new bigInt(modulus, 16)

  return addPadding(number.modPow(biEx, biMo).toString(16), modulus)
}

function createSecretKey (length) {
  const str = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return Array.from({length}).map(_ => str[Math.floor(Math.random() * str.length)]).join('')
}

export default function encrypt (text) {
  const pubKey = '010001'
  const modulus = '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7'
  const nonce = '0CoJUm6Qyw8W8jud'
  const secKey = createSecretKey(16)

  return new Promise((resolve, reject) => {
    aesEncrypt(text, nonce)
      .then((data) => aesEncrypt(data, secKey))
      .then((data) => {
        resolve({
          params: data,
          encSecKey: rsaEncrypt(secKey, pubKey, modulus)
        })
      })
      .catch((error) => {
        console.error(error)
      })
  })
}