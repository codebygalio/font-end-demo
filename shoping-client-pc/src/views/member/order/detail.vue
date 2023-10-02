<template>
    <div class="member-order-detail" v-if="order">
        <DetailAction :order="order"/>
        <DetailStep :order="order"/>
        <DetailLogistics :order="order" v-if="order.orderState" />
        <!-- <DetailLogistics v-if="[3,4,5].includes(order.orderState)" :order="order" /> -->
        <DetailInfo :order="order"/>
    </div>
</template>
<script>
import DetailInfo from './components/detail-info'
import DetailLogistics from './components/detail-logistics'
import { ref } from 'vue'
import DetailAction from './components/detail-action'
import DetailStep from './components/detail-step'
import { findOrderDetail } from '@/api/order'
import { useRoute } from 'vue-router'
export default {
  name: 'MemberDetail',
  components: {
    DetailAction,
    DetailStep,
    DetailLogistics,
    DetailInfo
  },
  setup () {
    const route = useRoute()
    const order = ref({})
    findOrderDetail(route.params.id).then(data => {
      order.value = data.result
    //   console.log('order.value=', order.value)
    })
    return { order }
  }
}
</script>
<style scoped lang="scss">
.member-order-detail{
    background-color: #fff;
    height: 100%;
}
</style>
