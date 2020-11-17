import './css/base.scss'
import './css/flex.scss'
import './css/text.scss'
import './css/scrollbar.scss'
import './css/element.scss'
import './css/app.scss'

import './js/string'

import Util from "./js/util"
import Time from './js/time'
import Lodash from './third/lodash'

import Vue from 'vue'

/*-----------debug start----------*/
/*开发环境*/
Vue.prototype.env = process.env.NODE_ENV
/*是否是调试环境*/
const isDebug = process.env.NODE_ENV === 'development'
Vue.isDebug = isDebug
Vue.prototype.isDebug = isDebug
/*开发环境的log输出*/
Vue.prototype.log = (log) => {
  if (isDebug) {
    console.log(log)
  }
}
/*-----------debug end----------*/

/*-----------使用插件----------*/

Vue.use(Util)
Vue.use(Time)
Vue.use(Lodash)
