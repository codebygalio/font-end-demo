import { RouterView, createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
import { h } from 'vue'

const routes = [
  {
    path: '/',
    component: () => import('@/layout'),
    children: [
      {
        path: '/',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/category/:id',
        component: () => import('@/views/category/index.vue')
      },
      {
        path: '/category/sub/:id',
        component: () => import('@/views/category/subCategory.vue')
      },
      {
        path: '/product/:id',
        component: () => import('@/views/goods/index.vue')
      },
      {
        path: '/cart',
        component: () => import('@/views/cart')
      },
      {
        path: '/member/checkout',
        component: () => import('@/views/member/pay/checkout.vue')
      },
      {
        path: '/member/pay',
        component: () => import('@/views/member/pay/index.vue')
      },
      {
        path: '/pay/callback',
        component: () => import('@/views/member/pay/result.vue')
      },
      {
        path: '/member',
        component: () => import('@/views/member/Layout.vue'),
        children: [
          { path: '/member', component: () => import('@/views/member/home/index.vue') },
          {
            path: '/member/order',
            component: { render: () => h(RouterView) },
            children: [
              { path: '/member/order', component: () => import('@/views/member/order/index.vue') },
              { path: '/member/order/:id', component: () => import('@/views/member/order/detail.vue') }
            ]

          }

        ]
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/login/callback',
    component: () => import('@/views/login/callback')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior () {
    return { left: 0, top: 0 }
  }
})
router.beforeEach((to, from, next) => {
  const { profile } = store.state.user
  if (!profile.token && to.path.startsWith('/member')) {
    return next('/login?redrirectUrl=' + encodeURIComponent(to.fullPath))
  }
  next()
})

export default router
