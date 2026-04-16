<template>
  <div class="questionnaire-list">
    <el-card>
      <template #header>
        <div class="header">
          <span>我的问卷</span>
          <el-button type="primary" @click="$router.push('/questionnaire/create')">
            创建问卷
          </el-button>
        </div>
      </template>
      <p>问卷列表（待实现）</p>
    </el-card>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>