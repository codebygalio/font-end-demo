<template>
<div class="home-banner">
<clCarousel :sliders="sliders" auto-play/>
</div>
</template>
<script>
import { findBanner } from '@/api/home'
import { ref } from 'vue'
export default {
  name: 'HomeBanner',
  setup () {
    const sliders = ref([])
    findBanner().then(data => {
      sliders.value = data.result
      //   console.log('HomeBanner=', data)
    })
    return { sliders }
  }
}
</script>
<style lang="scss" scoped>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98
}
.cl-carousel {
  ::v-deep .carousel-btn.prev {
    left: 270px;
  }
  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
}
</style>
