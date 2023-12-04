import axios from 'axios';

// 确保 API 基地址从环境变量中获取
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

export default {
  namespaced: true,
  state: {
    bills: [], // 存储用户账单信息的数组
  },
  getters: {
    // 获取用户账单列表
    bills: state => state.bills,
  },
  actions: {
    // 异步获取用户账单列表
    async fetchBills({ commit, rootState }) {
      try {
        //const response = await axios.get(`${apiBaseUrl}/bills`); //所有账单
        const response = await axios.get(`${apiBaseUrl}/bills/user/` + rootState.user.user.userId); //指定用户所有账单
        commit('setBills', response.data);
      } catch (error) {
        console.error('获取用户账单数据失败', error);
        // 这里可以添加更复杂的错误处理逻辑，例如更新状态以显示错误信息
      }
    },
    // 异步添加新账单
    async addBill({ commit, dispatch }, billData) {
      try {
        await axios.post(`${apiBaseUrl}/bills`, billData);
        dispatch('fetchBills'); // 添加成功后刷新账单列表
        return { success: true };
      } catch (error) {
        console.error('添加账单失败', error);
        // 可以在此添加错误处理逻辑
        return { success: false };
      }
    },
    // 异步删除指定账单
    async deleteBill({ commit, dispatch }, billId) {
      try {
        // 调用 API 删除账单
        await axios.delete(`${apiBaseUrl}/bills/${billId}`);
        //commit('removeBill', billId);
        dispatch('fetchBills'); // 删除成功后刷新账单列表

      } catch (error) {
        console.error('删除账单失败', error);
        // 可以在此添加错误处理逻辑
      }
    },
  },
  mutations: {
    // 设置账单列表
    setBills(state, bills) {
      state.bills = bills;
    },

    // 从状态中删除账单
    // removeBill(state, billId) {
    //   state.bills = state.bills.filter(bill => bill.id !== billId);
    // },
  },
};
