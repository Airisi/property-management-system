<template>
  <div class="buildings-container">
    <h1>楼宇管理</h1>
    <button @click="showAddBuildingForm">添加楼宇</button>

    <div v-if="loading">正在加载...</div>
    <div v-if="error">{{ errorMessage }}</div>

    <div v-if="buildings.length">
      <ul>
        <li v-for="building in buildings" :key="building.buildingId" @click="goToBuildingDetails(building.buildingId)">
          <span>{{ building.buildingId }} - {{ building.community.communityId }} - {{ building.number }} - {{ building.description }}</span>
          <button @click.stop="editBuilding(building)">编辑</button>
          <button @click.stop="confirmDelete(building.buildingId)">删除</button>
        </li>
      </ul>
    </div>

    <div v-else>
      <p>暂无楼宇信息。</p>
    </div>
    <div class="actions">
      <button @click="goBack">返回</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Buildings',
  data() {
    return {
      communityId: this.$route.params.communityId,
      loading: false,
      error: false,
      errorMessage: ''
    };
  },
  computed: {
    ...mapGetters('building', ['buildings'])
  },
  created() {
    console.log("communityId:"+this.communityId)
    this.fetchBuildings(this.communityId);
  },
  methods: {
    ...mapActions('building', ['fetchBuildings', 'deleteBuilding']),

    goToBuildingDetails(buildingId) {
      // 导航到楼宇详情页面
      this.$router.push({ name: 'BuildingDetails', params: { buildingId } });
    },

    showAddBuildingForm() {
      this.$router.push({ name: 'AddBuilding', params: { communityId: this.communityId } });
    },

    editBuilding(building) {
      this.$router.push({ name: 'EditBuilding', params: { buildingId: building.buildingId } }); // 假设 'EditBuilding' 是编辑楼宇的路由名称
    },

    confirmDelete(buildingId) {
      if (confirm('确定要删除这个楼宇吗？')) {
        this.deleteBuilding(buildingId);
        this.$router.push({ name: 'Buildings', params: { communityId: this.communityId } });
      }
    },
    goBack() {
      //this.$router.go(-1); // 返回上一个路由
      this.$router.push({ name: 'CommunityDetails', params: { communityId: this.communityId } });
    }
  }
};
</script>

<style scoped>
.buildings-container {
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
