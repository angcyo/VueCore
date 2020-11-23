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
Vue.log = function log() {
  if (isDebug) {
    let stack = Util.error().stack
    let lines = stack.toString().split(/\r\n|\n/)
    //console.log(`%c↓${lines[3].replaceAll(":", ";")}↓`, "background: rgba(252,234,187,1);background: -moz-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%,rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -webkit-gradient(left top, right top, color-stop(0%, rgba(252,234,187,1)), color-stop(12%, rgba(175,250,77,1)), color-stop(28%, rgba(0,247,49,1)), color-stop(39%, rgba(0,210,247,1)), color-stop(51%, rgba(0,189,247,1)), color-stop(64%, rgba(133,108,217,1)), color-stop(78%, rgba(177,0,247,1)), color-stop(87%, rgba(247,0,189,1)), color-stop(100%, rgba(245,22,52,1)));background: -webkit-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -o-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -ms-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: linear-gradient(to right, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fceabb', endColorstr='#f51634', GradientType=1 );font-size:1.2em")
    //console.log(`%c↓${lines[3].replaceAll(":", ".")}↓`, 'color: purple; font-size: 0.6em; text-shadow: 1px 1px 3px rgba(255, 0, 0, 0.5)')
    console.log(...arguments, '←\n\n→', stack)
  }
}
Vue.isDebug = isDebug
Vue.prototype.isDebug = isDebug
/*开发环境的log输出*/
Vue.prototype.log = Vue.log
/*-----------debug end----------*/

/*-----------使用插件----------*/

Vue.use(Util)
Vue.use(Time)
Vue.use(Lodash)
