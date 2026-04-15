import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

// 懒加载页面组件
const Login = () => import('@/views/Login.vue')
const Register = () => import('@/views/Register.vue')
const Home = () => import('@/views/Home.vue')
const Profile = () => import('@/views/Profile.vue')
const QuestionnaireList = () => import('@/views/Questionnaire/List.vue')
const QuestionnaireCreate = () => import('@/views/Questionnaire/Create.vue')
const QuestionnaireDetail = () => import('@/views/Questionnaire/Detail.vue')
const QuestionnaireStatistics = () => import('@/views/Questionnaire/Statistics.vue')
const AdminDashboard = () => import('@/views/Admin/Dashboard.vue')

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/questionnaire/list',
    name: 'QuestionnaireList',
    component: QuestionnaireList,
    meta: { requiresAuth: true }
  },
  {
    path: '/questionnaire/create',
    name: 'QuestionnaireCreate',
    component: QuestionnaireCreate,
    meta: { requiresAuth: true }
  },
  {
    path: '/questionnaire/edit/:id',
    name: 'QuestionnaireEdit',
    component: QuestionnaireCreate, // 复用创建组件
    meta: { requiresAuth: true }
  },
  {
    path: '/questionnaire/detail/:id',
    name: 'QuestionnaireDetail',
    component: QuestionnaireDetail,
    meta: { requiresAuth: false } // 答题页无需登录也可查看，但提交需登录
  },
  {
    path: '/questionnaire/statistics/:id',
    name: 'QuestionnaireStatistics',
    component: QuestionnaireStatistics,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // 如果本地没有用户信息但处于登录状态，尝试获取用户信息
  if (!userStore.user && userStore.isLoggedIn === undefined) {
    await userStore.fetchUser()
  }

  const isLoggedIn = userStore.isLoggedIn

  // 需要登录的页面
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
    return
  }

  // 已登录用户不能访问登录/注册页
  if (to.meta.requiresGuest && isLoggedIn) {
    next({ name: 'Home' })
    return
  }

  // 需要管理员权限
  if (to.meta.requiresAdmin && !userStore.isAdmin) {
    ElMessage.error('无管理员权限')
    next({ name: 'Home' })
    return
  }

  next()
})

export default router