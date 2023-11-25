import { getItem, setItem }  from '@/utils/storage'
const TOKEN_KEY = 'TOUTIAO_USER'

const user = {
    state:{
        userTokens: getItem(TOKEN_KEY),
        userInfo:null
    },
    mutations:{
        // token 数据储存
        setUserTokens(state, data) {
            console.log('设置token了=',data)
            state.userTokens = data
            setItem(TOKEN_KEY, state.userTokens)
          },
          setUserInfo(state,data){
            state.userInfo = data
          }
     
    }
}
export default user