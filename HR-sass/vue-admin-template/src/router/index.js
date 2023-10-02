import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const asyncRoutes = [
  {
    path: '/departments',
    name: 'departments',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Departments',
        component: () => import('@/views/departments'),
        meta: {
            name: 'departments',
          title: '组织架构',
          icon: 'tree'
        }
      }
    ]
  },
  {
    path: '/employees',
    name: 'employees',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Employees',
        component: () => import('@/views/employees'),
        meta: {
            name: 'employees',
          title: '员工管理',
          icon: 'people'
        }
      },
      {
        path: 'detail/:id',
        component: () => import('@/views/detail'),
        hidden: true,
        meta: {
            title: '员工详情'
        }
      },
      {
        path: 'print/:id',
        component: () => import('@/views/employees/print.vue'),
        hidden: true,
        meta: {
            title: '员工打印'
        }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    name: 'settings',
    children: [
      {
        path: '',
        name: 'Setting',
        component: () => import('@/views/setting'),
        meta: {
            name: 'settings',
          title: '公司设置',
          icon: 'setting'
        }
      }
    ]
  },
  {
    path: '/solarys',
    component: Layout,
    name: 'solarys',
    children: [
      {
        path: '',
        name: 'Solarys',
        component: () => import('@/views/solarys'),
        meta: {
            name: 'solarys',
          title: '工资',
          icon: 'money'
        }
      }
    ]
  },
  {
    path: '/social',
    component: Layout,
    name: 'social_securitys',
    children: [
      {
        path: '',
        name: 'Social',
        component: () => import('@/views/social'),
        meta: {
            name: 'social',
          title: '社保',
          icon: 'table'
        }
      }
    ]
  },
  {
    path: '/attendances',
    component: Layout,
    name: 'attendances',
    children: [
      {
        path: '',
        name: 'Attendances',
        component: () => import('@/views/attendances'),
        meta: {
            name: 'attendances',
          title: '考勤',
          icon: 'skill'
        }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    name: 'permissions',
    children: [
      {
        path: '',
        name: 'Permission',
        component: () => import('@/views/permission'),
        meta: {
            name:'permissions',
          title: '权限管理',
          icon: 'lock'
        }
      }
    ]
  },
  {
    path: '/approvals',
    component: Layout,
    name: 'approvals',
    children: [
      {
        path: '',
        name: 'Approvals',
        component: () => import('@/views/approvals'),
        meta: {
            name:'approvals',
          title: '审批',
          icon: 'tree-table'
        }
      },
      {
        path: 'salaryApproval/:id',
        component: () => import('@/views/approvals/salary'),
        name: 'salaryApproval',
        hidden: true,
        meta: {
          title: '工资审核',
          icon: 'approval', noCache: true }
      },
      {
        path: 'enterApproval/:id',
        component: () => import('@/views/approvals/enter'),
        name: 'enterApproval',
        hidden: true,
        meta: {
          title: '入职审核',
          icon: 'approval', noCache: true }
      },
      {
        path: 'leaveApproval/:id',
        component: () => import('@/views/approvals/leave'),
        name: 'leaveApproval',
        hidden: true,
        meta: {
          title: '申请请假',
          icon: 'approval', noCache: true }
      },
      {
        path: 'quitApproval/:id',
        component: () => import('@/views/approvals/quit'),
        name: 'quitApproval',
        hidden: true,
        meta: {
          title: '申请离职',
          icon: 'approval', noCache: true }
      },
      {
        path: 'overtimeApproval/:id',
        component: () => import('@/views/approvals/overtime'),
        name: 'overtimeApproval',
        hidden: true,
        meta: {
          title: '加班申请',
          icon: 'approval', noCache: true }
      },
      {
        path: 'securitySetting',
        component: () => import('@/views/approvals/security'),
        name: 'securitySetting',
        hidden: true,
        meta: {
          title: '设置',
          icon: 'approval', noCache: true }
      }
    ]
  }
]

export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
          {
            path: '/redirect/:path(.*)',
            component: () => import('@/views/redirect/index')
          }
        ]
      },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {name: 'dashboard', title: 'Dashboard', icon: 'dashboard' }
    }
]
  },
  {
    path: '/import',
    component: Layout,
    hidden: true,
    children: [{
        path: '',
        component: ()=> import('@/views/import')
    }]
  }


  // 404 page must be placed at the end !!!
  
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  base: '/hr/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
