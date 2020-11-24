/**
 * Email:angcyo@126.com
 * @author angcyo
 * @date 2020/10/14
 * 性别定义
 */

export const Man = {
  value: 1,
  label: '男'
}

export const Woman = {
  value: 0,
  label: '女'
}

export const Secret = {
  value: -1,
  label: '保密'
}

const Sex = [Secret, Man, Woman]

export default [...Sex]
