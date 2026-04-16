import request from './request'

// 登录
export const login = (username, password) => {
  return request.post('/user/login', { username, password })
}

// 注册
export const register = (data) => {
  return request.post('/user/register', data)
}

// 获取当前用户信息
export const getUserInfo = () => {
  return request.get('/user/info')
}

// 退出登录
export const logout = () => {
  return request.post('/user/logout')
}

// 注销账号
export const deleteUser = (id) => {
  return request.delete(`/user/${id}`)
}