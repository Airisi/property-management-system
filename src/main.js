import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 引入Vue Router实例
import store from './store' // 如果你使用Vuex, 也可以引入Vuex存储
import './assets/main.css' // 引入全局样式文件
import ErrorAlert from './components/ErrorAlert.vue'; // 引入组件

// 创建Vue实例并使用App组件作为根组件
const app = createApp(App);

// 使用Vue Router
app.use(router);

// 如果你使用Vuex，可以这样加入Vuex存储
app.use(store);

// 全局注册组件
app.component('ErrorAlert', ErrorAlert); 

// 挂载Vue实例到DOM
app.mount('#app');
