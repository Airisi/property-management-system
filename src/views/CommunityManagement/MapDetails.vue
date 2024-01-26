<template>
  <div class="map-details">
    <div id="map"></div>
    <button @click="goBack">返回</button>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'MapDetails',
  props: {
    communityId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      const coordinates = [51.505, -0.09]; // 使用实际坐标
      this.map = L.map('map').setView(coordinates, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      L.marker(coordinates).addTo(this.map)
        .bindPopup('A detailed view of the location.')
        .openPopup();
    },
    goBack() {
      this.$router.go(-1); // 或者使用 `this.$router.push({ name: 'Communities' });`
    }
  }
};
</script>

<style scoped>
.map-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

#map {
  height: 500px;
  width: 500px;
  /* width: 100%; */
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #003d82;
}
</style>
