/**
 * 2020-11-13
 * 用户信息的一些管理
 * */
import Util from "@/VueCore/angcyo/js/util"
import {TOKEN_KEY} from "@/VueCore/axios"

const User = {}

const KEY_USER_INFO = "user_info"

/**保存用户的信息*/
User.save = function (data) {
  localStorage.setItem(KEY_USER_INFO, Util.toJson(data))
}

User.clear = function () {
  localStorage.removeItem(KEY_USER_INFO)
}

User.get = function () {
  let json = localStorage.getItem(KEY_USER_INFO)
  if (json) {
    return Util.fromJson(json)
  }
}

User.setToken = function (token) {
  localStorage.setItem(TOKEN_KEY, `Bearer ${token}`)
}

User.getToken = function () {
  let token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    return token.subEnd(`Bearer `)
  }
}

export default User
