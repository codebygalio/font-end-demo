<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{item.name}}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img :class="{selected:val.selected,disabled:val.disabled}" @click="changeSku(item,val)" v-if="val.picture" :src="val.picture" :title="val.name" >
          <span :class="{selected:val.selected,disabled:val.disabled}" @click="changeSku(item,val)" v-else>{{val.name}}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>

import powerSet from '@/vender/power-set'
const spliter = '★'
const getPathMap = (skus) => {
  const pathMap = {}
  //   console.log('skus=', skus)
  skus.forEach(sku => {
    if (sku.inventory > 0) {
      const valueArr = sku.specs.map(val => val.valueName)

      //   console.log('valueArr=', valueArr)
      const valueArrPowerSet = powerSet(valueArr)
      //   console.log('valueArrPowerSet=', valueArrPowerSet)
      // 遍历子集，往pathMap插入数据
      valueArrPowerSet.forEach(arr => {
        const key = arr.join(spliter)
        // 给pathMap设置数据
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  //   console.log('pathMap=', pathMap)
  return pathMap
}
const getSelectedValues = (specs) => {
  const arr = []
  specs.forEach(item => {
    const seletedVal = item.values.find(val => val.selected)
    arr.push(seletedVal ? seletedVal.name : undefined)
  })
  return arr
}
const updateDisabledStatus = (specs, pathMap) => {
//   debugger

  specs.forEach((item, i) => {
    const selectedValues = getSelectedValues(specs)
    // console.log('selectedValues=', selectedValues)
    item.values.forEach(val => {
      if (val.selected) return
      //   console.log('111val.name=', val.name)
      //   console.log('111val.selectedValues=', selectedValues[i])
      //   console.log('i=', i)
      //   console.log('selectedValues[i]=', selectedValues[i])
      selectedValues[i] = val.name
      //   console.log('222val.selectedValues=', selectedValues)
      const key = selectedValues.filter(value => value).join(spliter)
      //   console.log('key=', selectedValues.filter(value => value))
      //   console.log('val=', val)
      val.disabled = !pathMap[key]
    })
  })
}
const initDefaultSelected = (goods, skuId) => {
  const sku = goods.skus.find(sku => sku.id === skuId)
  //   console.log('goods.specs=', goods.specs)
  //   console.log('sku=', sku)
  goods.specs.forEach((item, i) => {
    const val = item.values.find(val => val.name === sku.specs[i].valueName)
    val.selected = true
  })
}

export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const pathMap = getPathMap(props.goods.skus)
    console.log('pathMap=', pathMap)
    if (props.skuId) {
      initDefaultSelected(props.goods, props.skuId)
    }
    updateDisabledStatus(props.goods.specs, pathMap)

    const changeSku = (item, val) => {
      if (val.disabled) return
      if (val.selected) {
        val.selected = false
      } else {
        item.values.forEach(valItem => {
          valItem.selected = false
        })
        val.selected = true
      }
      updateDisabledStatus(props.goods.specs, pathMap)

      const validSelectedValues = getSelectedValues(props.goods.specs).filter(v => v)
      if (validSelectedValues.length === props.goods.specs.length) {
        // 完整
        const skuIds = pathMap[validSelectedValues.join(spliter)]
        const sku = props.goods.skus.find(sku => sku.id === skuIds[0])
        emit('change', {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          specsText: sku.specs.reduce((p, c) => `${p} ${c.name}：${c.valueName}`, '').trim()
        })
      } else {
        emit('change', {})
      }
    }
    return { changeSku }
  }
}
</script>
<style scoped lang="scss">
@mixin sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: $xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 10px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        @include sku-state-mixin ();
      }
      > span {
        margin-bottom: 10px;
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        @include sku-state-mixin ();
      }
    }
  }
}
</style>
