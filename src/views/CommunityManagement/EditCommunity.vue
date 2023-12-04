<template>
  <div class="edit-community-container">
    <h1>编辑小区信息</h1>
    <form @submit.prevent="submitEditForm">
      <div class="form-group">
        <label for="image">小区图片:</label>
        <input type="file" id="image" @change="onFileChange">
        <!-- 显示图片预览 -->
        <img v-if="imagePreview" :src="imagePreview" class="image-preview" />
        <img v-else :src="require(`@/assets/logo.png`)" alt="Default Image" class="community-image"/>
      </div>

      <div class="form-group">
        <label for="name">小区名称:</label>
        <input type="text" id="name" v-model="community.name" required>
      </div>

      <div class="form-group">
        <label for="address">小区地址:</label>
        <input type="text" id="address" v-model="community.address" required>
      </div>

      <div class="form-group">
        <label for="description">小区描述:</label>
        <textarea id="description" v-model="community.description"></textarea>
      </div>
      <button type="submit">保存更改</button>
    </form>
    <div class="actions">
      <button @click="goBack">返回小区列表</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'EditCommunity',
  data() {
    return {
      community: {
        communityId: '',
        name: '',
        address: '',
        description: '',
        imageUrl: ''
      },
      image: null, // 用于存储图片文件
      imagePreview: null, // 用于显示图片预览
    };
  },
  created() {
    this.fetchCommunityDetails(); // 获取并填充小区的初始信息
  },
  methods: {
    ...mapActions('community', ['updateCommunity', 'fetchCommunityById']),
    ...mapActions('image', ['uploadImage']),

    fetchCommunityDetails() {
      // 根据路由参数中的小区ID获取小区详细信息
      const communityId = this.$route.params.communityId;
      this.fetchCommunityById(communityId).then(data => {
        this.community = data;
        this.imagePreview = data.imageUrl; // 设置原始图片为预览
      });
    },
    onFileChange(e) {
      if (e.target.files.length > 0) {
        this.image = e.target.files[0];
        // 创建图片预览URL
        this.imagePreview = URL.createObjectURL(this.image);
      }
    },
    async submitEditForm() {
      // 首先处理图片上传
      if (this.image) {
        const uploadResult = await this.uploadImage(this.image);
        if (uploadResult) {
            // 如果图片上传成功，设置图片URL到小区对象中
            this.community.imageUrl = uploadResult; // 假设返回的对象中有url字段
        }
      }
      this.updateCommunityInfo();
    },
    updateCommunityInfo() {
      try {
        // 提交其他小区信息的更新
        this.updateCommunity(this.community).then(() => {
          this.$router.push({ name: 'Communities' });
        });
      } catch (error) {
        console.error('更新小区信息异常', error);
      } finally {
        // 无论成功或失败，都释放临时URL资源
        if (this.image) {
          URL.revokeObjectURL(this.imagePreview);
        }
      }
    },

    goBack() {
      this.$router.push({ name: 'Communities' });
    },

  }
};
</script>

<style scoped>
.edit-community-container {
  /* 样式定义 */
}
.image-preview {
  max-width: 200px; /* 限制预览图片的最大宽度 */
  margin-top: 1rem; /* 顶部边距 */
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
  margin-bottom: .5rem;
}
input[type="text"], textarea {
  width: 100%;
  padding: .5rem;
  border: 1px solid #ccc;
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
