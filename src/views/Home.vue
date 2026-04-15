<template>
  <div class="home">
    <el-card>
      <h2>欢迎回来，{{ userStore.user?.username }}！</h2>
      <p>这里是问卷调查系统首页，你可以：</p>
      <el-row :gutter="20" style="margin-top: 20px">
        <el-col :span="8">
          <el-card shadow="hover" @click="$router.push('/questionnaire/list')">
            <div class="card-content">
              <el-icon :size="40"><Document /></el-icon>
              <h3>我的问卷</h3>
              <p>查看和管理你创建的问卷</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" @click="$router.push('/questionnaire/create')">
            <div class="card-content">
              <el-icon :size="40"><Edit /></el-icon>
              <h3>创建问卷</h3>
              <p>快速创建一份新的问卷</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" @click="$router.push('/profile')">
            <div class="card-content">
              <el-icon :size="40"><User /></el-icon>
              <h3>个人中心</h3>
              <p>查看和编辑个人信息</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { Document, Edit, User } from '@element-plus/icons-vue'

const userStore = useUserStore()
</script>

<style scoped>
.home {
  padding: 20px;
}
.card-content {
  text-align: center;
  padding: 20px 0;
  cursor: pointer;
}
.card-content h3 {
  margin: 10px 0;
}
.card-content p {
  color: #666;
  font-size: 14px;
}
</style>