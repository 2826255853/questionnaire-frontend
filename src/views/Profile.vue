<template>
  <div class="profile">
    <el-card>
      <template #header>
        <span>个人中心</span>
      </template>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="用户名">
          {{ userStore.user?.username }}
        </el-descriptions-item>
        <el-descriptions-item label="邮箱">
          {{ userStore.user?.email }}
        </el-descriptions-item>
        <el-descriptions-item label="注册时间">
          {{ formatDateTime(userStore.user?.createTime) }}
        </el-descriptions-item>
        <el-descriptions-item label="角色">
          {{ userStore.isAdmin ? '管理员' : '普通用户' }}
        </el-descriptions-item>
      </el-descriptions>
      <div style="margin-top: 20px">
        <el-button type="danger" @click="handleDeleteAccount">注销账号</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { formatDateTime } from '@/utils/dateFormat'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { deleteUser } from '@/api/user'

const userStore = useUserStore()
const router = useRouter()

const handleDeleteAccount = async () => {
  try {
    await ElMessageBox.confirm(
      '注销后所有数据将被永久删除，确定继续吗？',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    // 调用删除用户接口
    await deleteUser(userStore.user.id)
    ElMessage.success('账号已注销')
    await userStore.logout()
    router.push('/login')
  } catch (error) {
    // 用户取消操作或注销失败
    if (error !== 'cancel' && error !== 'close') {
      ElMessage.error(error?.message || '注销失败，请重试')
    }
  }
}
</script>

<style scoped>
.profile {
  padding: 20px;
}
</style>