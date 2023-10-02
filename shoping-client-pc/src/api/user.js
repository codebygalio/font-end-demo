import request from '@/utils/requests'

/**
 * 帐号登录
 * @param {String} account - 用户名
 * @param {String} password - 密码
 * @returns Promise
 */
export const userAccountLogin = ({ account, password }) => {
  return request({
    url: '/login',
    method: 'post',
    data: { account, password }
  })
}

/**
 * 获取手机号的短信验证码
 * @param {*} mobile - 手机号
 * @returns promise
 */
export const userMobileLoginMsg = mobile => {
  return request({
    url: '/login/code',
    params: {
      mobile
    }
  })
}

/**
 * 手机号登录
 * @param {String} mobile - 手机号
 * @param {String} code - 短信验证码，默认123456
 * @returns promise
 */
export const userMobileLogin = ({ mobile, code }) => {
  return request({
    url: '/login/code',
    method: 'post',
    data: { mobile, code }
  })
}

/**
 * QQ登录
 * @param {String} unionId - QQ唯一标识，openId
 * @param {String} source - 客户端类型 1 PC
 * @returns
 */
export const userQQLogin = (unionId, source = 1) => {
  return request({
    url: '/login/social',
    method: 'post',
    data: {
      unionId, source
    }
  })
}

/**
 * 获取QQ绑定的时候短信验证码
 * @param {String} mobile - 手机号
 * @returns promise
 */
export const userQQBindCode = (mobile) => {
  return request({
    url: '/login/social/code',
    params: {
      mobile
    }
  })
}

/**
 * QQ登录-绑定帐号
 * @param {String} unionId - QQ唯一标识，openId
 * @param {String} mobile - 手机号
 * @param {String} code - 验证码
 * @returns
 */
export const userQQBindLogin = ({ unionId, mobile, code }) => {
  return request({
    url: '/login/social/bind',
    method: 'post',
    data: { unionId, mobile, code }
  })
}

/**
 * 校验用户是否存在
 * @param {String} account - 帐号
 * @returns promise
 */
export const userAccountCheck = (account) => {
  return request({
    url: '/register/check',
    params: { account }
  })
}

/**
 * 获取QQ完善信息的时候短信验证码
 * @param {String} mobile - 手机号
 * @returns promise
 */
export const userQQPatchCode = (mobile) => {
  return request({
    url: '/register/code',
    params: { mobile }
  })
}

/**
 * QQ登录-完善信息
 * @param {String} unionId - QQ唯一标识，openId
 * @param {String} mobile - 手机号
 * @param {String} code - 验证码
 * @param {String} account - 帐号
 * @param {String} password - 密码
 * @returns
 */
export const userQQPatchLogin = ({ unionId, mobile, code, account, password }) => {
  return request({
    url: `/login/social/${unionId}/complement`,
    method: 'post',
    data: { unionId, mobile, code, account, password }
  })
}
