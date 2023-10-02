export default {
    methods: {
        checkPermission(key){
            const { userInfo } = this.$store.state.user
            if(userInfo.roles && userInfo.roles.points){
                return userInfo.roles.points.some(role => role == key)
            }
            return false
        }
    }
}