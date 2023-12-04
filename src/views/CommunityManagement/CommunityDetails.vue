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
      <button @click="editCommunity">编辑小区</button>
      <button @click="goBack">返回小区列表</button>
    </div>
  </div>
</template>

<script>
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
  methods: {
    ...mapActions('community', ['fetchCommunityById']),
    fetchCommunityDetails() {
      this.fetchCommunityById(this.communityId).then(data => {
        this.community = data;
      });
    },
    goBack() {
      this.$router.push({ name: 'Communities' });
    },
    editCommunity() {
      this.$router.push({ name: 'EditCommunity', params: { communityId: this.communityId } });
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
</style>
