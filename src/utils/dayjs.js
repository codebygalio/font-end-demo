import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

// 多久前
Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
})


// console.log(dayjs().format('DD/MM/YYYY'))