<template>
  <div class="community-details">
    <h1>{{ community.name }}</h1>
    <div class="image-container">
      <img :src="community.imageUrl || require(`@/assets/logo.png`)" alt="Community Image">
    </div>
    <div class="info">
      <h2>地址:</h2>
      <p>{{ community.address }}</p>
      <h2>描述:</h2>
      <p>{{ community.description }}</p>
    </div>
    <div class="actions">
      <button @click="buildings">楼宇</button>
      <button @click="editCommunity">编辑小区</button>
      <button @click="goBack">返回小区列表</button>
    </div>
    <div class="map-container" @click="goToMapDetails">
      <div id="map-preview"></div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CommunityDetails',
  data() {
    return {
      communityId: this.$route.params.communityId,
      community: {
        name: '',
        address: '',
        description: '',
        imageUrl: ''
      },
    };
  },
  created() {
    this.fetchCommunityDetails();
  },
  mounted() {
    this.initializeMap();
  },
  methods: {
    ...mapActions('community', ['fetchCommunityById']),
    fetchCommunityDetails() {
      this.fetchCommunityById(this.communityId).then(data => {
        this.community = data;
      });
    }, 
    initializeMap() {
      const map = L.map('map-preview').setView([51.505, -0.09], 13); // 使用实际的坐标
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // 添加一个标记
      L.marker([51.505, -0.09]).addTo(map) // 使用实际的坐标
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.') // 自定义弹出文本
        .openPopup();
    },
    goToMapDetails() {
      // 导航到地图详情视图，或打开地图的弹出窗口
      this.$router.push({ name: 'MapDetails', params: { communityId: this.communityId } });
    },
    goBack() {
      this.$router.push({ name: 'Communities' });
    },
    editCommunity() {
      this.$router.push({ name: 'EditCommunity', params: { communityId: this.communityId } });
    },
    buildings() {
      this.$router.push({ name: 'Buildings', params: { communityId: this.communityId } });
    }
  }
};
</script>

<style scoped>
.community-details {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 10px;
}

.image-container img {
  max-width: 100%;
  height: auto;
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

.map-container {
  height: 400px; /* 设置地图容器的高度 */
  width: 400px;
  cursor: pointer;
  margin: 0 auto; /* 水平居中 */
}
#map-preview {
  height: 100%;
}
</style>
