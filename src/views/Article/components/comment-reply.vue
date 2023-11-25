<template>
<div class="comment-reply-container">
    <van-nav-bar
  :title="`${comment.reply_count} 条回复`"
>
<van-icon name="cross" slot="left" @click="$emit('closeCommentReplay')"/>
</van-nav-bar>
<div class="scroll-wrap">
    <!-- 当前回复 -->
<commentItem :comment="comment"/>
<van-cell value="全部回复" />
<!-- 用户回复列表 -->
<comment-list :commentList="commentList" type="c" :source="comment.com_id"/>
</div>

<!-- 底部评论 -->
<div class="bottom-post-wrap">
    <van-button size="small" round @click="isPostShow = true">写评论</van-button>
</div>

<!-- 发布评论 -->
<van-popup v-model="isPostShow" position="bottom" >
            <commentPost  :target="comment.com_id" @closePopup="closePopup"/>
        </van-popup>
</div>
</template>
<script>
import commentItem from '@/components/comment-item/index.vue'
import commentList from '@/views/Article/components/comment-list.vue'
import commentPost from '@/views/Article/components/comment-post.vue'
export default {
    props:{
        comment:{
            type:Object
        }
    },
    components:{
        commentItem,
        commentList,
        commentPost
    },
    data(){
        return {
            commentList:[],
            isPostShow: false
        }
    },
    methods:{
        closePopup(newobj){
            this.isPostShow = false
            this.commentList.unshift(newobj)
            this.comment.reply_count += 1
    // console.log(newobj)
        }
        // onClickLeft(){

        // }
    }
}
</script>
<style lang="scss" scoped>
.comment-reply-container{
    height: 100%;
    position: relative;
    .scroll-wrap{
        position: fixed;
        top: 92px;
        bottom: 90px;
        left:0;
        right: 0;
        overflow-y: auto;
    }
.bottom-post-wrap{
position: absolute;
bottom: 0;
left: 0;
right: 0;
display: flex;
align-items: center;
justify-content: center;
background-color: #fff;
border-top: 1px solid #d8d8d8;
height: 88px;
.van-button{
 width: 60%;   
}
}
}

</style>
<style lang="scss">
.comment-reply-container{
.bottom-post-wrap{

}
}

</style>