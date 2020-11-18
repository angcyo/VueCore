/**
 * Email:angcyo@126.com
 * @author angcyo
 * @date 2020/10/11
 *
 *  Vue 插件
 * https://cn.vuejs.org/v2/guide/plugins.html
 * 已在index.js中初始化
 */

const Util = {}

Util.install = function (Vue, options) {
  Vue.prototype.$util = Util
}

/**生成uuid*/
Util.uuid = function () {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

Util.toJson = (data) => JSON.stringify(data)
Util.fromJson = (json) => JSON.parse(json)

/**获取一个错误对象*/
Util.error = (msg) => {
  let error = new Error(msg || '调用栈 ↓')
  if (!error.stack) {
    try {
      throw error
    } catch (err) {
      error = err
    }
  }
  return error
}

/**判断是否是PC浏览器*/
Util.isPc = function () {
  const userAgentInfo = navigator.userAgent
  const agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"]
  let flag = true
  for (let v = 0; v < agents.length; v++) {
    if (userAgentInfo.indexOf(agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}

/**判断`obj`是字符串*/
Util.isString = function (obj) {
  return Boolean(obj && typeof obj === 'string')
}

Util.isNumber = function (obj) {
  return Boolean(obj && typeof obj === 'number')
}

Util.isArray = function (obj) {
  return Boolean(obj && obj instanceof Array)
}

Util.len = function (obj) {
  if (Util.isArray(obj)) {
    return obj.length
  } else if (Util.isString(obj)) {
    return obj.length
  }
  return -1
}

Util.isObject = function (obj) {
  return Boolean(obj && typeof obj === 'object')
}

Util.isFunction = function (obj) {
  return Boolean(obj && typeof obj === 'function')
}

/**
 * 设置指定对象的指定属性为 undefined
 * @param obj 操作的对象
 * @param fields 操作的字段
 * */
Util.undefinedFields = function (obj, fields) {
  if (Util.isObject(obj)) {
    if (Util.isString(fields)) {
      obj[fields] = undefined
    } else if (Util.isArray(fields)) {
      fields.forEach(item => {
        if (Util.isString(item)) {
          obj[item] = undefined
        }
      })
    }
  }
}

/**复制对象的指定属性, 到对象的另一个属性
 * @param obj 需要操作的数据源, 支持对象和数组
 * @param fromFields 需要复制的属性, 支持数组
 * @param toFields 复制到的属性, 如果是数组, 那么需要一一对应
 * */
Util.copyFields = function (obj, fromFields, toFields) {

  let _copy = function (obj) {
    if (Util.isArray(fromFields) && Util.isArray(toFields)) {
      for (let i = 0; i < Math.min(fromFields.length, toFields.length); i++) {
        let fromField = fromFields[i]
        if (obj.hasOwnProperty(fromField)) {
          let toField = toFields[i]
          obj[toField] = obj[fromField]
        }
      }
    } else if (Util.isString(fromFields) && Util.isString(toFields)) {
      if (obj.hasOwnProperty(fromFields)) {
        obj[toFields] = obj[fromFields]
      }
    } else {
      console.log(`不支持的操作:${typeof fromFields} -> ${typeof toFields}`)
    }
  }

  if (Util.isArray(obj)) {
    obj.forEach(item => _copy(item))
  } else {
    _copy(obj)
  }

  return obj
}

//<editor-fold desc="基础操作">

/**从参数中, 选择一个不是undefined的参数*/
Util.one = function () {
  if (arguments && arguments.length > 0) {
    for (let i = 0; i < arguments.length; i++) {
      let arg = arguments[i]
      if (typeof arg === 'undefined') {
        continue
      }
      return arg
    }
  }
  return undefined
}

Util.isNullOrEmpty = function (str) {
  return !str || str.length <= 0
}

//</editor-fold desc="基础操作">

//<editor-fold desc="数组扩展操作">

/**
 * 将数组`target`合并到`this`, 条件是`callbackfn`返回true
 * @param target 需要合并的数组
 * @param callbackfn 第一个参数是需要返回的数组, 第二个参数需要合并的数据
 * @return 新的数组
 * */
Array.prototype.merge = function (target, callbackfn) {
  let result = [...this]
  if (Util.isArray(target)) {
    target.forEach(item => {
      if (callbackfn(result, item)) {
        result.push(item)
      }
    })
  } else {
    if (Util.isFunction(callbackfn)) {
      if (callbackfn(result, target)) {
        result.push(target)
      }
    }
  }
  return result
}

/**
 * 获取数组中的第一个元素
 * */
Array.prototype.first = function (index = 0) {
  if (Util.isArray(this)) {
    if (this.length > index) {
      return this[index]
    } else {
      return undefined
    }
  }
  return this
}

/**
 * 获取数组中的最后一个元素
 * */
Array.prototype.last = function () {
  if (Util.isArray(this)) {
    if (this.length > 0) {
      return this[this.length - 1]
    } else {
      return undefined
    }
  }
  return this
}

/**
 * 遍历数组, 等待上一次调用结束后, 再请求next
 * @param run 必须是一个对象, 且需要需要执行的方法放在`run`成员变量中, 并且调用`next`方法触发下一个回调
 * */
Array.prototype.eachRun = function (run) {
  if (Util.isObject(run) && run.run) {
    var index = 0

    let array = this
    let count = array.length

    let _run = function () {
      if (index >= count) {
        //结束
        run.run(undefined, true)
      } else {
        let item = array[index]
        run.run(item, false)
      }
    }

    //next回调
    run.next = function () {
      index++
      _run()
    }

    //开始执行
    _run()
  } else {
    console.log(`不合法对象↓`)
    console.log(run)
  }
}

/**移除数组中指定索引的数据, 返回删除的元素
 * @param index 可以指定索引, 也支持是`indexOf`能够查询到的对象
 * */
Array.prototype.remove = function (index) {
  let _index = index
  if (Util.isNumber(_index)) {
  } else {
    _index = this.indexOf(index)
    if (_index === -1) {
      return undefined
    }
  }
  //在VUE中可以实现双向绑定更新
  return this.splice(_index, 1)
}

/**使用JSON的方式, 拷贝数据. 深拷贝*/
Array.prototype.copy = function () {
  return JSON.parse(JSON.stringify(this))
}
/*Object.prototype.copy = function () {
  return JSON.parse(JSON.stringify(this))
}*/

/**判断数组中是否有指定的数据*/
Array.prototype.have = function (predicate) {
  let find = this.find(predicate)
  return find !== undefined
}

//</editor-fold desc="数组扩展操作">

export default Util
