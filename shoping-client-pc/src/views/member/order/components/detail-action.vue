<template>
    <div class="detail-action" v-if="order.orderState">
      <div class="state">
        <span class="iconfont icon-order-unpay"></span>
        <p>{{orderStatus[order.orderState].label}}</p>
      </div>
      <div class="info">
        <p>订单编号：{{order.id}}</p>
        <p>下单时间：{{order.createTime}}</p>
      </div>
      <div class="btn">
         <div class="btn">
      <!-- 待付款 -->
      <template v-if="order.orderState === 1">
        <ClButton @click="$router.push('/member/pay?id='+order.id)" type="primary" size="small">立即付款</ClButton>
        <ClButton type="gray" size="small" @click="handlerCancel(order)">取消订单</ClButton>
      </template>
      <!-- 待发货 -->
      <template v-if="order.orderState === 2">
        <ClButton @click="$router.push(`/member/checkout/orderId=${order.id}`)" type="primary" size="small">再次购买</ClButton>
      </template>
      <!-- 待收货 -->
      <template v-if="order.orderState === 3">
        <ClButton type="primary" size="small">确认收货</ClButton>
        <ClButton  @click="$router.push(`/member/checkout/orderId=${order.id}`)"  type="plain" size="small">再次购买</ClButton>
      </template>
      <!-- 待评价 -->
      <template v-if="order.orderState === 4">
        <ClButton  @click="$router.push(`/member/checkout/orderId=${order.id}`)"  type="primary" size="small">再次购买</ClButton>
        <ClButton type="plain" size="small">评价商品</ClButton>
        <ClButton type="gray" size="small">申请售后</ClButton>
      </template>
      <!-- 已完成 -->
      <template v-if="order.orderState === 5">
        <ClButton  @click="$router.push(`/member/checkout/orderId=${order.id}`)"  type="primary" size="small">再次购买</ClButton>
        <ClButton type="plain" size="small">查看评价</ClButton>
        <ClButton type="gray" size="small">申请售后</ClButton>
      </template>
      <!-- 已取消 -->
    </div>
      </div>
      <Teleport to="#model">
      <OrderCancel ref="orderCancelCom"/>
      </Teleport>
    </div>
</template>
<script>
import { userCancel } from '../index'
import { orderStatus } from '@/api/constants'
import OrderCancel from './order-cancel.vue'
import { ref } from 'vue'
export default {
  name: 'DetailAction',
  components: {
    OrderCancel
  },
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  setup () {
    const orderCancelCom = ref(null)
    return { orderCancelCom, orderStatus, ...userCancel() }
  }
}
</script>
<style scoped lang="scss">
.detail-action {
  height: 180px;
  width: 100%;
  display: flex;
  align-items: center;
  .state {
    width: 220px;
    text-align: center;
    .iconfont {
      font-size: 40px;
      color: $xtxColor;
    }
    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }
  }
  .info {
    width: 240px;
    line-height: 30px;
    p {
      color: #999;
    }
  }
  .btn {
    flex: 1;
    text-align: right;
    margin-right: 100px;
    .Cl-button {
      margin-left: 20px;
    }
  }
}
</style>
