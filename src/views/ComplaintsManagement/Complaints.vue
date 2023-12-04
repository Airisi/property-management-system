<template>
    <div class="complaints-container">
      <h1>投诉管理</h1>
  
      <!-- 提交新投诉的表单 -->
      <div class="form-container">
        <h2>提交投诉</h2>
        <form @submit.prevent="submitComplaint">
          <div class="form-field">
            <label for="description">投诉描述</label>
            <input type="text" id="description" v-model="newComplaint.description" placeholder="描述您的投诉" required />
          </div>
          <div class="form-field">
            <label for="date">投诉日期</label>
            <input type="date" id="date" v-model="newComplaint.complaintDate" required />
          </div>
          <button type="submit" class="submit-button">提交</button>
        </form>
      </div>
  
      <!-- 展示所有投诉 -->
      <div v-if="complaints.length" class="complaints-list">
        <h2>所有投诉</h2>
        <div class="complaint-item" v-for="complaint in complaints" :key="complaint.id">
          <p>{{ complaint.description }}</p>
          <div class="actions">
            <button @click="getComplaintDetails(complaint.id)">查看详情</button>
            <button @click="deleteComplaint(complaint.id)">删除</button>
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
        complaints: [], // 存储所有投诉
        newComplaint: {
          user: '', // 用户名
          description: '',
          status: 'ing',
          complaintDate: new Date().toISOString().slice(0, 10) // 今天的日期
        }
      };
    },
    methods: {
      // 获取所有投诉
      async fetchComplaints() {
        try {
          const response = await axios.get(process.env.VUE_APP_API_BASE_URL + '/complaints');
          this.complaints = response.data;
        } catch (error) {
          console.error('获取投诉时出错:', error);
        }
      },
      // 提交新投诉
      async submitComplaint() {
        try {
          await axios.post(process.env.VUE_APP_API_BASE_URL + '/complaints', this.newComplaint);
          this.fetchComplaints(); // 刷新投诉列表
        } catch (error) {
          console.error('提交投诉时出错:', error);
        }
      },
      // 获取单个投诉详情
      async getComplaintDetails(complaintId) {
        try {
          const response = await axios.get(process.env.VUE_APP_API_BASE_URL + `/complaints/${complaintId}`);
          console.log('投诉详情:', response.data);
          // 处理响应数据
        } catch (error) {
          console.error('获取投诉详情时出错:', error);
        }
      },
      // 删除单个投诉
      async deleteComplaint(complaintId) {
        try {
          await axios.delete(process.env.VUE_APP_API_BASE_URL + `/complaints/${complaintId}`);
          this.fetchComplaints(); // 刷新投诉列表
        } catch (error) {
          console.error('删除投诉时出错:', error);
        }
      }
    },
    mounted() {
      this.fetchComplaints();
    }
  };
  </script>
  
  <style scoped>
  .complaints-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background: #f9f9f9;
  }
  
  .form-container, .complaints-list {
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
  
  .complaint-item {
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
  