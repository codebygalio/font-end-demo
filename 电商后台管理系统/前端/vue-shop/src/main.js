import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './style/index.scss'
import 'normalize.css/normalize.css'



import { Button, Form, FormItem, Input, Message, Container, Main, Aside, Header, Menu, Submenu, MenuItem, Breadcrumb, BreadcrumbItem, Card, Icon, Row, Col, Table, TableColumn, Switch, Tooltip, 
Tag, MessageBox, Dialog, Tree, Pagination, Cascader, Alert, Tabs, TabPane, Steps, Step, CheckboxGroup, Checkbox, Upload, Timeline, TimelineItem } from 'element-ui';
import './assets/fonts/iconfont.css'
import request from './utils/request'

import ZkTable from 'vue-table-with-tree-grid'


Vue.component('tree-table', ZkTable)


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
Vue.use(Pagination)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Steps)
Vue.use(Step)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Upload)
Vue.use(Timeline)
Vue.use(TimelineItem)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm;




new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
