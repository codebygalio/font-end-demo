import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routers = new VueRouter({
  routes:[
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import('../views/Login')
    },
    {
      path: '/home',
      component: () => import('../views/Home'),
      redirect: '/home/welcome',
      children:[
        {
          path: 'welcome',
          component:() => import('../views/Welcome')
        },
        {
          path: '/rights',
          component:()=> import('../components/power/Rights')
        },
        
      ]
    },
    {
      path:'',
      component: () => import('../views/Home'),
      name:'用户管理',
      children:[
        {
          path: '/users',
          name:'用户列表',
          component:() => import('../views/Users')
        },

      ]
    },
    {
      path:'',
      component: () => import('../views/Home'),
      name:'权限管理',
      children:[
        {
          path: '/roles',
          name:'角色列表',
          component:()=> import('../components/power/Roles'),
        }
      ]
    },
    {
      path:'',
      component: () => import('../views/Home'),
      name:'商品管理',
      children:[
        {
          path: '/categories',
          name:'商品分类',
          component:()=> import('../views/Categories'),
        }
      ]
    }
  ]
})

routers.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
 

export default routers