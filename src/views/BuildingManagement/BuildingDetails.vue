<template>
  <div class="building-details">
    <h1>{{ building.number }}</h1>
    <div class="info">
      <h2>楼宇编号:</h2>
      <p>{{ building.number }}</p>
      <h2>描述:</h2>
      <p>{{ building.description }}</p>
    </div>
    <div class="actions">
      <button @click="editBuilding">编辑楼宇</button>
      <button @click="goBack">返回楼宇列表</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'BuildingDetails',
  data() {
    return {
      buildingId: this.$route.params.buildingId,
      building: {
        number: '',
        community:'',
        description: '',
        // 可以根据需要添加其他楼宇相关的属性
      },
    };
  },
  created() {
    this.fetchBuildingDetails();
  },
  methods: {
    ...mapActions('building', ['fetchBuildingById']),
    fetchBuildingDetails() {
      this.fetchBuildingById(this.buildingId).then(data => {
        this.building = data;
      });
    },
    goBack() {
      this.$router.push({ name: 'Buildings', params: { communityId: this.building.community.communityId } }); // 假设 'Buildings' 是楼宇列表的路由名称
    },
    editBuilding() {
      this.$router.push({ name: 'EditBuilding', params: { buildingId: this.buildingId } }); // 假设 'EditBuilding' 是编辑楼宇的路由名称
    }
  }
};
</script>

<style scoped>
.building-details {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 10px;
}

.info {
  margin-top: 20px;
}

h2 {
  color: #333;
}

.actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #0056b3;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #003d82;
}
</style>
