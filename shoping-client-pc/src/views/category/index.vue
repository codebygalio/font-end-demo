<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
         <ClBread>
        <ClBreadItem to="/">首页</ClBreadItem>
        <Transition  name="fade-right">
          <ClBreadItem :key="topCategory.id">{{
            topCategory.name
          }}</ClBreadItem>
        </Transition>
      </ClBread>
      <!-- 轮播图 -->
      <clCarousel :sliders="sliders" style="height:500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="sub in topCategory.children" :key="sub.id">
            <a href="javascript:;">
              <img :src="sub.picture" >
              <p>{{sub.name}}</p>
            </a>
          </li>
        </ul>
      </div>
            <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="sub in subList" :key="sub.id">
        <div class="head">
          <h3>- {{sub.name}} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <clMore :path="`/category/sub/${sub.id}`"/>
        </div>
        <div class="body">
          <GoodsItem v-for="goods in sub.goods" :key="goods.id" :goods="goods"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GoodsItem from './components/goods-item'
import { findBanner } from '@/api/home'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { findTopCategory } from '@/api/category'
export default {
  name: 'topCategory',
  components: {
    GoodsItem
  },
  setup () {
    // 轮播图
    const sliders = ref([])
    findBanner().then(data => {
      sliders.value = data.result
    })
    const store = useStore()
    const route = useRoute()
    const topCategory = computed(() => {
      let defaultCate = {}
      const item = store.state.category.list.find(item => {
        return item.id === route.params.id
      })
      if (item)defaultCate = item
      return defaultCate
    //   const cate = {}
    //   return cate
    })
    const subList = ref([])
    const getSubList = () => {
      findTopCategory(route.params.id).then(data => {
        subList.value = data.result.children
      })
    }
    watch(() => route.params.id, (newVal) => {
      if (newVal && `/category/${newVal}` === route.path) getSubList()
    //   newVal && getSubList()
    }, { immediate: true })
    return { sliders, topCategory, subList }
  }
}
</script>
<style scoped lang="scss">
.top-category {
    background-color: #f5f5f5;

  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }
}
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .cl-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
</style>
