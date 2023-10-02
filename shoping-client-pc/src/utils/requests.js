import axios from 'axios'
import store from '@/store'
import router from '@/router'
// https://apipc-xiaotuxian-front.itheima.net
const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000
})
instance.interceptors.request.use(config => {
  const { profile } = store.state.user
  if (profile.token) {
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => {
  console.log('request.use=')
  return Promise.reject(err)
})
instance.interceptors.response.use(res => {
//   console.log('response.use=')
  return res.data
}, err => {
  console.log('response err =', err)
  if (err.response && err.response.status === 401) {
    store.commit('user/setUser', {})
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push(`/login?redirectUrl=${fullPath}`)
  }
  return Promise.reject(err)
})
export default instance
