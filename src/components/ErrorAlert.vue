<template>
  <div v-if="message" :class="['alert', alertClass]" :style="alertStyle">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: String,
    type: {
      type: String,
      default: 'error' // 默认类型为 'error'
    }
  },
  computed: {
    alertClass() {
      switch (this.type) {
        case 'error': return 'alert-error';
        case 'warning': return 'alert-warning';
        case 'info': return 'alert-info';
        default: return 'alert-error';
      }
    },
    alertStyle() {
      return {
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000
      };
    }
  },
}
</script>

<style scoped>
.alert {
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
  text-align: center;
  animation: fadeInOut 1.5s;
}

.alert-error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.alert-warning {
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
}

.alert-info {
  background-color: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; }
  10%, 90% { opacity: 1; }
}
</style>
