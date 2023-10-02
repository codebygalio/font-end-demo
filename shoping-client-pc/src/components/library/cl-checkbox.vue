<template>
  <div class='cl-checkbox' @click="change()">
    <i class="iconfont icon-checked" v-if="checked"></i>
    <i class="iconfont icon-unchecked" v-else></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>

<script>
import { useVModel } from '@vueuse/core'
export default {
  name: 'ClCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const checked = useVModel(props, 'modelValue', emit)
    const change = () => {
      const newVal = !checked.value
      checked.value = newVal
      emit('change', newVal)
    }
    return { checked, change }
  }
}
</script>

<style scoped lang='scss'>
.cl-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: $xtxColor;
    ~ span {
      color: $xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
