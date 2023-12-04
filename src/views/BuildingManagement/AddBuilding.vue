<template>
    <div class="add-building-container">
      <h1>添加楼栋</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">楼栋名称</label>
          <input type="text" id="name" v-model="form.name" required>
        </div>
  
        <div class="form-group">
          <label for="description">描述</label>
          <textarea id="description" v-model="form.description"></textarea>
        </div>
  
        <div class="form-group">
          <button type="submit">添加楼栋</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        form: {
          name: '', // 楼栋名称
          description: '' // 楼栋描述
        }
      };
    },
    methods: {
      async submitForm() {
        try {
          // 发送请求到后端API添加楼栋
          await axios.post(process.env.VUE_APP_API_BASE_URL+'/buildings', this.form);
          alert('楼栋添加成功');
          this.form.name = '';
          this.form.description = '';
        } catch (error) {
          console.error('添加楼栋失败', error);
          alert('添加楼栋失败，请稍后重试');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .add-building-container {
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: .5rem;
  }
  
  input[type="text"],
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  button {
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
  </style>
  