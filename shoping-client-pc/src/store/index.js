import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import category from './modules/category'
import cart from './modules/cart'

const user = {
  namespaced: true,
  state () {
    return {
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      },
      redirectUrl: ''
    }
  },
  mutations: {
    setUser (state, payload) {
      state.profile = payload
      console.log('setUser=')
    },
    setRedirectUrl (state, url) {
      state.redirectUrl = url
    }
  }
}

export default createStore({
  modules: {
    user,
    cart,
    category
  },
  plugins: [createPersistedState({
    key: 'withvuexdata',
    paths: ['user', 'cart']
  })]
})
