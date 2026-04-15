import request from './request'

// 创建问卷
export const createQuestionnaire = (data) => {
  return request.post('/questionnaire/create', data)
}

// 获取我的问卷列表（分页）
export const listMyQuestionnaires = (params) => {
  return request.get('/questionnaire/list', { params })
}

// 获取问卷详情
export const getQuestionnaireDetail = (id) => {
  return request.get(`/questionnaire/${id}`)
}

// 更新问卷
export const updateQuestionnaire = (data) => {
  return request.put('/questionnaire/update', data)
}

// 删除问卷
export const deleteQuestionnaire = (id) => {
  return request.delete(`/questionnaire/delete/${id}`)
}

// 搜索问卷
export const searchQuestionnaires = (params) => {
  return request.get('/questionnaire/search', { params })
}

// 提交答案
export const submitAnswer = (data) => {
  return request.post('/questionnaire/answer/submit', data)
}

// 获取统计信息
export const getStatistics = (id) => {
  return request.get(`/questionnaire/statistics/${id}`)
}