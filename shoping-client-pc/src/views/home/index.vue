<template>
<div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <homeBanner/>
      </div>
  </div>
  <HomeNew/>
  <HomeHot/>
 <HomeBrand/>
 <HomeProduct/>
</template>
<script>
import homeBanner from './components/home-banner'
import HomeCategory from './components/home-category'
import HomeNew from './components/home-new'
import HomeHot from './components/home-hot'
import HomeBrand from './components/home-brand'
import HomeProduct from './components/home-product'
import { ref } from 'vue'
export default {
  components: {
    HomeProduct,
    HomeBrand,
    homeBanner,
    HomeCategory,
    HomeNew,
    HomeHot
  },
  setup () {
    const show = ref(true)
    return { show }
  }
}
</script>
<style lang="scss" scoped>
.box{
    width: 100px;
    height: 100px;
    background: red;
}

.home-container{
    @include hoverShadow;
}

</style>
