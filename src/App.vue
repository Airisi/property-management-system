<template>
  <div id="app">
    <!-- 导航栏组件 -->
    <Navbar />

    <!-- 路由视图 -->
    <!-- router-view 用于显示基于当前路由的组件 -->
    <router-view />

    <!-- 页面底部 -->
    <footer class="footer">
      版权所有 © 2023 我的物业管理系统
    </footer>
  </div>
</template>

<script>
// 导入 Navbar 组件
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    // 注册 Navbar 组件，以便在模板中使用
    Navbar
  }
};
</script>

<style>
/* 应用的全局样式 */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
