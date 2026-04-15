import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as loginApi, getUserInfo, logout as logoutApi } from '@/api/user'
import router from '@/router'

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref(null) // { id, username, email, role, createTime }

  // Getters
  const isLoggedIn = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 1)

  // Actions
  const setUser = (userData) => {
    user.value = userData
  }

  const clearUser = () => {
    user.value = null
  }

  const login = async (username, password) => {
    try {
      const userData = await loginApi(username, password)
      setUser(userData)
      ElMessage.success('登录成功')
      router.push('/')
      return true
    } catch (error) {
      return false
    }
  }

  const fetchUser = async () => {
    try {
      const userData = await getUserInfo()
      setUser(userData)
    } catch (error) {
      clearUser()
    }
  }

  const logout = async () => {
    try {
      await logoutApi()
    } catch (error) {
      // 即使接口失败也清除前端状态
    } finally {
      clearUser()
      router.push('/login')
      ElMessage.success('已退出登录')
    }
  }

  return {
    user,
    isLoggedIn,
    isAdmin,
    setUser,
    clearUser,
    login,
    fetchUser,
    logout
  }
})