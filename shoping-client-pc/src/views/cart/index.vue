<template>
  <div class="cl-cart-page">
    <div class="container">
      <ClBread>
        <ClBreadItem to="/">首页</ClBreadItem>
        <ClBreadItem>购物车</ClBreadItem>
      </ClBread>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120"><ClCheckbox @change="checkAll" :modelValue="$store.getters['cart/isCheckAll']">全选</ClCheckbox></th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
             <tr v-if="$store.getters['cart/validList'].length === 0">
            <td colspan="6">
                <CartNone />
            </td>
          </tr>
            <tr v-for="goods in $store.getters['cart/validList']" :key="goods.skuId">
              <td><ClCheckbox  @change="checkOne(goods.skuId,$event)" :modelValue="goods.selected"/></td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${goods.id}`"><img :src="goods.picture" alt=""></RouterLink>
                  <div>
                    <p class="name ellipsis">{{goods.name}}</p>
                    <!-- 选择规格组件 -->
                    <CartSku @change="updateCartSku(goods.skuId,$event)" :attrsText="goods.attrsText" :skuId="goods.skuId"/>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{goods.nowPrice}}</p>
                <p v-if="goods.price-goods.nowPrice > 0">比加入时降价 <span class="red">&yen;{{goods.price-goods.nowPrice}}</span></p>
              </td>
              <td class="tc">
                <ClNumbox @change="updateCount(goods.skuId, $event)" :max="goods.stock" :modelValue="goods.count"/>
              </td>
              <td class="tc"><p class="f16 red">&yen;{{Math.round(goods.nowPrice * 100) * goods.count/100 }}</p></td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p><a class="green" href="javascript:;" @click="deleteCart(goods.skuId)">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>

          <!-- 无效商品 -->
          <tbody v-if="$store.getters['cart/invalidList'].length">
            <tr><td colspan="6"><h3 class="tit">失效商品</h3></td></tr>
            <tr v-for="goods in $store.getters['cart/invalidList']" :key="goods.skuId">
              <td><ClCheckbox style="color:#eee;" /></td>
              <td>
                <div class="goods">
                   <RouterLink :to="`/product/${goods.id}`"><img :src="goods.picture" alt=""></RouterLink>
                  <div>
                    <p class="name ellipsis">{{goods.name}}</p>
                    <p class="attr">{{goods.attrsText}}</p>
                  </div>
                </div>
              </td>
              <td class="tc"><p>&yen;{{goods.nowPrice}}</p></td>
              <td class="tc">{{goods.count}}</td>
              <td class="tc"><p>&yen;{{Math.round(goods.nowPrice * 100) * goods.count/100 }}</p></td>
              <td class="tc">
                <p><a class="green" href="javascript:;" @click="deleteCart(goods.skuId)">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <ClCheckbox :modelValue="$store.getters['cart/isCheckAll']">全选</ClCheckbox>
          <a href="javascript:;" @click="batchDeleteCart()">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a href="javascript:;" @click="batchDeleteCart(true)">清空失效商品</a>
        </div>
        <div class="total">
          共 {{$store.getters['cart/validTotal']}} 件商品，已选择 {{$store.getters['cart/selectedTotal']}} 件，商品合计：
          <span class="red">&yen;{{$store.getters['cart/selectedAmount']}}</span>
          <ClButton type="primary" @click="checkout()">下单结算</ClButton>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <GoodRelevant />
    </div>
  </div>
</template>
<script>
import CartSku from './components/cart-sku'
import GoodRelevant from '@/views/goods/components/goods-relevant'
import { useStore } from 'vuex'
import CartNone from './components/cart-none.vue'
import Confirm from '@/components/library/Confirm.js'
import Message from '@/components/library/Message'
import { useRouter } from 'vue-router'
export default {
  name: 'ClCartPage',
  components: { GoodRelevant, CartNone, CartSku },
  setup () {
    const store = useStore()
    const router = useRouter()
    const checkOne = (skuId, selected) => {
      store.commit('cart/updateCart', { skuId, selected })
    }
    const checkAll = selected => {
      store.dispatch('cart/checkAllCart', selected)
    }
    const deleteCart = skuId => {
    //   store.dispatch('cart/deleteCart', skuId).then(() => {
    //     Message({ type: 'success', text: '删除成功' })
    //   })
      Confirm({ text: '亲,您是否确认删除商品' }).then(() => {
        store.dispatch('cart/deleteCart', skuId).then(() => {
          Message({ type: 'success', text: '删除成功' })
        })
        console.log('确认')
      }).catch(e => {
        console.log('取消')
      })
    }
    // 批量删除选中商品,也支持清空无效商品
    const batchDeleteCart = (isClear) => {
      Confirm({ text: `亲，您是否确认删除${isClear ? '失效' : '选中'}的商品` }).then(() => {
        store.dispatch('cart/batchDeleteCart', isClear)
      }).catch(e => {})
    }
    const updateCount = (skuId, count) => {
      store.dispatch('cart/updateCart', { skuId, count })
    }
    const updateCartSku = (oldSkuId, newSku) => {
      store.dispatch('cart/updateCartSku', { oldSkuId, newSku })
    }

    const checkout = () => {
      if (store.getters['cart/selectedList'].length === 0) {
        return Message({ text: '至少选中一件商品' })
      }
      if (store.state.user.profile.token) {
        return router.push('/member/checkout')
      }
      Confirm({ text: '下单结算需要登录，确认现在去登录吗？' }).then(() => {
        router.push('/login')
      })
    }
    return { checkOne, checkAll, deleteCart, batchDeleteCart, updateCount, updateCartSku, checkout }
  }
}
</script>
<style scoped lang="scss">
.tc {
  text-align: center;
  .cl-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: $priceColor;
}
.green {
  color: $xtxColor;
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .cl-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.cl-cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,td{
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
