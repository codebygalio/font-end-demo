<template>
    <div class="member-order">
        <ClTabs v-model="activeName" @tab-click="tabClick">
            <ClTabsPanel
                v-for="item in orderStatus"
                :key="item.name"
                :name="item.name"
                :label="item.label"
            >
            </ClTabsPanel>
        </ClTabs>
        <div class="order-list">
            <div v-if="loading" class="loading"></div>
            <div class="none" v-if="!loading && orderList.length === 0">
                暂无数据
            </div>
            <OrderItem
                @on-delete="handlerDelete"
                @on-cancel="handlerCancel"
                @on-confirm="handlerConfirm"
                @on-logistics="handlerLogistics"
                v-for="item in orderList"
                :key="item.id"
                :order="item"
            />
        </div>
        <ClPagination
            @current-change="reqParams.page = $event"
            v-if="total > 0"
            :total="total"
            :pageSize="reqParams.pageSize"
            :currentPage="reqParams.page"
        ></ClPagination>
        <OrderCancel ref="orderCancelCom" />
        <OrderLogistics ref="orderLogisticsCom"/>
    </div>
</template>
<script>
import OrderLogistics from './components/order-logistics'
import OrderItem from './components/order-item'
import { reactive, ref, watch } from 'vue'
import { orderStatus } from '@/api/constants.js'
import { confirmOrder, deleteOrder, findOrderList } from '@/api/order'
import OrderCancel from './components/order-cancel.vue'
import Confirm from '@/components/library/Confirm'
import Message from '@/components/library/Message'
export default {
  name: 'MemberOrder',
  components: {
    OrderItem,
    OrderCancel,
    OrderLogistics
  },
  setup () {
    const activeName = ref('all')
    const loading = ref(false)
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      orderState: 0
    })
    const total = ref(0)
    const orderList = ref([])

    const getOrderList = () => {
      loading.value = true
      findOrderList(reqParams).then((data) => {
        orderList.value = data.result.items
        total.value = data.result.counts
        // console.log('orderList.value=', orderList.value)
        loading.value = false
      })
    }
    watch(
      reqParams,
      () => {
        getOrderList()
      },
      {
        immediate: true
      }
    )
    const tabClick = ({ index }) => {
      reqParams.page = 1
      reqParams.orderState = index
      console.log('index=', index)
    }
    const handlerDelete = (order) => {
      Confirm({ text: '亲，您确认删除该订单吗？' })
        .then(() => {
          deleteOrder(order.id).then(() => {
            Message({ type: 'success', text: '删除成功' })
            getOrderList()
          })
        })
        .catch(() => {})
    }
    const handlerConfirm = order => {
      Confirm({ text: '亲，您确认收货吗？确认后货款将打给买家' }).then(() => {
        confirmOrder(order.id).then(() => {
          Message({ type: 'success', text: '确认收货成功' })
          getOrderList()
        })
      }).catch(() => {})
    }
    return {
      activeName,
      orderStatus,
      orderList,
      tabClick,
      loading,
      total,
      reqParams,
      handlerDelete,
      handlerConfirm,
      ...userCancel(),
      ...useLogistics()
    }
  }
}
export const userCancel = () => {
  const orderCancelCom = ref(null)
  const handlerCancel = (order) => {
    orderCancelCom.value.open(order)
  }

  return { handlerCancel, orderCancelCom }
}
// 查看物流
export const useLogistics = () => {
  const orderLogisticsCom = ref(null)
  const handlerLogistics = order => {
    orderLogisticsCom.value.open(order)
  }
  return { handlerLogistics, orderLogisticsCom }
}
</script>
<style lang="scss" scoped>
.member-order {
    height: 100%;
    background: #fff;
}
.order-list {
    padding: 20px;
    position: relative;
    min-height: 400px;
}
.loading {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(255, 255, 255, 0.9) url(../../../assets/images/loading.gif)
        no-repeat center;
}
.none {
    height: 400px;
    text-align: center;
    line-height: 400px;
    color: #999;
}
</style>
