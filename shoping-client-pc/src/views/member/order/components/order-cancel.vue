<template>
    <ClDialog title="取消订单" v-model:visible="visibleDialog">
        <!-- 组件内容 -->
        <div class="cancel-info">
            <p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
            <p class="tip">请选择取消订单的原因（必选）：</p>
            <div class="btn">
                <a
                    @click="curText == item?curText='' : curText = item "
                    v-for="item in cancelReason"
                    :key="item"
                    href="javascript:;"
                    :class="{ active: curText === item }"
                >
                    {{ item }}
                </a>
            </div>
        </div>
        <!-- 按钮操作 -->
        <template #footer>
            <ClButton
                type="gray"
                @click="visibleDialog = false"
                style="margin-right: 20px"
                >取消</ClButton
            >
            <ClButton type="primary" @click="submit">确认</ClButton>
        </template>
    </ClDialog>
</template>
<script>
import { ref } from 'vue'
import { cancelReason } from '@/api/constants'
import { cancelOrder } from '@/api/order'
import Message from '@/components/library/Message'
export default {
  setup () {
    const currOrder = ref(null)

    const curText = ref(null)
    const visibleDialog = ref(false)
    const open = (order) => {
      curText.value = ''
      visibleDialog.value = true
      currOrder.value = order
    //   console.log('currOrder=', currOrder.value.id)
    }
    const submit = () => {
      if (!curText.value) return Message({ text: '亲,请选择取消原因' })
      cancelOrder({
        orderId: currOrder.value.id,
        cancelReason: curText.value
      }).then(() => {
        Message({ type: 'success', text: '取消订单成功' })
        currOrder.value.orderState = 6
        visibleDialog.value = false
      })
    }
    return { visibleDialog, cancelReason, curText, submit, open }
  }
}
</script>
<style lang="scss" scoped>
.cl-dialog ::v-deep .wrapper {
    width: 620px;
}
.cancel-info {
    p {
        font-size: 16px;
        line-height: 35px;
        &.tip {
            color: #999;
        }
    }
    .btn {
        padding-top: 21px;
        display: flex;
        flex-wrap: wrap;
        a {
            width: 256px;
            height: 45px;
            line-height: 45px;
            text-align: center;
            background-color: #ffffff;
            border: 1px solid #e4e4e4;
            margin-right: 20px;
            margin-bottom: 20px;
            color: #666;
            &:nth-child(2n) {
                margin-right: 0;
            }
            &:hover,
            &.active {
                background-color: #e3f9f4;
                border-color: $xtxColor;
            }
        }
    }
}
</style>
