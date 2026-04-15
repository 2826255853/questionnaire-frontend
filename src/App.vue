<template>
  <div id="app">
    <el-container class="layout-container">
      <el-header class="layout-header">
        <div class="logo" @click="$router.push('/')">问卷调查系统</div>
        <el-menu
          mode="horizontal"
          :router="true"
          :default-active="$route.path"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/questionnaire/list">我的问卷</el-menu-item>
          <el-menu-item v-if="userStore.isAdmin" index="/admin">管理后台</el-menu-item>
        </el-menu>
        <div class="user-info">
          <el-dropdown v-if="userStore.isLoggedIn" @command="handleCommand">
            <span class="el-dropdown-link">
              {{ userStore.user?.username }}
              <el-icon><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button v-else type="text" @click="$router.push('/login')">登录</el-button>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'

const userStore = useUserStore()
const router = useRouter()

const handleCommand = (command) => {
  if (command === 'profile') {
    router.push('/profile')
  } else if (command === 'logout') {
    userStore.logout()
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.layout-container {
  min-height: 100vh;
}
.layout-header {
  display: flex;
  align-items: center;
  background-color: #545c64;
  color: #fff;
  padding: 0 20px;
  .logo {
    font-size: 20px;
    font-weight: bold;
    margin-right: 30px;
    cursor: pointer;
  }
  .el-menu {
    flex: 1;
    border-bottom: none;
  }
  .user-info {
    margin-left: auto;
    .el-dropdown-link {
      color: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
    }
  }
}
</style>