<template>
  <div class="member-home">
      个人中心
      <HomeOverview/>
      <HomePanel title="我的收藏">
        <GoodsItem v-for="item in collectGoods" :key="item.id" :goods="item"/>
      </HomePanel>
      <HomePanel title="我的足迹">
        <GoodsItem v-for="i in 4" :key="i" :goods="goods"/>
      </HomePanel>
      <GoodsRelevant/>
  </div>
</template>
<script>
import { findCollect } from '@/api/member'
import HomeOverview from './components/home-overview.vue'
import HomePanel from './components/home-panel'
import GoodsRelevant from '@/views/goods/components/goods-relevant.vue'
import GoodsItem from '@/views/category/components/goods-item.vue'
import { ref } from 'vue'

export default {
  name: 'MemberHome',
  components: {
    HomeOverview,
    HomePanel,
    GoodsRelevant,
    GoodsItem
  },
  setup () {
    const collectGoods = ref([])
    findCollect({ page: 1, pageSize: 4 }).then(data => {
      collectGoods.value = data.result.items
      console.log('data=', data)
    })
    return { collectGoods }
  }
}
</script>
<style scoped lang="scss">
:deep(.cl-carousel) .carousel-btn.prev {
  left: 5px;
}
:deep(.cl-carousel) .carousel-btn.next {
  right: 5px;
}
.home-panel {
  background-color: #fff;
  padding: 0 20px;
  margin-top: 20px;
  height: 400px;
  .header {
    height: 66px;
    border-bottom: 1px solid #f5f5f5;
    padding: 18px 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    h4 {
      font-size: 22px;
      font-weight: normal;
    }
  }
}
  :deep(.goods-list) {
    display: flex;
    justify-content: space-around;
    padding-top: 20px;
  }
</style>
