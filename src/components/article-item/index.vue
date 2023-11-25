<template>
<div class="article-item">
<van-cell  class="article-item" @click="redirectArticle">
    <div slot="title" class="title van-multi-ellipsis--l2" >
        {{article.title}}
    </div>
    <div slot="label">
        <div v-if="article.cover.type === 3" class="cover-wrap">
            <div class="cover-item" 
            v-for="(img, index) in article.cover.images"
            :key="index"
            >
                 <van-image
                 class="cover-item-img"
  :src="img"
  fit="cover"
/>
            </div>
        </div>
        <!--  -->
        <div class="label-info-wrap">
            <span>{{article.aut_name}}</span>
            <span>{{article.comm_count}}</span>
            <span>{{article.pubdate | relativeTime}}</span>
        </div>
    </div>
    <!--  -->
        <van-image
        slot="default"
        class="right-cover"
        v-if="article.cover.type == 1"
  :src="article.cover.images[0]"
  fit="cover"
/>
</van-cell>

</div>
</template>
<script>
export default {
name:"ArticleItem",
props: {
    article: {
        type: Object,
        required: true
    }
},
methods:{
    redirectArticle(){
        this.$router.push(`/article/${this.article.art_id}`)
        // console.log(this.article.art_id)
    }
}
}
</script>
<style lang="scss" scoped>
.article-item {
    .title{
        font-size: 32px;
        color: #3a3a3a;
    }
    .right-cover{
           width: 232px;
        height: 146px;
        margin-left: 26px;
    }
    .label-info-wrap span{
         font-size: 23px;
         font-family: Arial;
         color: #b4b4b4;
         margin-right: 25px;
    }
    .cover-wrap {
        display: flex;
        padding: 30px 0;
        .cover-item {
            flex: 1;
            height: 146px;
            &:not(:last-child){
                padding-right: 4px;
            }
            .cover-item-img{
                 width: 100%;
                 height: 146px;
            }
        }
    }
    
}
</style>

<style lang="scss">
.article-item{
 
    .van-cell__value {
        flex: unset;
        width: 232px;
        height: 146px;
    }

}


</style>