import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/utils/dayjs'
import './assets/globalStyle.scss'

import Vant from  './components/Vant/index'
Vue.use(Vant)
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
