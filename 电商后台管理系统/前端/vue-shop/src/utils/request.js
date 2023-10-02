import axios from 'axios'
import { Message } from 'element-ui'
import $router from '../router/index'

const request = axios.create({
    baseURL:'http://127.0.0.1:8888/api/private/v1/',
    timeout: 5000
})

request.interceptors.request.use(config => {
    // console.log(token)
    const token =  window.sessionStorage.getItem('token')
    if(token) config.headers.Authorization = token
    return config
})

request.interceptors.response.use(res =>{
    // Message.error('123')
    const data = res.data
    if(!/^20\w$/.test(data.meta.status)) {
        Message({message:data.meta.msg, type: 'error', duration: 5000})
        $router.push('/login')
        return false
    }
    return data
},error => {
    Message({
        showClose: true,
        message:error.message,
        type: 'error',
        duration: 10000
    })
})
export default request