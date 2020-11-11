/**
 * 2020-11-11
 * */

import Util from "@/VueCore/angcyo/js/util"

const Args = {}

/**从参数列表中, 获取想要的参数*/
Args.args = function args(_arguments, predicate) {
  if (Util.isFunction(predicate)) {
    //p
    if (_arguments && _arguments.length > 0) {
      //a
      for (let i = 0; i < _arguments.length; i++) {
        let arg = _arguments[i]
        if (typeof arg === 'undefined') {
          continue
        }
        if (predicate(arg)) {
          //need
          return arg
        }
      }
    } else {
      if (predicate(_arguments)) {
        return _arguments
      }
    }
  }
  return undefined
}

/**从参数列表中获取[Function]类型参数*/
Args.fun = function argFunction(_arguments) {
  return Args.args(_arguments, (arg) => {
    return Util.isFunction(arg)
  })
}

Args.obj = function argObject(_arguments) {
  return Args.args(_arguments, (arg) => {
    return Util.isObject(arg)
  })
}

Args.str = function argString(_arguments) {
  return Args.args(_arguments, (arg) => {
    return Util.isString(arg)
  })
}

export default Args
