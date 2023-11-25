<template>
<div class="profile-name-container">

<van-nav-bar
  title="昵称"
  left-text="取消"
  right-text="完成"
  @click-left="$emit('close')"
  @click-right="onClickRight"
/>
<van-field
  v-model.trim="localUserName"
  rows="1"
  autosize
  type="textarea"
  maxlength="7"
  placeholder="请输入昵称"
  show-word-limit
  class="text-area"

/>
</div>
</template>
<script>
import {updateUserProfile} from '@/api/user.js'
export default {
    props:{
        value: {
            type:String        }
    },
    data(){
        return {
            localUserName:this.value
        }
    },
methods:{
    async onClickRight(){
        this.$toast.loading({
  message: '加载中...',
  forbidClick: true,
  duration: 0
});
       try{
        if(!this.localUserName.length){
            this.$toast('昵称不能为空')
            return
        }
        await updateUserProfile({
            name: this.localUserName
        })
        this.$emit('input',this.localUserName)
        this.$toast.success('更新成功')
        this.$emit('close')
       }catch(err){
        this.$toast.fail('发送失败,请稍后再试')
       }
    }
}
}
</script>
<style lang="scss">
.profile-name-container{
    height: 100%;
    background-color: #f5f7f9;
    .text-area{
        height: 200px;
    }
}
</style>