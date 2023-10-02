<template>
    <div class="sub-filter" v-if="filterData && !filterLoading">
        <div class="item">
            <div class="head">品牌：</div>
            <div class="body">
                <a
                    @click="changeBrand(item.id)"
                    :class="{ active: item.id === filterData.selectedBrand }"
                    href="javascript:;"
                    v-for="item in filterData.brands"
                    :key="item.id"
                    >{{ item.name }}</a
                >
            </div>
        </div>
        <div
            class="item"
            v-for="item in filterData.saleProperties"
            :key="item.id"
        >
            <div class="head">{{ item.name }}:</div>
            <div class="body">
                <a
                    @click="changeProp(item, prop.id)"
                    :class="{ active: prop.id === item.selectedProp }"
                    href="javascript:;"
                    v-for="prop in item.properties"
                    :key="prop.id"
                    >{{ prop.name }}</a
                >
            </div>
        </div>
    </div>
    <!-- 骨架屏 -->
    <div v-else class="sub-filter">
        <clSkeleton class="item" width="800px" height="40px" />
        <clSkeleton class="item" width="800px" height="40px" />
        <clSkeleton class="item" width="600px" height="40px" />
        <clSkeleton class="item" width="600px" height="40px" />
        <clSkeleton class="item" width="600px" height="40px" />
    </div>
</template>
<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findSubCategoryFilter } from '@/api/category'
export default {
  name: 'SubFilter',
  setup (prop, { emit }) {
    const route = useRoute()
    const filterData = ref(null)
    const filterLoading = ref(false)

    watch(
      () => route.params.id,
      (newVal) => {
        filterLoading.value = true
        if (newVal && `/category/sub/${newVal}` === route.path) {
          findSubCategoryFilter(route.params.id).then((data) => {
            data.result.selectedBrand = null
            console.log('data.result.brands=', data.result)
            data.result.brands.unshift({ id: null, name: '全部' })
            data.result.saleProperties.forEach((item) => {
              item.selectedProp = null
              item.properties.unshift({ id: null, name: '全部' })
            })
            filterData.value = data.result
            filterLoading.value = false
            //   console.log('data=', data.result)
          })
        }
      },
      { immediate: true }
    )
    const getFilterParams = () => {
      const obj = { brandId: null, attrs: [] }
      obj.brandId = filterData.value.selectedBrand
      filterData.value.saleProperties.forEach((item) => {
        if (item.selectedProp) {
          const prop = item.properties.find(
            (prop) => prop.id === item.selectedProp
          )
          obj.attrs.push({
            groupName: item.name,
            propertyName: prop.name
          })
        }
      })
      if (obj.attrs.length === 0) obj.attrs = null
      //   console.log('obj=', obj)
      return obj
    }
    const changeProp = (item, propId) => {
      //   console.log('propId=', propId)
      if (item.selectedProp === propId) return
      item.selectedProp = propId
      emit('filter-change', getFilterParams())
    }

    const changeBrand = (brandId) => {
      //   console.log('brandId= ', brandId)
      //   console.log('filterData=', filterData.value)
      if (filterData.value.selectedBrand === brandId) return
      filterData.value.selectedBrand = brandId
      emit('filter-change', getFilterParams())
    }

    return { filterData, filterLoading, changeBrand, changeProp }
  }
}
</script>
<style scoped lang='scss'>
// 筛选区
.sub-filter {
    background: #fff;
    padding: 25px;
    .item {
        display: flex;
        line-height: 40px;
        .head {
            width: 80px;
            color: #999;
        }
        .body {
            flex: 1;
            a {
                margin-right: 36px;
                transition: all 0.3s;
                display: inline-block;
                &.active,
                &:hover {
                    color: $xtxColor;
                }
            }
        }
    }
    .cl-skeleton {
        padding: 10px 0;
    }
}
</style>
