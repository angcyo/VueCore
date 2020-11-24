import Time from "@/VueCore/angcyo/js/time"
import Vue from 'vue'

/**
 * Email:angcyo@126.com
 * @author angcyo
 * @date 2020/11/24
 */

const ImageCodeMixin = {
  data: () => ({
    /**
     * CODE_TYPE_REGISTER = 1
     * CODE_TYPE_LOGIN = 2
     * */
    codeType: 1,
    uuid: undefined,
    codeUrl: undefined,
    form: {
      username: '',
      password: '', //不可见密码
      password2: '', //密码2
      code: '', //注册时的验证码
      type: 'web',//来自web端的注册
    },
    rules: {
      username: [
        {type: 'string', required: true, trigger: 'blur', min: 4, message: "帐号至少6个字符"},
      ],
      password: [
        {type: 'string', required: true, trigger: 'blur', min: 6, message: "密码至少6个字符"},
      ],
      password2: [
        {type: 'string', required: true, trigger: 'blur', min: 6, message: "密码至少6个字符"},
      ],
      code: [
        {type: 'string', required: true, trigger: 'blur', min: 4, max: 4, message: "验证码必须4个字符"},
      ]
    },
  }),
  created() {
    this.uuid = Vue.uuid
    this.loadCode()
    if (this.isDebug) {
      this.form.username = 'admin'
      this.form.password = '123123'
      this.form.password2 = this.form.password
    }
  },
  methods: {
    /**加载验证码*/
    loadCode() {
      this.codeUrl = `${Vue.baseUrl}/auth/code?uuid=${this.uuid}&type=${this.codeType}&timestamp=${Time.currentTimeMillis()}`
    },
  }
}

export default ImageCodeMixin
