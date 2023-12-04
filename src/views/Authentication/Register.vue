<template>
    <div class="register-container">
      <div class="register-box">
        <h1 class="title">注册账号</h1>
        <form @submit.prevent="register">
          <!-- 用户名输入框 -->
          <div class="form-group">
            <label for="username">用户名</label>
            <input
              type="text"
              id="username"
              v-model="form.username"
              required
              placeholder="输入用户名"
            />
          </div>
  
          <!-- 密码输入框 -->
          <div class="form-group">
            <label for="password">密码</label>
            <input
              type="password"
              id="password"
              v-model="form.password"
              required
              placeholder="输入密码"
            />
          </div>
  
          <!-- 提交按钮 -->
          <div class="form-group">
            <button type="submit">注册</button>
          </div>
  
          <!-- 错误消息显示 -->
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  const apiBaseUrl = process.env.VUE_APP_API_BASE_URL; // 使用环境变量定义 API 基地址
  
  export default {
    data() {
      return {
        form: {
          username: 'admin',
          password: '123',
          role: 'ROLE_USER',
          contact: 'admin@example.com'
        },
        errorMessage: '' // 用于显示错误消息
      };
    },
    methods: {
      async register() {
        this.errorMessage = ''; // 重置错误消息
        try {
          // 发送注册请求到后端API
          const response = await axios.post(`${apiBaseUrl}/users/register`, this.form);
          console.log('注册成功', response.data);
  
          // 注册成功后的逻辑，比如跳转到登录页面
          this.$router.push('/login');
        } catch (error) {
          console.error('注册失败', error);
          // 显示错误消息
          this.errorMessage = error.response.data.message || '注册失败，请稍后重试';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f7f6;
  }
  
  .register-box {
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    width: 400px;
  }
  
  .title {
    text-align: center;
    color: #333;
    margin-bottom: 2rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: .5rem;
    color: #666;
  }
  
  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  button {
    width: 100%;
    background-color: #0056b3;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #003d82;
  }
  
  .error-message {
    color: red;
    text-align: center;
  }
  </style>
  