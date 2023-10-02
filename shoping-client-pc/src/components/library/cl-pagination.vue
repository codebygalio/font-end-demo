<template>
  <div class="cl-pagination">
    <!-- {{pager.btnArr}} -->
     <a @click="changePager(myCurrentPage-1)"  v-if="myCurrentPage>1" href="javascript:;">上一页</a>
    <a v-else href="javascript:;" class="disabled">上一页</a>
    <span v-if="pager.start>1">...</span>
    <a @click="changePager(i)" href="javascript:;" v-for="i in pager.btnArr" :key="i" :class="{active:i===myCurrentPage}">{{i}}</a>
    <span v-if="pager.end<pager.pageCount">...</span>
    <a @click="changePager(myCurrentPage+1)" href="javascript:;" v-if="myCurrentPage < pager.pageCount ">下一页</a>
    <a v-else href="javascript:;" class="disabled">下一页</a>
  </div>
</template>
<script>
import { computed, ref, watch } from 'vue'
export default {
  name: 'ClPagination',
  props: {
    total: {
      type: Number,
      default: 100
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  setup (props, { emit }) {
    const count = 5
    const myCurrentPage = ref(1)
    const myTotal = ref(100)
    const myPageSize = ref(10)
    const pager = computed(() => {
      const pageCount = Math.ceil(myTotal.value / myPageSize.value)
      //   console.log('pageCount=', pageCount)
      const offset = Math.floor(count / 2)
      //   console.log('offset=', offset)

      let start = myCurrentPage.value - offset
      //   console.log('start=', start)
      let end = start + count - 1
      //   console.log('end=', end)
      if (start < 1) {
        start = 1
        end = (start + count - 1) > pageCount ? pageCount : (start + count - 1)
      }
      if (end > pageCount) {
        end = pageCount
        start = (end - count + 1) < 1 ? 1 : (end - count + 1)
      }
      const btnArr = []
      for (let i = start; i <= end; i++) {
        btnArr.push(i)
      }

      return {
        pageCount,
        btnArr,
        start,
        end
      }
    })
    watch(props, () => {
      myTotal.value = props.total
      myPageSize.value = props.pageSize
      myCurrentPage.value = props.currentPage
    }, { immediate: true })
    const changePager = (page) => {
      // 页码相同不作为
      if (myCurrentPage.value !== page) {
        myCurrentPage.value = page
        // 通知父组件
        emit('current-change', page)
      }
    }

    return { myCurrentPage, pager, changePager }
  }
}
</script>
<style scoped lang="scss">
.cl-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: $xtxColor;
    }
    &.active {
      background: $xtxColor;
      color: #fff;
      border-color: $xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
