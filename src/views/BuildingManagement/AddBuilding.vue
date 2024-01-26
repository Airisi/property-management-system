<template>
  <div class="add-building-container">
    <h1>添加楼宇</h1>
    <form @submit.prevent="submitBuilding">
      <div class="form-group">
        <label for="name">楼宇名称:</label>
        <input type="text" id="name" v-model="building.number">
      </div>

      <!-- <div class="form-group">
        <label for="address">楼宇地址:</label>
        <input type="text" id="address" v-model="building.address">
      </div> -->

      <div class="form-group">
        <label for="description">楼宇描述:</label>
        <textarea id="description" v-model="building.description"></textarea>
      </div>

      <button type="submit">提交</button>
    </form>
    <div class="actions">
      <button @click="goBack">返回</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AddBuilding',
  data() {
    return {
      communityId: this.$route.params.communityId,
      building: {
        number: '',
        community: '',
        description: ''
      }
    };
  },
  created() {
    this.fetchCommunityById(this.communityId).then(data => {
        this.building.community = data;
      });
  },
  methods: {
    ...mapActions('building', ['addBuilding']),
    ...mapActions('community', ['fetchCommunityById']),

    async submitBuilding() {
      const addResult = await this.addBuilding(this.building);
      if (addResult && addResult.success) {
        this.$router.push({ name: 'Buildings' }); // 假设 'Buildings' 是楼宇列表的路由名称
      } else {
        console.error('添加楼宇失败');
      }
    },

    goBack() {
      //this.$router.go(-1); // 返回上一个路由
      this.$router.push({ name: 'Buildings', params: { communityId: this.communityId } });
    }
  }
};
</script>

<style scoped>
.add-building-container {
  /* 样式定义 */
}

.form-group {
  margin-bottom: 1rem;
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

.actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
</style>
