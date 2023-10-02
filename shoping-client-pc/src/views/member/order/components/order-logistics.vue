<template>
<ClDialog title="查看物流" v-model:visible="visibleDialog">
<div class="order-logistics-goods" v-if="currOrder">
      <a class="image" href="javascript:;"
        ><img :src="currOrder.skus && currOrder.skus[0].image" alt="" />
        <p>{{currOrder.skus && currOrder.skus.length}}件商品</p></a
      >
      <div class="info" >
        <p><span>配送企业：</span>京东快递</p>
        <p><span>快递单号：</span>1233211234567</p>
        <p><span>联系电话：</span>13011011011</p>
      </div>
    </div>
    <div class="order-logistics-list">
      <div class="item" v-for="i in 5" :key="i">
        <div class="line" :class="{ active: i === 1 }"></div>
        <div class="logistics">
          <p>xxxx</p>
          <p>2023-07-16 19:37:04</p>
        </div>
      </div>
    </div>
</ClDialog>
</template>
<script>
import { ref } from 'vue'
import { logisticsOrder } from '@/api/order'
export default {
  name: 'OrderLogistics',
  setup () {
    const currOrder = ref({})
    const visibleDialog = ref(false)
    const logistics = ref(null)
    const open = order => {
      visibleDialog.value = true
      currOrder.value = order
      //   console.log(currOrder.value)
    //   logisticsOrder(order.id).then(data => {
    //     logistics.value = data.result
    //   })
    }
    return { visibleDialog, open, currOrder }
  }
}
</script>
<style lang="scss" scoped>
.cl-dialog ::v-deep .wrapper {
  width: 680px;
}
.order-logistics-goods {
  display: flex;
  background-color: #f5f5f5;
  height: 130px;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;
  font-size: 14px;
  .image {
    width: 92px;
    height: 92px;
    border: 1px solid #e4e4e4;
    position: relative;
    p {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 20px;
      line-height: 20px;
      color: #fff;
      background-color: rgba(0,0,0,.5);
      text-align: center;
    }
  }
  .info {
    flex: 1;
    padding-left: 20px;
    line-height: 30px;
    span {
      color: #999;
    }
  }
}
.order-logistics-list {
  position: relative;
  padding-top: 10px;
  font-size: 14px;
  .item {
    display: flex;
    &:last-child {
      .line {
        border-color: transparent;
        &::before{
          top: 0;
        }
      }
    }
    .line {
      width: 27px;
      border-right: 2px solid #f5f5f5;
      margin-right: 25px;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(7px, 0);
        border-radius: 50%;
      }
      &::before {
        width: 12px;
        height: 12px;
        background: #e4e4e4;
      }
      // 激活
      &.active {
        &::before {
          background: $xtxColor;
          z-index: 1;
        }
        &::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(11px, -4px);
          border-radius: 50%;
          width: 20px;
          height: 20px;
          background: #E3F9F4;
        }
      }
    }
    .logistics {
      flex: 1;
      padding-bottom: 35px;
      position: relative;
      top: -3px;
      p {
        &:first-child {
          color: #666;
        }
        &:last-child {
          color: #999;
          margin-top: 6px;
        }
      }
    }
  }
}
</style>
