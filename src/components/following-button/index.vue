<template>
    <van-button :loading="buttonLoading" v-if="is_followed"  round size="small" @click="following(aut_id)"
                        >已关注</van-button
                    >
                    <van-button :loading="buttonLoading" v-else icon="plus" type="info" round size="small" color="#3296fa"
                    class="no-subscribe" @click="following(aut_id)"
                        >关注</van-button
                    >
</template>
<script>
import {followings, cancelFollowings} from '@/api/user'

export default {
    model:{
        prop: 'is_followed',
        event: 'update-is_followed'
    },
    props:{
                    is_followed:{ type: Boolean},
        aut_id:{required: true}
    },
    data(){
        return {
            buttonLoading: false
        }
    },
    methods:{
           async following(userId){
        // console.log(!this.is_followed)
        // console.log('this.article.is_followed=',this.article.is_followed)
        this.buttonLoading = true
        try{
            if(this.is_followed){
            const  data =  await cancelFollowings(userId)
          
        }else{
                const data =  await followings(userId)
            
        }
                        this.$emit('update-is_followed',!this.is_followed)
        }catch(err){
            let message = '发送失败，请稍后重试'
            if(err.status == 400){
                message = '你不能关注你自己!'                
            }
                this.$toast(message)
            }
        
         this.buttonLoading = false
       }
    }
}
</script>
