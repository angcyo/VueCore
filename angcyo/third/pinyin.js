/**
 * Email:angcyo@126.com
 * @author angcyo
 * @date 2020/10/15
 *
 * 拼音库的封装操作
 *
 * https://github.com/hotoo/pinyin
 */


import pinyin from 'pinyin'

const Pinyin = {}

/**
 * 不带声调
 * @param word 获取 '中文' 的首字母
 * @return array ['zhong', 'wen'] 小写字母
 * */
Pinyin.pinyin = function (word) {
  return pinyin(word, {style: pinyin.STYLE_NORMAL})
}

/**
 * @return string 'zhongwen' 小写字母
 */
Pinyin.pinyinStr = function (word) {
  return Pinyin.pinyin(word).join('')
}

/**
 * @param word 获取 '中文' 的首字母
 * @return array ['z', 'w'] 小写字母
 * https://github.com/hotoo/pinyin#api
 * */
Pinyin.firstLetter = function (word) {
  return pinyin(word, {style: pinyin.STYLE_FIRST_LETTER})
}

/**
 * @return string `zw` 小写字母
 * */
Pinyin.firstLetterStr = function (word) {
  return Pinyin.firstLetter(word).join('')
}

export default Pinyin
