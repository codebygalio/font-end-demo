import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
import { Message } from 'element-ui'
import store from '@/store'
import { isTimeOut } from '@/utils/auth.js'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 6000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
    //   console.log(isTimeOut())
      if (isTimeOut()) {
        if (store.getters.userInfo.userId) {
          return Promise.reject(new Error('token彻底超时了,请刷新页面或者右上角点击退出'))
        } else {
          store.commit('user/logout')
          router.push('/login')
          return Promise.reject(new Error('token过期,请重新登录'))
        }
      }
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.data) return response.data
    return response
  },
  error => {
    // console.log('error=',error)
    // debugger
    // console.log('error=',error)
    // console.log('same=',error.message === 'timeout of 5000ms exceeded')
    // console.log('error.code=',error.code)
    // console.log('error.name=',error.name)
    // console.log('error=.status',error.status)
    // console.log('error=.response',error.response)
    // console.log('error=.typeof=',typeof error)
    // console.log('error=.message=',error.message)
    if (error.response && error.response.data && error.response.data.code === 10002) {
      Message({
        message: 'token已经完全超时了,请右上角退出后重新登录',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
    if (error.response && error.response.status === 405) {
      return Promise.reject(error)
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })

    return Promise.reject(error)
  }
)

export default service
