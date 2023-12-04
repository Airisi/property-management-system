import axios from 'axios';

// 确保 API 基地址从环境变量中获取
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

export default {
  namespaced: true, // 启用命名空间

  // state 定义了模块的状态
  state: {
    communities: [], // 存储小区信息的数组
  },

  // getters 用于从 state 中获取数据
  getters: {
    // 获取小区列表
    communities: state => state.communities,
  },

  // actions 用于执行异步操作和提交 mutations
  actions: {
    // 异步获取所有小区
    async fetchCommunities({ commit }) {
      try {
        const response = await axios.get(`${apiBaseUrl}/communities`);
        commit('setCommunities', response.data);
      } catch (error) {
        console.error('获取小区数据失败', error);
        // 可以在此添加错误处理逻辑
      }
    },

    // 异步获取指定小区
    async fetchCommunityById({ commit }, communityId) {
      try {
        const response = await axios.get(`${apiBaseUrl}/communities/${communityId}`);
        //commit('setCommunities', response.data);
        return response.data;
      } catch (error) {
        console.error('获取指定小区数据失败', error);
        // 可以在此添加错误处理逻辑
      }
    },

    // 异步添加新小区
    async addCommunity({ dispatch }, communityData) {
      try {
        await axios.post(`${apiBaseUrl}/communities`, communityData);
        dispatch('fetchCommunities'); // 添加成功后刷新小区列表
        return { success: true };
      } catch (error) {
        console.error('添加小区失败', error);
        // 可以在此添加错误处理逻辑
        return { success: false };
      }
    },

    // 异步更新小区信息
    //async updateCommunity({ dispatch }, { communityId, communityData }) {
    async updateCommunity({ dispatch }, communityData ) {
    try {
      await axios.put(`${apiBaseUrl}/communities/${communityData.communityId}`, communityData);
      //await axios.put(`${apiBaseUrl}/communities/${communityId}`, communityData);
      await dispatch('fetchCommunities'); // 等待刷新小区列表完成
      return { success: true };
    } catch (error) {
      console.error('更新小区信息失败', error);
      // 可以在此添加错误处理逻辑
      return { success: false };
    }
    },

    // 异步删除指定小区
    async deleteCommunity({ dispatch }, communityId) {
      try {
        await axios.delete(`${apiBaseUrl}/communities/${communityId}`);
        dispatch('fetchCommunities'); // 删除成功后刷新小区列表
        return { success: true };
      } catch (error) {
        console.error('删除小区失败', error);
        // 可以在此添加错误处理逻辑
        return { success:false };
      }
    },
  },

  // mutations 用于更改 state 中的数据
  mutations: {
    // 设置小区列表
    setCommunities(state, communities) {
      state.communities = communities;
    },
  },
};
