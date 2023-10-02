<template>
    <div class="detail-step" v-if="order.payType">
        <ClSteps :active="order.orderState === 6? 1:order.orderState-1">
        <ClStepsItem title="提交订单" :desc="order.createTime"></ClStepsItem>
        <ClStepsItem title="付款成功" :desc="order.payTime"></ClStepsItem>
        <ClStepsItem title="商品发货" :desc="order.consignTime"></ClStepsItem>
        <ClStepsItem title="确认收货" :desc="order.endTime"></ClStepsItem>
        <ClStepsItem title="订单完成" :desc="order.evaluationTime"></ClStepsItem>
    </ClSteps>
    </div>
</template>
<script>
export default {
  name: 'DetailStep',
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style lang="scss">
.detail-step{
    padding: 20px;
}
</style>
