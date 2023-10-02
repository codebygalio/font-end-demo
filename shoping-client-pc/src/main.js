import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/styles.scss'
import UI from '@/components/library'

import '@/mock'

createApp(App).use(store).use(router).use(UI).mount('#app')
