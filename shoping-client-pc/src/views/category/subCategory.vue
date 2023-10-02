<template>
<div class="sub-category">
<div class="container">
<SubBread/>
<SubFilter @filter-change="filterChange"/>
<div class="goods-list">
    <SubSort @sort-change="sortChange"/>
    <ul>
          <li v-for="goods in goodsList" :key="goods.id" >
            <GoodsItem :goods="goods" />
          </li>
        </ul>
        <ClInfiniteLoading @infinite="getData" :loading="loading" :finished="finished"/>
</div>
</div>
</div>
</template>
<script>
import { ref, watch } from 'vue'
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item'
import { findSubCategoryGoods } from '@/api/category'
import { useRoute } from 'vue-router'
export default {
  components: {
    SubBread,
    SubFilter,
    SubSort,
    GoodsItem
  },
  setup () {
    const route = useRoute()
    const loading = ref(false)
    const finished = ref(false)

    const goodsList = ref([])
    let reqParams = {
      page: 1,
      pageSize: 20
    }
    const getData = () => {
      loading.value = true
      findSubCategoryGoods(reqParams).then(({ result }) => {
        if (result.items.length) {
          goodsList.value.push(...result.items)
          reqParams.page++
        } else {
          finished.value = true
        }
        loading.value = false
      })
    }
    watch(() => route.params.id, (newVal) => {
      if (newVal && `/category/sub/${newVal}` === route.path) {
        finished.value = false
        goodsList.value = []
        reqParams = {
          page: 1,
          pageSize: 20
        }
      }
    })
    const sortChange = (sortParams) => {
    //   console.log('sortParams=', sortParams)
      finished.value = false
      reqParams = { ...reqParams, ...sortParams }
      reqParams.page = 1
      goodsList.value = []
      getData()
    }
    const filterChange = (filterParams) => {
      finished.value = false
      // 合并请求参数，保留之前参数
      reqParams = { ...reqParams, ...filterParams }
      reqParams.page = 1
      goodsList.value = []
      getData()
    }
    return { goodsList, getData, loading, finished, sortChange, filterChange }
  }
}
</script>
<style scoped lang="scss">
.sub-category{
    background-color: #f5f5f5;
    .goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
}
</style>
