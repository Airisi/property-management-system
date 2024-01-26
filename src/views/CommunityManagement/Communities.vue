<template>
  <div class="communities-container">
    <h1>小区管理</h1>
    <button @click="showAddCommunityForm">添加小区</button>

    <div v-if="loading">正在加载...</div>
    <div v-if="error">{{ errorMessage }}</div>

    <div v-if="communities.length">
      <ul>
        <li v-for="community in communities" :key="community.communityId" @click="goToCommunityDetails(community.communityId)">
          <img v-if="community.imageUrl" :src="community.imageUrl" alt="Community Image" class="community-image" @click="goToCommunityDetails(community.communityId)"/>
          <img v-else :src="require(`@/assets/logo.png`)" alt="Default Image" class="community-image" @click="goToCommunityDetails(community.communityId)"/>
          {{ community.communityId }} - {{ community.name }} - {{ community.address }} - {{ community.description }}
          <button @click.stop="editCommunity(community)">编辑</button>
          <button @click.stop="confirmDelete(community.communityId)">删除</button>
        </li>
      </ul>
    </div>

    <div v-else>
      <p>暂无小区信息。</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Communities',
  data() {
    return {
      loading: false, // 加载状态
      error: false, // 错误状态
      errorMessage: '' // 错误信息
    };
  },
  computed: {
    // 使用 mapGetters 获取小区列表
    ...mapGetters('community', ['communities'])
  },
  created() {
    // 组件创建时触发 Vuex action 获取小区列表
    this.fetchCommunities();
  },
  methods: {
    // 使用 mapActions 绑定 Vuex actions
    ...mapActions('community', ['fetchCommunities', 'deleteCommunity']),

    // 显示添加小区的表单
    showAddCommunityForm() {
      this.$router.push({ name: 'AddCommunity' }); // 假设 'AddCommunity' 是添加小区的路由名称
    },

    // 编辑小区
    editCommunity(community) {
      this.$router.push({ name: 'EditCommunity', params: { communityId: community.communityId } }); // 假设 'EditCommunity' 是编辑小区的路由名称
    },

    // 确认删除小区
    confirmDelete(communityId) {
      if (confirm('确定要删除这个小区吗？')) {
        this.deleteCommunity(communityId);
      }
    },

    goToCommunityDetails(communityId) {
      // 导航到小区详情页面
      this.$router.push({ name: 'CommunityDetails', params: { communityId } });
    }
  },
};
</script>

<style scoped>
.community-image {
  width: 50px; /* 控制图片宽度 */
  height: auto; /* 保持图片的纵横比 */
  margin-right: 1rem; /* 图片和文本之间的间距 */
  border-radius: 4px; /* 可选：圆角边框 */
}

.communities-container {
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

button {
  background-color: #0056b3;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 0.5rem;
}

button:hover {
  background-color: #003d82;
}
</style>
