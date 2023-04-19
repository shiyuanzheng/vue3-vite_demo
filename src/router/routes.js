const Layout = () => import('@/layout/index.vue')
const Login = () => import('@/views/login/index.vue')
const HomeView = () => import('../views/HomeView.vue')

const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('@/views/exception/404.vue')
    // beforeEnter(to, from, next) {
    //   // 拦截处理特殊业务场景
    //   // 如果, 重定向路由包含__双下划线, 为临时添加路由
    //   if (/__.*/.test(to.redirectedFrom)) {
    //     return next(to.redirectedFrom.replace(/__.*/, ''))
    //   }
    //   next()
    // }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'layout'
    // children: [
    //   {
    //     path: '/home',
    //     component: HomeView,
    //     name: 'home',
    //     meta: {
    //       title: '主页',
    //       icon: 'el-icon-s-home'
    //     }
    //   },
    //   {
    //     path: '/about',
    //     name: 'about',
    //     // route level code-splitting
    //     // this generates a separate chunk (About.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import('../views/AboutView.vue'),
    //     meta: {
    //       title: '关于',
    //       icon: 'el-icon-s-custom'
    //     }
    //   }
    // ]
  }
]

export default constantRouterMap
