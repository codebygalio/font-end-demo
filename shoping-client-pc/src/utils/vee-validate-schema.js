import { userAccountCheck } from '@/api/user'

export default {
  account (value) {
    if (!value) return '请输入用户名'
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '字母开头且6-20个字符'
    return true
  },
  async accountApi (value) {
    if (!value) return '请输入用户名'
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '字母开头且6-20个字符'
    const data = await userAccountCheck(value)
    if (data.result.valid) return '用户名已存在'
    return true
  },
  password (value) {
    if (!value) return '请输入密码'
    if (!/^.{6,24}$/.test(value)) return '密码格式6-24位个字符'
    return true
  },
  mobile (value) {
    if (!value) return '请输入手机号'
    if (!/^1[3-9]\d{9}$/.test(value)) return '请输入11位正确手机号'
    return true
  },
  code (value) {
    if (!value) return '请输入短信验证码'
    if (!/^\d{6}$/.test(value)) return '短信验证码6个数字'
    return true
  },
  isAgree (value) {
    if (!value) return '请勾选登录协议'
    return true
  },
  rePassword (value, { form }) {
    if (!value) return '请再次输入密码'
    if (value !== form.password) return '两次输入密码不一致'
    return true
  }
}
