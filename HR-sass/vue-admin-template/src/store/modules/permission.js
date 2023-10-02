import { constantRoutes, asyncRoutes } from '@/router/index.js'

const state = {
    routes : constantRoutes
}
const mutations = {
    setRoutes(state,routes){
        state.routes = [...constantRoutes, ...routes]
    },
    resetRoutes(state){
        debugger
        state.routes = []
    }
}
const actions = {
    filterRoutes({commit},menus){
        
    //    const newRoutes =   asyncRoutes.filter(routes => {
    //        return menus.some(menu => {
    //         debugger
    //     const lowerMenu = menu.toLocaleLowerCase()
    //     const lowerRoutes = routes.name && routes.name.toLocaleLowerCase()
    //     return lowerMenu == lowerRoutes
    //     })
    //     })
    const newRoutes = asyncRoutes.filter(item => {
        return menus.includes(item.name)
    })
    // const newRoutes = asyncRoutes
        commit('setRoutes',newRoutes)
        // console.log('newRoutes=',newRoutes)
        return newRoutes
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}