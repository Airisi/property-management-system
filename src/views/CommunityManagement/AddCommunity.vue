<template>
  <div class="add-community-container">
    <h1>添加小区</h1>
    <form @submit.prevent="submitCommunity">
      <div class="form-group">
        <label for="image">小区图片:</label>
        <input type="file" id="image" @change="onFileChange">
        <!-- 显示图片预览 -->
        <img v-if="imagePreview" :src="imagePreview" class="image-preview" />
      </div>
      
      <div class="form-group">
        <label for="name">小区名称:</label>
        <input type="text" id="name" v-model="community.name">
      </div>

      <div class="form-group">
        <label for="address">小区地址:</label>
        <input type="text" id="address" v-model="community.address">
      </div>

      <div class="form-group">
        <label for="description">小区描述:</label>
        <textarea id="description" v-model="community.description"></textarea>
      </div>   
      <button type="submit">提交</button>
    </form>
    <div class="actions">
      <button @click="goBack">返回小区列表</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AddCommunity',
  data() {
    return {
      community: {
        name: '',
        address: '',
        description: '',
        imageUrl: ''
      },
      image: null, // 添加用于存储图片文件的属性
      imagePreview: null, // 用于显示图片预览
    };
  },
  methods: {
    // 使用 mapActions 绑定 Vuex actions
    ...mapActions('community', ['addCommunity']),
    ...mapActions('image', ['uploadImage']),

    onFileChange(e) {
      if (e.target.files.length > 0) {
        this.image = e.target.files[0];
        // 创建图片预览URL
        this.imagePreview = URL.createObjectURL(this.image);
      }
    },
  
    // 提交表单
    async submitCommunity() {
      // 首先上传图片
      const uploadResult = await this.uploadImage(this.image);
      if (uploadResult) {
          // 如果图片上传成功，设置图片URL到小区对象中
          this.community.imageUrl = uploadResult; // 假设返回的对象中有url字段

          // 然后添加小区
          const addResult = await this.addCommunity(this.community);
          if (addResult && addResult.success) {
              // 释放占用的临时URL资源
              if (this.image) {
                URL.revokeObjectURL(this.imagePreview);
              }
              this.$router.push({ name: 'Communities' }); // 假设 'Communities' 是小区列表的路由名称
          }
      } else {
          console.error('图片上传失败');
          // 可以在此添加错误处理逻辑
      }       
    },

    goBack() {
      this.$router.push({ name: 'Communities' });
    },

  }
};
</script>

<style scoped>
.image-preview {
  max-width: 200px; /* 限制预览图片的最大宽度 */
  margin-top: 1rem; /* 顶部边距 */
}

.add-community-container {
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: auto;
}

.form-group {
  margin-bottom: 1rem;
}

.actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #0056b3;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #003d82;
}
</style>
