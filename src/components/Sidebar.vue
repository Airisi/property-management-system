<template>
  <div>
    <!-- 切换按钮 -->
    <button @click="toggleSidebar">Toggle Sidebar</button>

    <!-- 侧边栏 -->
    <div class="sidebar" :class="{ 'collapsed': sidebarCollapsed }">
      <!-- 可以在这里添加图标和其他内容 -->
      <div class="sidebar-item">图标</div>
      <div class="sidebar-item">菜单项1</div>
      <div class="sidebar-item">菜单项2</div>
      <!-- 更多菜单项 -->
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 主要内容 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarCollapsed: false, // 初始状态为未收起
    };
  },
  methods: {
    toggleSidebar() {
      // 切换侧边栏的收起状态
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 200px;
  height: 100%;
  background-color: #333;
  color: white;
  transition: width 0.3s; /* 添加过渡效果 */
}

.sidebar.collapsed {
  width: 50px; /* 当收起时，调整宽度为50px */
}

.sidebar-item {
  padding: 10px;
}

.main-content {
  margin-left: 200px; /* 保证主内容区域不被侧边栏遮挡 */
  transition: margin-left 0.3s; /* 添加过渡效果 */
}

.main-content.collapsed {
  margin-left: 50px; /* 当收起时，调整主内容区域的左边距为50px */
}

button {
  margin-bottom: 10px;
}
</style>
