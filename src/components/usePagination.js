import { reactive, toRefs } from 'vue'

export function usePagination(fetchFn, initialParams = {}) {
  const state = reactive({
    pageNum: 1,
    pageSize: 10,
    total: 0,
    data: [],
    loading: false,
    params: { ...initialParams }
  })

  const loadData = async () => {
    state.loading = true
    try {
      const result = await fetchFn({
        pageNum: state.pageNum,
        pageSize: state.pageSize,
        ...state.params
      })
      // 假设后端返回 PageResult 结构 { total, rows }
      state.data = result.rows || []
      state.total = result.total || 0
    } catch (error) {
      console.error('加载数据失败', error)
    } finally {
      state.loading = false
    }
  }

  const handleSizeChange = (val) => {
    state.pageSize = val
    loadData()
  }

  const handleCurrentChange = (val) => {
    state.pageNum = val
    loadData()
  }

  const refresh = () => {
    state.pageNum = 1
    loadData()
  }

  const search = (params) => {
    state.params = { ...state.params, ...params }
    refresh()
  }

  return {
    ...toRefs(state),
    loadData,
    handleSizeChange,
    handleCurrentChange,
    refresh,
    search
  }
}