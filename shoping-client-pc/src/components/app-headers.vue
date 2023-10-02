<template>
  <header class='app-header'>
    <div class="container">
      <h1 class="logo"><RouterLink to="/">小兔鲜</RouterLink></h1>
      <appHeaderNav/>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜">
      </div>
        <AppHeaderCart/>
    </div>
  </header>
</template>

<script>
import appHeaderNav from './app-header-nav.vue'
import AppHeaderCart from '@/components/app-header-cart.vue'
export default {
  components: {
    appHeaderNav,
    AppHeaderCart
  },
  name: 'AppHeader',
  setup () {

  }
}
</script>

<style scoped lang='scss'>
.app-header {
  background: #fff;
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url(../assets/images/logo.svg) no-repeat center  / auto 100%;
    }
  }

  .search {
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;
    .icon-search {
      font-size: 18px;
      margin-left: 5px;
    }
    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
  }

}
</style>
