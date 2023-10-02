<template>
  <div class='cl-goods-page' v-if="goods">
    <div class="container">
      <ClBread>
        <ClBreadItem to="/">首页</ClBreadItem>
        <ClBreadItem :to="`/category/${goods.categories[1].id}`">{{goods.categories[1].name}}</ClBreadItem>
        <ClBreadItem :to="`/category/sub/${goods.categories[0].id}`">{{goods.categories[0].name}}</ClBreadItem>
        <ClBreadItem>{{goods.name}}</ClBreadItem>
      </ClBread>
      <div class="goods-info">
        <div class="media">
            <GoodsImage :images="goods.mainPictures"/>
            <GoodsSales/>
        </div>
        <div class="spec">
            <GoodsName :goods="goods"/>
            <!-- skuId="1369155864430120962" -->
            <GoodsSku :goods="goods" @change="changeSku" />
            <ClNumbox style="margin-bottom:10px;" v-model="num" :max="goods.inventory" />
            <ClButton @click="insertCart" type="primary" >加入购物车</ClButton>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant :goodsId="goods.id"/>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <GoodsTabs/>
            <GoodsWarn/>
        </div>
        <div class="goods-aside">
                                  <GoodsHot/>
                                  <GoodsHot :type="2"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import GoodsWarn from './components/goods-warn'
import GoodsHot from './components/goods-hot.vue'
import GoodsTabs from './components/goods-tabs.vue'
import GoodsName from './components/goods-name.vue'
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales'
import GoodsRelevant from './components/goods-relevant'
import GoodsSku from './components/goods-sku.vue'
import { findGoods } from '@/api/product'
import { nextTick, provide, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Message from '@/components/library/Message'
import { useStore } from 'vuex'

export default {
  name: 'ClGoodsPage',
  components: {
    GoodsWarn,
    GoodsHot,
    GoodsTabs,
    GoodsName,
    GoodsRelevant,
    GoodsImage,
    GoodsSales,
    GoodsSku
  },
  setup () {
    const { goods, loading } = useGoods()
    provide('goods', goods)
    const num = ref(1)
    const currSku = ref(null)
    const store = useStore()
    const changeSku = (sku) => {
      console.log('changesku=', sku)
      // 修改商品的现价原价库存信息
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
      // 记录选择后的sku，可能有数据，可能没有数据{}
      currSku.value = sku
    }
    const insertCart = () => {
      if (currSku.value && currSku.value.skuId) {
        // id skuId name attrsText picture price nowPrice selected stock count isEffective
        const { skuId, specsText: attrsText, inventory: stock } = currSku.value
        const { id, name, price, mainPictures } = goods.value
        store.dispatch('cart/insertCart', {
          skuId,
          attrsText,
          stock,
          id,
          name,
          price,
          nowPrice: price,
          picture: mainPictures[0],
          selected: true,
          isEffective: true,
          count: num.value
        }).then(() => {
          Message({ type: 'success', text: '加入购物车成功' })
        })
      } else {
        Message({ text: '请选择完整规格' })
      }
    }
    return { goods, loading, changeSku, num, insertCart }
  }
}
const useGoods = () => {
  const goods = ref(null)
  const route = useRoute()
  const loading = ref(false)
  watch(() => route.params.id, (newVal) => {
    if (newVal && `/product/${newVal}` === route.path) {
      loading.value = true
      findGoods(route.params.id).then(data => {
        goods.value = null
        nextTick(() => {
          goods.value = data.result
          //   console.log('goods=', goods.value)

          loading.value = false
        })
      })
    }
  }, { immediate: true })
  return { goods, loading }
}

</script>

<style scoped lang='scss'>
.cl-goods-page{
    background-color: #f5f5f5;
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}

}

</style>
