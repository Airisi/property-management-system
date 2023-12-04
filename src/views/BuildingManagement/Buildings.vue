<template>
    <div class="buildings-container">
      <h1>楼栋信息</h1>
      <div v-if="loading">加载中...</div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <ul v-if="buildings.length">
        <li v-for="building in buildings" :key="building.id">
          <h3>{{ building.name }}</h3>
          <p>{{ building.description }}</p>
          <!-- 可以添加更多的楼栋信息显示 -->
        </li>
      </ul>
      <div v-if="!buildings.length && !loading">没有楼栋信息。</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        buildings: [], // 存储楼栋信息
        loading: false, // 加载状态标志
        errorMessage: '' // 错误消息
      };
    },
    created() {
      this.fetchBuildings();
    },
    methods: {
      async fetchBuildings() {
        this.loading = true;
        this.errorMessage = '';
        try {
          // 请求后端API获取楼栋信息
          const response = await axios.get(process.env.VUE_APP_API_BASE_URL+'/buildings');
          this.buildings = response.data; // 存储楼栋信息
        } catch (error) {
          console.error('获取楼栋信息失败', error);
          this.errorMessage = '获取楼栋信息失败，请稍后重试';
        } finally {
          this.loading = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .buildings-container {
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
  
  .error-message {
    color: red;
    text-align: center;
  }
  </style>
  