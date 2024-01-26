<template>
  <div class="edit-building-container">
    <h1>编辑楼宇信息</h1>
    <form @submit.prevent="submitEditForm">
      <div class="form-group">
        <label for="number">楼宇编号:</label>
        <input type="text" id="number" v-model="building.number" required>
      </div>

      <div class="form-group">
        <label for="description">楼宇描述:</label>
        <textarea id="description" v-model="building.description"></textarea>
      </div>

      <button type="submit">保存更改</button>
    </form>

    <div class="actions">
      <button @click="goBack">返回楼宇列表</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'EditBuilding',
  data() {
    return {
      buildingId: this.$route.params.buildingId,
      building: {
        buildingId: '',
        community:'',
        number: '',
        description: '',
        // 可以根据需要添加其他属性
      },
    };
  },
  created() {
    this.fetchBuildingDetails(); // 获取并填充楼宇的初始信息
  },
  methods: {
    ...mapActions('building', ['updateBuilding', 'fetchBuildingById']),

    fetchBuildingDetails() {
      // 根据路由参数中的楼宇ID获取楼宇详细信息
      const buildingId = this.$route.params.buildingId;
      this.fetchBuildingById(buildingId).then(data => {
        this.building = data;
      });
    },

    submitEditForm() {
      // 提交表单进行编辑
      this.updateBuilding(this.building).then(() => {
        // 处理编辑成功后的逻辑，如显示消息或重定向
        this.$router.push({ name: 'Buildings', params: { communityId: this.building.community.communityId } });
      });
    },

    goBack() {
      this.$router.push({ name: 'Buildings', params: { communityId: this.building.community.communityId } });
    },
  }
};
</script>

<style scoped>
.edit-building-container {
  /* 样式定义 */
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
input[type="text"], textarea {
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
