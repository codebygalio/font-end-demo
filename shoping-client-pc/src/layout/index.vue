<template>
<div class="layout-container">
    <appNavbar/>
    <appHeaderSticky/>
    <appHeaders/>
    <div class="app-body">
        <router-view/>
    </div>
    <appFooter/>

</div>
</template>
<script>
import appHeaderSticky from '@/components/app-header-sticky'
import appFooter from '@/components/app-footer'
import appHeaders from '@/components/app-headers.vue'
import appNavbar from '@/components/app-navbar.vue'
import { useStore } from 'vuex'

export default {
  components: {
    appNavbar,
    appHeaders,
    appFooter,
    appHeaderSticky
  },
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>
<style lang="scss" scoped>
.app-body{
    background: rgb(244, 244, 244);
// min-height: 600px;
}
</style>
