import { login, getUserInfo, getUserAvatar } from '@/api/user.js'
import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { resetRouter } from '@/router'

export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
      setTimeStamp()
    },
    logout(state) {
      state.token = null
      state.userInfo = {}
      removeToken()
      resetRouter()

    },
    getToken(state, token) {
      return getToken(token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }

  },
  actions: {
    logout({ commit }){
        commit('logout')
        commit('permission/resetRoutes', [], {root:true} )
    },
    async login({ commit }, dataObj) {
      try {
        const  data  = await login(dataObj)
        if(data.success){
            commit('setToken', data.data)
        }
        return data
        
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async getUserInfo({ commit }) {
      try {
        const { data } = await getUserInfo()
        const avatarInfo = await getUserAvatar(data.userId)
        commit('setUserInfo', { ...data, ...avatarInfo.data })
        return data
      } catch (err) {
        // console.log('errx=', err)
        return Promise.reject(err)
      }
    }
  }

}
