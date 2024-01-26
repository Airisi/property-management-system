<template>
  <nav class="navbar">
    <div class="navbar-brand">系统</div>
    
    <div class="navbar-login">
      <template v-if="isAuthenticated">
        <span>{{ user.username }}</span> <!-- 显示用户名 -->
        <button @click="logout">登出</button> <!-- 登出按钮 -->
      </template>
      <template v-else>
        <router-link to="/login">登录</router-link>
        <router-link to="/register">注册</router-link>
      </template>
    </div>
  </nav>  

    <!-- Sidebar -->
    <div class="container" :class="{ 'collapsed': sidebarCollapsed }">
      <div class="sidebar">
        <ul class="sidebar-side">
          <button @click="toggleSidebar">三</button>
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/communities">小区管理</router-link></li>
          <li><router-link to="/users">用户管理</router-link></li>
          <li><router-link to="/bills">账单管理</router-link></li>
          <li><router-link to="/maintenance">维修请求</router-link></li>
          <li><router-link to="/complaints">投诉管理</router-link></li>
          <!-- 更多导航项 -->
        </ul>
      </div>

      <!-- 主要内容 -->
      <div class="main-content">
        <router-view />
      </div>
    </div>
      <!-- 页面底部 -->
      <footer class="footer">
        版权所有 © 2023 我的物业管理系统
    </footer>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Navbar',
  data() {
    return {
      sidebarCollapsed: false, // 初始状态为未收起
    };
  },
  computed: {
    ...mapState('user', ['user', 'isAuthenticated']),
  },
  methods: {
    ...mapActions('user', ['logout']),
    toggleSidebar() {
      // 切换侧边栏的收起状态
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },
  },
};
</script>

  <style scoped>
    .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    color: white;
    padding: 1rem;
  }

  .navbar button {
    background: white;
    border: none;
    font-size: 1rem;
    color: black;
    cursor: pointer;
  }
  
  .navbar-brand {
    font-size: 1.5rem;
  }
  
  .navbar-login a {
    color: white;
    text-decoration: none;
    margin-left: 1rem;
  }
  
  .container {
  display: flex;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  margin-left: 200px; /* 添加左边距，确保不会与侧边栏重叠 */
  transition: margin-left 0.3s; /* Add transition for margin-left */
}

.container.collapsed .main-content {
  margin-left: 50px; /* Adjust margin when sidebar is collapsed */
}

.container.collapsed .sidebar {
  width: 80px; /* 收起时的宽度 */
}

.sidebar {
  position: fixed; /* 添加固定定位 */
  left: 0; /* 将侧边栏固定在屏幕最左侧 */
  float: left;
  display: flex;
  flex-direction: column; /* 垂直排列 */
  align-items: cenleter; /* 居中对齐 */

  background-color: #333;
  color: white;
  width: 200px; /* 侧边栏宽度 */
  transition: width 0.3s; /* 过渡效果 */
}

.sidebar-side {
  list-style: none;
  padding: 0;
}

.sidebar-side li {
  margin: 50px 0; /* 调整垂直间距 */
}

.sidebar-side li a {
  color: white;
  text-decoration: none;
}

/* 底部样式 */
.footer {
  margin-top: 20px;
  padding: 10px;
  background-color: #f3f3f3;
  text-align: center;
  font-size: 14px;
  color: #666;
}
  </style>
  