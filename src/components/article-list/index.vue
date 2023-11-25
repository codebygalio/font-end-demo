<template>
<div class="article-list-container" @scroll="onscroll" ref="articleListContainer">
    <!-- 上拉刷新、下拉加载 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-text="dropdownSuccessText" success-duration="1000">

<!-- 内容加载 -->
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  error-text="请求失败,点击重新加载"
  :error.sync="error"
  @load="onLoad" 
>
<articleItem  v-for="(article, index) in list" :key="index" :article="article"></articleItem>

<!-- <van-cell v-for="(article, index) in list" :key="index" :title="article.title"> -->
</van-cell>
</van-list>
<!-- {{channel}} -->
</van-pull-refresh>

</div>
</template>
<script>
import {getAticleList} from '@/api/article'
import articleItem from '@/components/article-item'

export default {
   name:'articlListContainer',
props:{
    channel:{
    }
},
components:{
    articleItem
},
      data() {
    return {
        isLoading: false, //下拉刷新
        timestamp: null, 
      list: [],
      loading: false, //下拉加载
      finished: false, 
      error:false,
      dropdownSuccessText:'刷新成功',
      scrollTop: 0
    };
  },
  activated(){
        this.$refs.articleListContainer.scrollTop = this.scrollTop
    },
   methods: {
    onscroll(){
        this.scrollTop = this.$refs.articleListContainer.scrollTop
                console.log('scrollTop=',this.scrollTop)

    },
    // 下拉刷新
   async onRefresh(){
    try {
         const {data} = await getAticleList({
            channel_id: this.channel,
            timestamp: new Date(),
            with_top: 1
        })
        this.list.unshift(...data.results)
        this.dropdownSuccessText = `刷新成功，更新了${data.results.length}条数据`
        this.timestamp = data.pre_timestamp

        if(data.results.length <= 0 ){
            this.finished = true
        }
    }
    catch(err){
    if(!err)return
    this.dropdownSuccessText = '刷新失败，请稍后再重试'
    }
        this.isLoading = false
    },
// 上拉加载
   async onLoad() {
        try{
            const {data} = await getAticleList({
            channel_id: this.channel,
            timestamp: this.timestamp || +new Date(),
            with_top: 1
        })
        this.list.push(...data.results)
        // console.log(this.list)
        this.timestamp = data.pre_timestamp
        if(data.results.length <= 0 ){
            this.finished = true
        }

        }catch(err){
            if(!err)return
            this.error = true
           
        }
         this.loading = false
     
    },
  }
}
</script>
<style lang="scss" scoped>
.article-list-container{
    height: 76.91vh;
    overflow-y: auto;
}
</style>