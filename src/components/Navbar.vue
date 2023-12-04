<template>
    <nav class="navbar">
      <div class="navbar-brand">物业管理系统</div>
      <ul class="navbar-nav">
        <li><router-link to="/">首页</router-link></li>
        <li><router-link to="/communities">小区管理</router-link></li>
        <li><router-link to="/buildings">楼宇管理</router-link></li>
        <li><router-link to="/users">用户管理</router-link></li>
        <li><router-link to="/bills">账单管理</router-link></li>
        <li><router-link to="/maintenance">维修请求</router-link></li>
        <li><router-link to="/complaints">投诉管理</router-link></li>
        <!-- 更多导航项 -->
      </ul>
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
  </template>
  
  <script>
  import { mapState, mapActions  } from 'vuex';

  export default {
    name: 'Navbar',
    computed: {
      ...mapState('user', ['user', 'isAuthenticated']),
    },
    methods: {
      ...mapActions ('user', ['logout']),
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
  
  .navbar-brand {
    font-size: 1.5rem;
  }
  
  .navbar-nav {
    list-style: none;
    display: flex;
  }
  
  .navbar-nav li {
    margin: 0 1rem;
  }
  
  .navbar-nav li a {
    color: white;
    text-decoration: none;
  }
  
  .navbar-login a {
    color: white;
    text-decoration: none;
    margin-left: 1rem;
  }
  </style>
  