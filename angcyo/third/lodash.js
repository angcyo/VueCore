const _ = require('lodash')

/**
 * Email:angcyo@126.com
 * @author angcyo
 * @date 2020/11/17
 */

const Lodash = {}

Lodash.install = function (Vue, options) {
  Vue.prototype._ = _
}

export default Lodash
