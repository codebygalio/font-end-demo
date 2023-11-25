<template>
<div class="search-result-container">
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  :error.sync="error"
  error-text="请求失败，可以点击再重试"
>
  <van-cell v-for="(item, index) in list" :key="index" :title="item.title" />
</van-list>
</div>
</template>
<script>

import {getSearchResult} from '@/api/search'
export default {
    props:{
        searchText:{
            type: String
        }
    },
    data(){
        return {
            pages:{
                page:'', //页数
                per_page:10, // 每页数量
                q:'' //查询的关键词

            },
            loading:false,
            finished:false,
            error:false,
            list:[]
        }
    },
methods:{
    async onLoad(){
        try{
            const {data} =  await getSearchResult({
        page: this.pages.page,
        per_page: this.pages.per_page,
        q: this.searchText
      })
      this.list.push(...data.results)
    //   console.log(data.results)
        if(data.results.length){
            this.pages.page += 1
            // this.loading = false 
        }else{
            this.finished = true
        }


    //   console.log(this.list)
        }catch(err){
            if(!err)return
            this.error = true
            this.$toast('请求失败，请稍后重试')
        }
         this.loading = false 
        
    },
}
}
</script>
<style lang="scss" scoped>

</style>