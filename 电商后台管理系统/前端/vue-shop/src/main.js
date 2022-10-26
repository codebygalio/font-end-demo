import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './style/index.scss'
import 'normalize.css/normalize.css'

import { Button, Form, FormItem, Input, Message, Container, Main, Aside, Header, Menu, Submenu, MenuItem, Breadcrumb, BreadcrumbItem, Card, Icon, Row, Col, Table, TableColumn, Switch, Tooltip, 
Tag, MessageBox, Dialog, Tree} from 'element-ui';
import './assets/fonts/iconfont.css'
import request from './utils/request'


Vue.config.productionTip = false
Vue.prototype.$http = request
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(Tree)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm;




new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
