<template>
<van-button :loading="isLoading"  :icon="value==1 ? 'good-job':'good-job-o'" :class="{liked:value == 1}" @click="updateLiked" />

</div>
</template>
<script>
import {addLiked, cancelLiked} from '@/api/article.js'
export default {
props:{
    value: {type: Number},
    articleId:{type: String}
},
data(){
    return {
        isLoading:false
    }
},
methods:{
    async updateLiked(){
        this.isLoading = true;
       try{
         if(this.value == 1){
            const data =await cancelLiked(this.articleId)
            // console.log('cancel=',data)
        }else{
            const data =await addLiked(this.articleId)
                        // console.log('add=',data)
        }
        this.$emit('input',this.value == 1 ? -1 : 1)
        this.$toast.success(this.value ==1 ? '取消点赞成功' : '点赞成功')
       }catch{
        this.$toast('请求失败,请稍后重试')
       }
                this.isLoading = false;

    }
}
}
</script>
<style lang="scss">
.liked{
 .van-icon {
    color: #e5645f;
 }
}

</style>