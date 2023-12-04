<template>
  <div class="test-page-container">
    <h1 class="page-title">功能测试页面</h1>
    <div class="navigation">
      <h2>导航到各功能页面：</h2>
      <ul class="nav-list">
        <li><router-link to="/login">登录</router-link></li>
        <li><router-link to="/register">注册</router-link></li>
        <li><router-link to="/communities">社区管理</router-link></li>
        <li><router-link to="/buildings">建筑管理</router-link></li>
        <li><router-link to="/users">用户管理</router-link></li>
        <li><router-link to="/bills">账单管理</router-link></li>
        <li><router-link to="/maintenance">维修请求管理</router-link></li>
        <li><router-link to="/complaints">投诉管理</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "TestPage"
};
</script>

<style scoped>
.test-page-container {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.page-title {
  color: #333;
  text-align: center;
}

.navigation {
  margin-top: 20px;
}

.nav-list {
  list-style-type: none;
  padding: 0;
}

.nav-list li {
  margin: 10px 0;
}

.nav-list li a {
  color: #007bff;
  text-decoration: none;
  font-size: 18px;
}

.nav-list li a:hover {
  text-decoration: underline;
}
</style>
