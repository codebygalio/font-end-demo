<template>
<div class="comment-post-container">
<van-field
    class="post-field"
  v-model.trim="content"
  rows="2"
  autosize
  type="textarea"
  maxlength="50"
  placeholder="请输入留言"
  show-word-limit
>
<div slot="extra">
    <van-button class="right-button" @click="sumitPost" :disabled="!content.length">发布</van-button>

</div>
</van-field>
</div>
</template>
<script>
// art_id
import {addComment}  from '@/api/comments.js'
export default {
    inject: ['articleId'],
        // inject:{
        //     articleId:{
        //     }
        // },
    props:{
        target:{
            type: String
        }
    },
    data(){
        return {
            content:''
        }
    },
    methods:{
        async sumitPost(){
             this.$toast.loading({
  message: '加载中...',
  forbidClick: true,
  duration:0
});
            // console.log(this.art_id)
            // console.log(this.content)
           try{
            const {data} =  await addComment({
            target:this.target,
            content:this.content,
            art_id: this.articleId
           })
           
           this.$emit('closePopup',data.new_obj)
           this.$toast.success('发布成功')
           }catch(err){
                    this.$toast.fail('发布失败')
           }
        //    console.log(data)
        
        }
    }
}
</script>
<style lang="scss">
.comment-post-container{
    .post-field{
        .van-field__control{
            height: 200px !important;
        }
    }
    .right-button{
        border: none;
        color: #406599;
        height: 100%;
        &::before{
            background-color: unset;
        }
    }
}
</style>