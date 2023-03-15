import Layout from '@/layout/index.vue'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: HomeView,
        name: 'home',
        meta: {
          title: '主页',
          icon: 'el-icon-s-home'
        }
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/AboutView.vue'),
        meta: {
          title: '关于',
          icon: 'el-icon-s-custom'
        }
      }
    ]
  }
]

export default routes
