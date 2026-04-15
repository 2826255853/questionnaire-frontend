import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建 Axios 实例
const request = axios.create({
  baseURL: '/api', // 与 vite 代理配合，开发环境自动转发
  timeout: 10000,
  withCredentials: true // 携带 Cookie（Session 必需）
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 可在此添加全局 loading
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    const res = response.data
    // 后端统一返回格式 { code, message, data }
    if (res.code === 200 || res.code === undefined) {
      // 成功，返回 data 字段（若无则返回整个 res）
      return res.data !== undefined ? res.data : res
    } else {
      // 业务错误
      ElMessage.error(res.message || '请求失败')
      return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  error => {
    // HTTP 错误处理
    const { response } = error
    if (response) {
      switch (response.status) {
        case 401:
          ElMessage.error('登录已过期，请重新登录')
          // 清除用户状态并跳转登录页
          useUserStore().logout()
          router.push('/login')
          break
        case 403:
          ElMessage.error('没有权限访问')
          break
        case 404:
          ElMessage.error('请求的资源不存在')
          break
        case 500:
          ElMessage.error('服务器内部错误')
          break
        default:
          ElMessage.error(response.data?.message || `请求错误 ${response.status}`)
      }
    } else {
      ElMessage.error('网络连接异常')
    }
    return Promise.reject(error)
  }
)

export default request