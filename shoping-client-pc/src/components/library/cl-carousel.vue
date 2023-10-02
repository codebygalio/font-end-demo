<template>
  <div class='cl-carousel' @mouseenter="stop()" @mouseleave="start()">
    <ul class="carousel-body">
      <li class="carousel-item"  v-for="(slider,index) in sliders" :key="slider.id" :class="{fade: index == currIndex}">
        <RouterLink v-if="slider.imgUrl" to="/">
          <img :src="slider.imgUrl" alt="">
        </RouterLink>
              <div v-else class="slider">
          <RouterLink v-for="goods in slider" :key="goods.id" :to="`/product/${goods.id}`">
          <img :src="goods.picture" alt="">
          <p class="name ellipsis">{{goods.name}}</p>
          <p class="price">&yen;{{goods.price}}</p>
         </RouterLink>
              </div>
      </li>
    </ul>
    <a @click="toggle(-1)" href="javascript:;" class="carousel-btn prev"><i class="iconfont icon-angle-left"></i></a>
    <a @click="toggle(+1)" href="javascript:;" class="carousel-btn next"><i class="iconfont icon-angle-right"></i></a>
    <div class="carousel-indicator">
      <span @click="currIndex = index" v-for="(slider, index) in sliders" :key="slider.id" :class="{active:index == currIndex}"></span>
    </div>
  </div>
</template>

<script>
import { onUnmounted, ref, watch } from 'vue'
export default {
  name: 'clCarousel',
  props: {
    sliders: {
      type: Array,
      default: () => ([])
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  setup (props) {
    // console.log('insite=sliders', props.sliders)
    const currIndex = ref(0)
    let timer = null
    const autoPlayFn = () => {
      clearInterval(timer)
      timer = setInterval(() => {
        currIndex.value++
        if (currIndex.value >= props.sliders.length) {
          currIndex.value = 0
        }
      }, props.duration)
    }
    watch(() => props.sliders, (newVal) => {
      if (newVal.length && props.autoPlay) {
        autoPlayFn()
      }
    }, { immediate: true })
    const stop = () => {
      if (timer) clearInterval(timer)
    }
    const start = () => {
      if (props.sliders.length && props.autoPlay) {
        autoPlayFn()
      }
    }
    const toggle = (step) => {
      currIndex.value += step
      if (currIndex.value < 0) currIndex.value = props.sliders.length - 1
      if (currIndex.value > props.sliders.length - 1) currIndex.value = 0
    }
    onUnmounted(() => {
      clearInterval(timer)
    })
    return { currIndex, stop, start, toggle }
  }
}
</script>
<style scoped lang="scss">
.cl-carousel{
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel{
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0,0,0,0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background:  #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0,0,0,.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev{
        left: 20px;
      }
      &.next{
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
  .slider{
    display: flex;
    justify-content: space-around;
    padding: 0 40px;
    > a{
        width: 240px;
        text-align: center;
    }
    img{
        padding: 20px;
        width: 230px !important;
        height: 230px !important;
    }
    .name{
        font-size: 16px;
        color: #666;
        padding: 0 40px;
    }
    .price{
        font-size: 16px;
        color: $priceColor;
        margin-top: 15px;
    }
}
}

</style>
