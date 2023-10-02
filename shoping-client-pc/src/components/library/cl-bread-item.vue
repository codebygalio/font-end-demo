<template>
<div class="cl-bread-item">
     <RouterLink v-if="to" :to="to"><slot/></RouterLink>
     <span v-else><slot/></span>
   </div>
    <!-- <i   class="iconfont icon-angle-right"></i> -->
</template>
<script>
export default {
  name: 'ClBreadItem',
  props: {
    to: {
      type: [String, Object],
      default: ''
    }
  }
}
</script>
