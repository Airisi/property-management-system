import axios from 'axios';

const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

export default {
  namespaced: true,
  // 定义模块的状态
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null, // 用户信息
    isAuthenticated:  !!localStorage.getItem('user'), // 用户是否已认证（登录）
  },

  // 定义获取状态的方法
  getters: {
    // 获取用户的认证状态
    isAuthenticated: state => state.isAuthenticated,

    // 获取用户信息
    user: state => state.user,
  },

  // 定义触发状态变更的方法
  actions: {
    // 用户登录
    async submitLogin({ commit }, credentials) {
      try {
        const response = await axios.post(`${apiBaseUrl}/users/login`, credentials);

        if(response.data.user) {
          commit('loginSuccess', response.data.user);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          return { success: true, message: '登录成功' };
        }
      } catch (error) {
        console.error('登录失败', error);
        return { 
          success: false, 
          message: error.response?.data?.message || '用户名或密码错误，请稍后重试'
        };
      }
    },

    // user 参数包含用户的信息
    loginSuccess({ commit }, user) {
      // 调用下面定义的 mutation 来更新状态
      commit('loginSuccess', user);
    },

    // 用户登出
    logout({ commit }) {
      // 调用下面定义的 mutation 来更新状态
      commit('logout');
    },
  },

  // 定义如何变更状态
  mutations: {
    // 登录成功时调用
    loginSuccess(state, user) {
      // 设置用户信息和认证状态
      state.user = user;
      state.isAuthenticated = true;
    },

    // 登出时调用
    logout(state) {
      // 清除用户信息和认证状态
      state.user = null;
      state.isAuthenticated = false;
      // 清除本地存储中的用户信息和令牌
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
};
