/**
 * Email:angcyo@126.com
 * @author angcyo
 * @date 2020/10/22
 *
 * 身份证校验
 * https://segmentfault.com/a/1190000004437362
 *
 * 举例：
 * 340523 1980 0101 0013这个身份证号的含义:
 * 34为安徽省
 * 05为马鞍山市
 * 23为和县
 * 19800101为出生日期(1980年1月1日)
 * 001为顺序号(1为单数，代表为男性)
 * 3为验证码
 */

/**
 * @param idCard 18位身份证号码
 * @return true 合法身份证号码
 * */
export function checkIdCard(idCard) {
  if (typeof idCard !== 'string') return false //'非法字符串'
  const city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外"
  }
  const birthday = idCard.substr(6, 4) + '/' + Number(idCard.substr(10, 2)) + '/' + Number(idCard.substr(12, 2))
  const d = new Date(birthday)
  const newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate())
  const currentTime = new Date().getTime()
  const time = d.getTime()
  const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  let sum = 0, i, residue

  if (!/^\d{17}(\d|x)$/i.test(idCard)) return false //'非法身份证'
  if (city[idCard.substr(0, 2)] === undefined) return false// "非法地区"
  if (time >= currentTime || birthday !== newBirthday) return false //'非法生日'
  for (i = 0; i < 17; i++) {
    sum += idCard.substr(i, 1) * arrInt[i]
  }
  residue = arrCh[sum % 11]
  if (residue !== idCard.substr(17, 1)) return false //'非法身份证哦'

  let result = city[idCard.substr(0, 2)] + "," + birthday + "," + (idCard.substr(16, 1) % 2 ? " 男" : "女")
  console.log(result)
  return true
}
