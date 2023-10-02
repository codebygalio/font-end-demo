import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'

export default {
  namespaced: true,
  state () {
    return {
      list: topCategory.map(item => ({ name: item }))
    }
  },
  mutations: {
    setList (state, payload) {
      state.list = payload
    },
    show (state, id) {
      const currCategory = state.list.find(item => item.id === id)
      currCategory.open = true
    },
    hide (state, id) {
      const currCategory = state.list.find(item => item.id === id)
      currCategory.open = false
    }
  },
  actions: {
    async getList ({ commit }) {
      const data = await findAllCategory()
      data.result.forEach(top => {
        top.open = false
      })
      //   console.log('getList=', data)
      commit('setList', data.result)
    }
  }
}
