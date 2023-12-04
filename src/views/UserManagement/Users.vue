<template>
    <div class="users-container">
      <h1>用户管理</h1>
      <table class="users-table">
        <thead>
          <tr>
            <th>用户名</th>
            <th>邮箱</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button @click="editUser(user)">编辑</button>
              <button @click="deleteUser(user.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        users: [] // 存储用户信息的数组
      };
    },
    mounted() {
      this.fetchUsers(); // 组件挂载时获取用户数据
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get(process.env.VUE_APP_API_BASE_URL+'/users');
          this.users = response.data; // 将获取到的用户数据赋值给 users
        } catch (error) {
          console.error('获取用户数据失败', error);
        }
      },
      editUser(user) {
        // 编辑用户的逻辑，可能需要跳转到编辑页面或者弹出一个表单
        console.log('编辑用户', user);
      },
      async deleteUser(userId) {
        // 删除用户的逻辑
        try {
          await axios.delete(process.env.VUE_APP_API_BASE_URL+`/users/${userId}`);
          alert('用户删除成功');
          this.fetchUsers(); // 重新获取用户数据
        } catch (error) {
          console.error('删除用户失败', error);
          alert('删除用户失败，请稍后重试');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .users-container {
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
  
  .users-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .users-table th, .users-table td {
    padding: 0.5rem;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  button {
    background-color: #0056b3;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 0.5rem;
  }
  
  button:hover {
    background-color: #003d82;
  }
  </style>
  