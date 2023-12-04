<template>
    <div class="maintenance-container">
      <h1>维修请求管理</h1>
  
      <!-- 提交新维修请求的表单 -->
      <div class="form-container">
        <h2>提交维修请求</h2>
        <form @submit.prevent="submitMaintenanceRequest">
          <div class="form-field">
            <label for="description">维修描述</label>
            <input type="text" id="description" v-model="newRequest.description" placeholder="描述您的维修需求" required />
          </div>
          <div class="form-field">
            <label for="date">请求日期</label>
            <input type="date" id="date" v-model="newRequest.requestDate" required />
          </div>
          <button type="submit" class="submit-button">提交</button>
        </form>
      </div>
  
      <!-- 展示所有维修请求 -->
      <div v-if="maintenanceRequests.length" class="maintenance-list">
        <h2>所有维修请求</h2>
        <div class="maintenance-item" v-for="request in maintenanceRequests" :key="request.id">
          <p>{{ request.description }}</p>
          <div class="actions">
            <button @click="getMaintenanceDetails(request.id)">查看详情</button>
            <button @click="deleteMaintenanceRequest(request.id)">删除</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        maintenanceRequests: [], // 存储所有维修请求
        newRequest: {
          user: 'testUser', // 用户名
          description: '',
          status: 'ing',
          requestDate: new Date().toISOString().slice(0, 10) // 今天的日期
        }
      };
    },
    methods: {
      // 获取所有维修请求
      async fetchMaintenanceRequests() {
        try {
          const response = await axios.get(process.env.VUE_APP_API_BASE_URL + '/maintenance');
          this.maintenanceRequests = response.data;
        } catch (error) {
          console.error('获取维修请求时出错:', error);
        }
      },
      // 提交新维修请求
      async submitMaintenanceRequest() {
        try {
            console.log('维修请求详情:', this.newRequest);
          await axios.post(process.env.VUE_APP_API_BASE_URL + '/maintenance', this.newRequest);
          console.log('维修请求详情:', this.newRequest);
          this.fetchMaintenanceRequests(); // 刷新维修请求列表
        } catch (error) {
          console.error('提交维修请求时出错:', error);
        }
      },
      // 获取单个维修请求详情
      async getMaintenanceDetails(maintenanceId) {
        try {
          const response = await axios.get(process.env.VUE_APP_API_BASE_URL + `/maintenance/${maintenanceId}`);
          console.log('维修请求详情:', response.data);
          // 处理响应数据
        } catch (error) {
          console.error('获取维修请求详情时出错:', error);
        }
      },
      // 删除单个维修请求
      async deleteMaintenanceRequest(maintenanceId) {
        try {
          await axios.delete(process.env.VUE_APP_API_BASE_URL + `/maintenance/${maintenanceId}`);
          this.fetchMaintenanceRequests(); // 刷新维修请求列表
        } catch (error) {
          console.error('删除维修请求时出错:', error);
        }
      }
    },
    mounted() {
      this.fetchMaintenanceRequests();
    }
  };
  </script>
  
  <style scoped>
  .maintenance-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background: #f9f9f9;
  }
  
  .form-container, .maintenance-list {
    margin-bottom: 20px;
  }
  
  h1, h2 {
    color: #333;
  }
  
  .form-field {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input[type="text"], input[type="date"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .submit-button {
    background-color: #0056b3;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .submit-button:hover {
    background-color: #003d82;
  }
  
  .maintenance-item {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .actions {
    margin-top: 10px;
  }
  
  .actions button {
    margin-right: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  .actions button:hover {
    background-color: #388e3c;
  }
  </style>
  