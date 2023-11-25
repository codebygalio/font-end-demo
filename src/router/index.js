import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'
import { getUserInfo } from "@/api/user";
import { Toast } from 'vant'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  
  {
    path: '/login',
    name: 'Login' ,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( '@/views/Login'),
  },
  {
    path: '/',
    // name: 'Layout' ,
    component: () => import('@/views/Layout'),
    children: [
        {
            path: '',
            name: 'Home',
            component:() => import('@/views/Home'),
            meta:{
                keepAlive: true
            }
        },
        {
            path: '/qa',
            name: 'Qa',
            component:() =>  import('@/views/Qa')
        },
        {
            path: '/video',
            name: 'Video',
            component:() =>  import('@/views/Video')
        },
        {
            path: '/my',
            name: 'My',
            component:() =>  import('@/views/My')
        },
    ]
  },
  {
    path: '/search',
    name: 'Search' ,
    component: () => import( '@/views/Search'),
  },
  {
    path: '/article/:articleId',
    name: 'Article' ,
    component: () => import( '@/views/Article/index'),
    props: true
  },
  {
    path: '/profile',
    name: 'Profile' ,
    component: () => import( '@/views/Profile'),
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import( '@/views/My/chat'),
    meta:{
        needLogin:true
    }
  }
 
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach(async (to, from, next) => {
    if(to.meta.needLogin){
        const info = store.state.user
        if(info.userTokens){
            if(!info.userInfo){
                const { data } = await getUserInfo();
                store.commit('setUserInfo',data)
            }
            next()
        }else{
            Toast.fail('请先登录')    
        }
    }else{
        next()
    }
    
})

export default router
