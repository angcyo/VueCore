/**
 * Email:angcyo@126.com
 * @author angcyo
 * @date 2020/10/11
 *
 * 2020-10-12
 * 需要库:
 * dayjs https://github.com/iamkun/dayjs
 * npm install dayjs --save
 *
 * https://day.js.org/docs/zh-CN/parse/parse
 *
 * 已在index.js中初始化
 */

import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

const Time = {}

Time.install = function (Vue, options) {
  Vue.prototype.$time = Time
}

// 返回距 1970 年 1 月 1 日之间的毫秒数：
// https://www.runoob.com/jsref/jsref-gettime.html
Time.currentTimeMillis = () => new Date().getTime()

// 格式化当前时间
Time.nowTimeString = (template = 'YYYY-MM-DD HH:mm:ss') => dayjs().format(template)


/**
 * 返回时间毫秒数millisecond对应的年份信息 https://day.js.org/docs/zh-CN/display/format
 *
 * @param time 支持13位毫秒数, 10位毫秒数, 支持格式化的时间19920101
 * */
Time.year = (time = dayjs().valueOf()) => parseInt(dayjs(time).format("YYYY"))
//月份，从 1 开始 [1-12]
Time.month = (time = dayjs().valueOf()) => parseInt(dayjs(time).format("M"))
//1-31	月份里的一天
Time.day = (time = dayjs().valueOf()) => parseInt(dayjs(time).format("D"))
//0-23	小时
Time.hour = (time = dayjs().valueOf()) => parseInt(dayjs(time).format("H"))
//0-59	分钟
Time.minute = (time = dayjs().valueOf()) => parseInt(dayjs(time).format("m"))
//0-59	秒
Time.second = (time = dayjs().valueOf()) => parseInt(dayjs(time).format("s"))
//000-999	毫秒 三位数
Time.time = (time = dayjs().valueOf()) => parseInt(dayjs(time).format("SSS"))

/**
 * 返回指定单位下两个日期时间之间的差异。
 *
 * @param unit
 * 支持的单位列表
 * 单位         缩写    详情
 * day          d     星期几 (星期天0，星期六6)
 * week         w     Week of Year
 * quarter      Q     Quarter
 * month        M     月份 (一月 0， 十二月 11)
 * year         y     Year (未满365天, 返回0, 366天, 返回1)
 * hour         h     Hour
 * minute       m     Minute
 * second       s     Second
 * millisecond  ms    Millisecond
 * https://day.js.org/docs/zh-CN/display/difference
 *
 * @param bigTime 较大的时间
 * @param smallTime 较小的时间
 * @param float 默认情况下 dayjs#diff 会将结果进位成整数。 如果要得到一个浮点数，将 true 作为第三个参数传入。
 * */
Time.diff = (bigTime, smallTime, unit = 'millisecond', float = false) => dayjs(bigTime).diff(smallTime, unit, float)

export default Time
