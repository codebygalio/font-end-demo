// import { MessageBox, Message, Loading } from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import pageTools  from '@/components/pageTools/index.vue'
import uploadExcel from '@/components/uploadExcel'
import ThemePicker from './ThemePicker'

// 带注释

import ImageUpload from '@/components/ImageUpload'
import Print from 'vue-print-nb'
import TagsView from '@/layout/components/TagsView'

export default {
    install(Vue) {
        // Vue.prototype.$confirm = MessageBox.confirm
        // Vue.prototype.$message = Message
        // Vue.use(Loading.directive)
        Vue.component('pageTools',pageTools)
        Vue.component('uploadExcel',uploadExcel)
        Vue.component('ImageUpload',ImageUpload)
        Vue.use(Print)
        Vue.component('ThemePicker', ThemePicker)
        Vue.component('TagsView',TagsView)
    }
}