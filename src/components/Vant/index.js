import { Button, NavBar, Form, Field, Toast, CountDown, Tabbar, TabbarItem, Image as VanImage, Grid, GridItem, Cell, Dialog, Tab, Tabs, List, PullRefresh, Popup, Icon, Search, Loading, Picker, DatetimePicker   } from 'vant';

export default  {
install: function(Vue){
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(CountDown)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(VanImage)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Cell)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Popup)
Vue.use(Icon)
Vue.use(Search)
Vue.use(Loading)
Vue.use(Picker)
Vue.use(DatetimePicker)

Vue.prototype.$Dialog = Dialog


Vue.prototype.$toast = Toast
}   
}