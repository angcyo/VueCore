/**
 * 2020-11-11
 * http://www.axios-js.com/zh-cn/docs/
 *
 * Vue.baseUrl 存放host
 * localStorage "token" 存放授权请求头[Authorization]
 * */

import Axios from 'axios'
import Vue from 'vue'
import Util from "@/VueCore/angcyo/js/util"
import Args from "@/VueCore/angcyo/args"

export const TOKEN_KEY = "token"

export let _axios = Axios.create({
  // http://www.axios-js.com/zh-cn/docs/#%E8%AF%B7%E6%B1%82%E9%85%8D%E7%BD%AE

  baseURL: Vue.baseUrl || 'http://localhost:888',

  //https://www.cnblogs.com/ddzzhh/p/6773719.html
  headers: {"Content-Type": "application/json"},

  responseType: 'json',
  responseEncoding: 'utf8',
})

// Alter defaults after instance has been created
//_axios.defaults.headers.common['Authorization'] = AUTH_TOKEN

// http://www.axios-js.com/zh-cn/docs/#%E6%8B%A6%E6%88%AA%E5%99%A8
// 添加请求拦截器
_axios.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  config.headers.Authorization = localStorage.getItem(TOKEN_KEY)
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
_axios.interceptors.response.use((response) => {
  // 对响应数据做点什么
  //console.log(response)
  return response
}, (error) => {
  // 对响应错误做点什么
  if (error.response.status === 401) {
    localStorage.removeItem(TOKEN_KEY)
  }
  return Promise.reject(error)
})

function RAxios() {
}

export let Api = new RAxios()

/**http://www.axios-js.com/zh-cn/docs/#axios-request-config*/
RAxios.prototype.request = function (url, method, params, body, config, callback) {
  const cancelToken = Axios.CancelToken
  const cancelTokenSource = cancelToken.source()

  _axios.request({
    url: url,
    baseURL: Vue.baseUrl || _axios.defaults.baseURL,
    method: method || 'post',
    params: params,
    data: body,
    cancelToken: cancelTokenSource.token,
    ...config,
  }).then(function (response) {
    //console.log(response)
    if (Util.isFunction(callback)) {
      callback(response, undefined)
    }
  }).catch(function (error) {
    //error.response.status
    //error.response.data
    //console.log(Util.one(error.response.data.error, error.response.data.message, error.message))
    //console.log(error)
    if (Util.isFunction(callback)) {
      callback(undefined, error)
    }
  })

  //cancelTokenSource.cancel("xxx")
  return cancelTokenSource
}

/**所有参数必须指定*/
RAxios.prototype.api = function (url, method, params, body, config, callback) {
  return this.request(url, method, params, body, config, (res, err) => {
    if (callback) {
      if (res) {
        if (res.data.code >= 200 && res.data.code < 300) {
          callback(res.data, undefined)
        } else {
          callback(undefined, {
            ...res.data,
            msg: `[${res.data.code}]` + res.data.msg
          })
        }
      } else if (err) {
        let res = err.response
        if (res) {
          //http 异常
          callback(undefined, {
            ...res.data,
            code: res.status,
            msg: `[${res.status}]` + res.data.error || res.data.message || '请求失败'
          })
        } else {
          //其他代码异常
          callback(undefined, {
            code: 500,
            msg: err.message || err || '内部异常'
          })
          console.log(err)
        }
      }
    } else {
      console.log("RAxios api no callback.")
    }
  })
}

/**快速发送一个post请求, 动态匹配参数类型
 * [url] 必须
 * [body] 可选
 * [config] 可选
 * [callback] 必须*/
RAxios.prototype.post = function (url, body, config, callback) {
  if (arguments.length === 2) {
    body = undefined
    config = undefined
  }
  if (arguments.length === 3) {
    config = undefined
  }
  url = Args.str(arguments)
  callback = Args.fun(arguments)

  return this.api(url, 'post', undefined, body, config, callback)
}

RAxios.prototype.get = function (url, params, config, callback) {
  if (arguments.length === 2) {
    params = undefined
    config = undefined
  }
  if (arguments.length === 3) {
    config = undefined
  }
  url = Args.str(arguments)
  callback = Args.fun(arguments)

  return this.api(url, 'get', params, undefined, config, callback)
}

RAxios.install = function (Vue, options) {
  Vue.prototype.$axios = _axios
  Vue.prototype.$api = Api
}

Vue.use(RAxios)
