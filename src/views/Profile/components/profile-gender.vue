<template>
<div class="profile-gender-container">
    <van-picker
    class="my-picker"
  title="性别"
  show-toolbar
  :columns="columns"
  @confirm="onClickRight"
  @cancel="$emit('close')"
  :default-index="value" 
/>
<!-- <van-nav-bar
  title="性别"
  left-text="取消"
  right-text="完成"
  @click-left="$emit('close')"
  @click-right="onClickRight"
/> -->
</div>
</template>
<script>
import {updateUserProfile} from '@/api/user.js'
export default {
    data(){
        return {
            columns: ['男','女'],
        }
    },
    props:{
        value:{
        }
    },
    methods:{
      async onClickRight(value,index){
        // console.log('value=',value)
        // console.log('index=',index)
                this.$toast.loading({
  message: '加载中...',
  forbidClick: true,
  duration: 0
});
         try{
            await updateUserProfile({
            gender:index
        })
        this.$emit('close')
        this.$emit('input',index)
        this.$toast.success('更新成功')
         }catch(err){
            this.$toast.fail('发送失败,请稍后重试')
         }
        // console.log(data)
      }
    }
}
</script>
<style lang="scss" scoped>
.profile-gender-container{
    .my-picker{
         .van-picker-column__wrapper{
        transform:translateY(30px)
    }
    }
   
}
</style>