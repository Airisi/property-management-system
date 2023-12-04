// import { createStore } from 'vuex';
// import axios from 'axios';

// const apiBaseUrl = process.env.VUE_APP_API_BASE_URL; // 使用环境变量定义 API 基地址

// export default createStore({
//   state: {
//     user: null, // 存储用户信息
//     isAuthenticated: false, // 用户是否通过认证的状态
//     communities: [], // 用于存储小区信息的数组
//     bills: [], // 用于存储用户账单信息的数组
//   },
//   mutations: {
//     // 登录成功时调用
//     loginSuccess(state, user) {
//       state.isAuthenticated = true;
//       state.user = user;
//     },
//     // 登出时调用
//     logout(state) {
//         state.isAuthenticated = false;
//         state.user = null;
//     },
//     // 设置小区列表
//     setCommunities(state, communities) {
//       state.communities = communities;
//     },
//     // 设置用户账单列表
//     setBills(state, bills) {
//       state.bills = bills;
//     }
//   },
//   actions: {
//     // 登录 action
//     // user 参数包含用户信息
//     login({ commit }, user) {
//       commit('loginSuccess', user); // 调用 loginSuccess mutation 并传递用户信息
//     },
//     // 登出 action
//     logout({ commit }) {
//       commit('logout'); // 调用 logout mutation

//     },
//     // 异步获取小区列表
//     async fetchCommunities({ commit }) {
//       try {
//         const response = await axios.get(`${apiBaseUrl}/communities`);
//         commit('setCommunities', response.data);
//       } catch (error) {
//         console.error('获取小区数据失败', error);
//         // 这里可以添加更复杂的错误处理逻辑，例如更新状态以显示错误信息
//       }
//     },
//     // 异步获取用户账单列表
//     async fetchBills({ commit, state }) {
//       try {
//         //const response = await axios.get(`${apiBaseUrl}/bills`); //所有账单
//         const response = await axios.get(`${apiBaseUrl}/bills/user/` + state.user.userId); //指定用户所有账单
//         commit('setBills', response.data);
//       } catch (error) {
//         console.error('获取用户账单数据失败', error);
//         // 这里可以添加更复杂的错误处理逻辑，例如更新状态以显示错误信息
//       }
//     }
//     // 其他 actions 如用户认证等
//   },
//   getters: {
//     // 获取认证状态
//     isAuthenticated: state => state.isAuthenticated,
//     // 获取用户信息
//     user: state => state.user,
//     // 获取小区列表
//     communities: state => state.communities,
//     // 获取用户账单列表
//     bills: state => state.bills
//   }
// });


import { createStore } from 'vuex';
import Vuex from 'vuex';
import user from './modules/user';
import community from './modules/community';
import bill from './modules/bill';
import image from './modules/image';

// 创建 Vuex store
//export default new Vuex.Store({
export default createStore({ 
  // state 定义了整个应用的全局状态
  state: {
    // 这里可以定义全局状态
  },
  // getters 用于获取 state 中的数据
  getters: {
    // 这里可以定义全局的 getters
  },
  // mutations 用于同步修改 state
  mutations: {
    // 这里可以定义全局的 mutations
  },
  // actions 用于处理异步操作
  actions: {
    // 这里可以定义全局的 actions
  },
  // modules 允许将 store 分割成模块，每个模块都有自己的 state、getters、mutations 和 actions
  modules: {
    user,
    community,
    bill,
    image
  }
});
