import axios from 'axios'
import { Toast } from 'vant';
import store from '@/store/index'
import {myUrl} from '@/utils/.my_settings'
import router from '@/router'

const request = axios.create({
    baseURL: myUrl,
    timeout: 5000
})
       

async function fixRefresh(err,try_again=2){
    // console.log('err.config=',err.config)
   try{
    let res =  await axios({
        url:`${myUrl}/v1_0/authorizations`,
        method: 'put',
        headers:{
            Authorization: 'Bearer ' + store.state.user.refresh_token
        }
    })
    store.commit('setUserTokens',{
        refresh_token:store.state.user.refresh_token,
        token:res.data.data.token
    })
    return request(err.config)
   }catch(err){
    // console.log('err,,',err)
    if(err.response.data.message == 'refresh_token失效'){
        Toast.fail('登录令牌已过期，请重新登录')
        return router.push({name:'Login'})
        
    }
    if(try_again > 0){
        return fixRefresh(err,try_again-1)
    }
        Toast.fail('请求失败')
        return Promise.reject('401')
   }
}

request.interceptors.request.use(config=>{
  if(store.state.user && store.state.user.userTokens) config.headers['Authorization'] = `Bearer ${store.state.user.userTokens.token}`
//   console.log('发生前=',config) 
  return config
})

request.interceptors.response.use(res=>{
return res.data
},err =>{
    if(err.response.status == 401){
        fixRefresh(err)
    }
    // console.log(err)
   if(err.code == "ERR_NETWORK"){
    Toast.loading({
        message: err.message,
        forbidClick: true,
        duration:1000
      });
      return Promise.reject(false)
   }
   return Promise.reject(err.response)
})

export default request