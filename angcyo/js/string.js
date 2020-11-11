/**
 * Email:angcyo@126.com
 * @author angcyo
 * @date 2020/10/14
 *
 * 字符串的一些封装方法
 * 已在index.js中初始化
 */

/**在一个字符串中, 截取指定分隔符之前的字符. 从前面查找分隔符*/
String.prototype.subStart = function (searchString, length) {
  let index = this.indexOf(searchString)

  if (index === -1) {
    //未找到分隔符, 返回所有
    return this
  }

  if (length) {
    //前几个字符
    if (length > index) {
      //超出前面的字符串个数
      //前所有
      return this.substr(0, index)
    } else {
      return this.substr(index - length, length)
    }
  } else {
    //前所有
    return this.substr(0, index)
  }
}

/**在一个字符串中, 截取指定分隔符之后的字符. 从后面查找分隔符*/
String.prototype.subEnd = function (searchString, length) {
  let index = this.lastIndexOf(searchString)

  if (index === -1) {
    //未找到分隔符, 返回所有
    return this
  }

  if (length) {
    //后几个字符
    return this.substr(index + 1, length)
  } else {
    //前所有
    return this.substr(index + 1)
  }
}

/**判断字符串是否包含另一个字符串*/
String.prototype.contains = function (s) {
  return this.indexOf(s) !== -1
}

String.prototype.prefixString = function (length, placeholder = '0') {
  return (Array(length).join(placeholder) + this).slice(-length)
}

String.prototype.repeat = function (count = 1) {
  return Array(count + 1).join(this)
}

/**
 * 输出的数字长度是固定的，假设为10，如果数字为123，则输出0000000123，不够位数就在之前补足0, 补齐位数
 *
 * @param length 总共需要输出的字符串长度
 * @param placeholder 需要补齐的字符
 * @return string
 *
 * https://www.jb51.net/article/62499.htm
 * */
Number.prototype.prefixInteger = function (length, placeholder = '0') {
  return (Array(length).join(placeholder) + this).slice(-length)
}

/**重复这个数字多少次, 比如9重复4次, 9999
 * @return Number*/
Number.prototype.repeat = function (count = 1) {
  return Number(Array(count + 1).join(this))
}
