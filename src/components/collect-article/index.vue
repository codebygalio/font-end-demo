<template>
<van-button :loading="isLoading" class="my-icon-button" :icon="value? 'star':'star-o'" :class="{collected:value}" @click="updateCollected" />
<!-- <van-icon v-else name="star"></van-icon> -->

<!-- <van-icon   class="icon-9 collected"/> -->
<!-- <van-icon v-else  class="icon-9"/> -->

</template>
<script>
import {addCollections, cancelCollections} from '@/api/article.js'
export default {
    name:"collectArticle",
    props:{
        value: {type:Boolean},
        aut_id:{type:String}
    },
    data(){
        return {
            isLoading: false
        }
    },
    methods:{
       async updateCollected(){
        this.isLoading = true
           try{
            if(this.value){
            const data = await cancelCollections(this.aut_id)
                    // console.log('取消',data)

           }else{
             const data = await addCollections(this.aut_id)
        // console.log('增加',data)
           }
            this.$emit('input',!this.value)
            this.$toast.success(!this.value? '收藏成功' : '取消收藏')
           }catch(err){
            this.$toast('请求失败,请稍后重试')
           }
                   this.isLoading = false

        }
    }

}
</script>
<style lang="scss">
// .van-button--normal{
//         padding: 0;
//         border: 0;
//    .van-button__content{
//     display: block;
//    }
//     }
.collected{
    .van-icon.van-icon-star{
                color: #ffa500;

    }

}
</style>