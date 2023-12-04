import axios from 'axios';

// 确保 API 基地址从环境变量中获取
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

export default {
  namespaced: true, // 启用命名空间

  // state 定义了模块的状态
  state: {
    images: [], // 存储图片信息的数组
  },

  // getters 用于从 state 中获取数据
  getters: {
    // 获取图片列表
    images: state => state.images,
  },

  // actions 用于执行异步操作和提交 mutations
  actions: {
    // 异步获取所有图片
    async fetchImages({ commit }) {
      try {
        const response = await axios.get(`${apiBaseUrl}/images`);
        commit('setImages', response.data);
      } catch (error) {
        console.error('获取图片数据失败', error);
        // 可以在此添加错误处理逻辑
      }
    },

    // 异步获取指定图片
    async fetchImageByUrl({ commit }, imageUrl) {
      try {
        const response = await axios.get(`${apiBaseUrl}/images/${imageUrl}`);
        //commit('setCommunities', response.data);
        return response.data;
      } catch (error) {
        console.error('获取指定图片数据失败', error);
        // 可以在此添加错误处理逻辑
      }
    },

    // 异步上传图片
    // async uploadImage({ dispatch }, image) {
    //   try {
    //     const response = await axios.post(`${apiBaseUrl}/images`, image);

    //     return response.data;
    //   } catch (error) {
    //     console.error('添加图111片失败', response.data);
    //     console.error('添加图片失败', error);
    //     // 可以在此添加错误处理逻辑
    //   }
    // },
    async uploadImage({ commit }, imageFile) {
      try {
          let formData = new FormData();
          formData.append('file', imageFile);
  
          const response = await axios.post(`${apiBaseUrl}/images`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
          return response.data;
          //commit('SET_IMAGE_URL', response.data.url); // 假设返回的数据中包含图片的URL
      } catch (error) {
          console.error('添加小区图片失败', error);
          // 可以在此添加错误处理逻辑
      }
    },
  
    // 异步删除指定图片
    async deleteImage({ dispatch }, imageUrl) {
      try {
        await axios.delete(`${apiBaseUrl}/images/${imageUrl}`);
        dispatch('fetchImages'); // 删除成功后刷新图片列表
        return { success: true };
      } catch (error) {
        console.error('删除图片失败', error);
        // 可以在此添加错误处理逻辑
        return { success:false };
      }
    },
  },

  // mutations 用于更改 state 中的数据
  mutations: {
    // 设置图片列表
    setImages(state, images) {
      state.images = images;
    },
  },
};
