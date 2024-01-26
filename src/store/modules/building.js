import axios from 'axios';

// 确保 API 基地址从环境变量中获取
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

export default {
  namespaced: true, // 启用命名空间

  // state 定义了模块的状态
  state: {
    buildings: [], // 存储楼宇信息的数组
  },

  // getters 用于从 state 中获取数据
  getters: {
    // 获取楼宇列表
    buildings: state => state.buildings,
  },

  // actions 用于执行异步操作和提交 mutations
  actions: {
    // 异步获取所有楼宇
    async fetchBuildings({ commit }, communityId) {
      try {
        //const response = await axios.get(`${apiBaseUrl}/buildings`); //所有楼宇
        const response = await axios.get(`${apiBaseUrl}/buildings/community/${communityId}`); //指定小区所有楼宇
        commit('setBuildings', response.data);
      } catch (error) {
        console.error('获取楼宇数据失败，小区 '+communityId+' 暂无楼宇！', error);
        commit('setBuildings', []);
        // 可以在此添加错误处理逻辑
      }
    },

    // 异步获取指定楼宇
    async fetchBuildingById({ commit }, buildingId) {
      try {
        const response = await axios.get(`${apiBaseUrl}/buildings/${buildingId}`);
        return response.data;
      } catch (error) {
        console.error('获取指定楼宇数据失败', error);
        // 可以在此添加错误处理逻辑
      }
    },

    // 异步添加新楼宇
    async addBuilding({ dispatch }, buildingData) {
      try {
        await axios.post(`${apiBaseUrl}/buildings`, buildingData);
        //dispatch('fetchBuildings'); // 添加成功后刷新楼宇列表
        return { success: true };
      } catch (error) {
        console.error('添加楼宇失败', error);
        // 可以在此添加错误处理逻辑
        return { success: false };
      }
    },

    // 异步更新楼宇信息
    async updateBuilding({ dispatch }, buildingData) {
      try {
        await axios.put(`${apiBaseUrl}/buildings/${buildingData.buildingId}`, buildingData);
        //await dispatch('fetchBuildings'); // 等待刷新楼宇列表完成
        return { success: true };
      } catch (error) {
        console.error('更新楼宇信息失败', error);
        // 可以在此添加错误处理逻辑
        return { success: false };
      }
    },

    // 异步删除指定楼宇
    async deleteBuilding({ dispatch }, buildingId) {
      try {
        await axios.delete(`${apiBaseUrl}/buildings/${buildingId}`);
        //dispatch('fetchBuildings'); // 删除成功后刷新楼宇列表
        return { success: true };
      } catch (error) {
        console.error('删除楼宇失败', error);
        // 可以在此添加错误处理逻辑
        return { success: false };
      }
    },
  },

  // mutations 用于更改 state 中的数据
  mutations: {
    // 设置楼宇列表
    setBuildings(state, buildings) {
      state.buildings = buildings;
    },
  },
};
