<template>
  <div class="login-container">
    <ErrorAlert ref="errorAlert" :message="errorMessage" :type="errorType"/>
    <div class="login-box">
      <h1 class="title">物业管理系统</h1>
      <form @submit.prevent="login ">
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

        <div class="form-group">
          <button type="submit">登录</button>
        </div>
      </form>
    </div>
  </div>
</template>
  
<script>
import { mapActions } from 'vuex'; // 引入 mapActions 辅助函数

export default {
  data() {
    return {
      form: {
        username: 'admin',
        password: '123'
      },
      errorMessage: '', // 用于显示错误消息
      errorType: 'error', 
    };
  },
  methods: {
    ...mapActions('user', ['submitLogin']), // 将 store 中的 login action 映射到组件中

    async login() {
      const result = await this.submitLogin(this.form);

      if (result.success) {
        this.$router.push('/');
      } else {
        this.errorMessage = result.message;
            // 设置定时器，在1秒后清除错误信息
        setTimeout(() => {
          this.errorMessage = '';
        }, 1500);
      }
    },
  }
};
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f7f6;
}

.login-box {
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
</style>
  