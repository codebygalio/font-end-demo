import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookie from 'js-cookie'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import zhLang from './zh'
import enLang from './en'

Vue.use(VueI18n)
export default new VueI18n({
    locale: Cookie.get('lang') || 'zh',
    messages: {
        zh: {
            ...zhLocale,
            ...zhLang
        },
        en: {
            test:'mytest',
            ...enLocale,
            ...enLang
        }
    }
})