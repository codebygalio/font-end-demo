<template>
<div class="profile-container">
<van-nav-bar
class="profile-nav-bar"
  title="个人信息"
  left-arrow
  @click-left="$router.back()"
/>
<input type="file" hidden ref="file" @change="onFileChange">

  <van-cell title="头像" @click="$refs.file.click()"   is-link>
    <van-image
    slot="default"
    class="profile-image"
    fit="cover"
    round
  :src="userInfo.photo"
/>
  </van-cell>
  <van-cell title="昵称"  @click="showName = true" :value="userInfo.name"  is-link></van-cell>
  <van-cell title="介绍"  is-link></van-cell>
  <van-cell title="性别" :value="userInfo.gender == 1? '女'  : '男' "  is-link @click="showGender=true"></van-cell>
  <van-cell title="生日" @click="showBirthday = true" :value="userInfo.birthday"  is-link></van-cell>

<!-- 头像 -->
<van-popup  v-model="showAvatar" position="bottom"  :style="{ height: '100%' }">
<profileAvatar v-model="userInfo.photo" v-if="showAvatar" :img="avatarImg" @close="showAvatar = false"/>
</van-popup>
  <!-- 昵称 -->
<van-popup  v-model="showName" position="bottom" :style="{ height: '100%' }">
<profileName v-if="showName"  @close="showName=false"  v-model="userInfo.name"/>
</van-popup>
<!-- 性别 -->
<van-popup  v-model="showGender" position="bottom" :style="{ height: '40%' }">
<profileGender v-if="showGender" v-model="userInfo.gender" @close="showGender=false"/>
</van-popup>
<!-- 生日 -->
<van-popup  v-model="showBirthday" position="bottom" :style="{ height: '40%' }">
<profileBirthday v-if="showBirthday" @close="showBirthday=false" v-model="userInfo.birthday"/>
</van-popup>


</div>
</template>
<script>
import profileName from './components/profile-name.vue'
import profileGender from './components/profile-gender.vue'
import profileBirthday from './components/profile-birthday.vue'
import {getUserProfile} from '@/api/user.js'
import profileAvatar from "./components/profile-avatar"
export default {
name:"profile",
components:{
    profileName,
    profileGender,
    profileBirthday,
    profileAvatar
},
data(){
    return {
        avatarImg:'',
        showAvatar:false,
        showBirthday:false,
        showGender:false,
        showName: false,
        userInfo: {
            birthday:'',
            name:'',
            gender: 1,
            photo:null
        }
    }
},
created(){
this.getUserProfile()
},
methods:{
    onFileChange(){
        this.showAvatar = true
        const file = this.$refs.file.files[0]
       this.avatarImg =  window.URL.createObjectURL(file)
       this.$refs.file.value = ''
       console.log(this.avatarImg)
    },
    async getUserProfile(){
        const {data} = await getUserProfile()
        this.userInfo =data
        console.log('getUserProfile=',data)
    },
}
}
</script>
<style lang="scss" scoped>
.profile-container{
    background-color: #f5f7f9;
    height: 100%;
.profile-nav-bar{
    background-color: #3296fa;
}
.profile-image{
    width: 45px;
    height: 45px;
}
}

</style>
<style lang="scss">
.profile-container{
.profile-nav-bar{
    .van-nav-bar__title{
        color:#fff;
    }
.van-nav-bar__left{
    .van-icon-arrow-left{
            color: #fff;

    }
}
.van-nav-bar__right{
    .van-nav-bar__text{
            color: #fff;

    }
}
}
}

</style>