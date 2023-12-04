<template>
  <div class="bills-container">
    <h1>账单管理</h1>
    <!-- 加载状态提示 -->
    <!-- <div v-if="loading">正在加载账单数据...</div> -->
    <!-- 错误处理提示 -->
    <!-- <div v-if="error">{{ errorMessage }}</div> -->
    <!-- 账单列表 -->
    <!-- <table v-if="bills.length && !loading" class="bills-table"> -->
    <!-- 创建账单按钮 -->
    <button @click="showAddBillForm">创建账单</button>
    <!-- 账单列表 -->
    <table v-if="bills.length" class="bills-table">
      <thead>
        <tr>
          <th>账单号</th>
          <th>用户ID</th>
          <th>金额</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bill in bills" :key="bill.billId">
          <td>{{ bill.billId }}</td>
          <td>{{ bill.user.username }}</td>
          <td>{{ bill.amount }}</td>
          <td>{{ bill.status }}</td>
          <td>
            <button @click="editBill(bill)">编辑</button>
            <button @click="confirmDelete(bill.billId)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- 添加账单模态框 -->
  <add-bill-modal v-if="showModal" @close="showModal = false" />
</template>

<script>
import axios from 'axios';
import { mapActions, mapState, mapGetters } from 'vuex'
import AddBillModal from './AddBillModal.vue';

const apiBaseUrl = process.env.VUE_APP_API_BASE_URL; // 使用环境变量定义 API 基地址

export default {
  name: 'Bills',
  data() {
    return {
      loading: false, // 加载状态
      error: false, // 错误状态
      errorMessage: '', // 错误信息
      showModal: false,
    };
  },
  components: {
    AddBillModal, // 局部注册组件
  },
  computed: {
    ...mapGetters('bill', ['bills']),
  },
  created() {
    // 组件创建时触发 Vuex action 获取账单列表
    this.fetchBills();
  },
  methods: {
    ...mapActions('bill', ['fetchBills', 'deleteBill']),
    showAddBillForm() {
        this.showModal = true;
      },
    editBill(bill) {
      console.log('编辑账单', bill);
      // 编辑账单的逻辑
    },
    confirmDelete(billId) {
      if(confirm('确定要删除这条账单吗？')) {
        this.deleteBill(billId).then(() => {
        this.fetchBills(); // 在删除账单后刷新列表
      });
    }
  },
  //   async deleteBill(billId) {
  //   try {
  //     this.loading = true;
  //     await axios.delete(`${apiBaseUrl}/bills/${billId}`);
  //     this.fetchBills(); // Refresh the list after deletion
  //   } catch (error) {
  //     this.error = true;
  //     this.errorMessage = 'Error deleting bill: ' + error.message;
  //   } finally {
  //     this.loading = false;
  //   }
  // },
  },
};
</script>

<style scoped>
.bills-container {
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.bills-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.bills-table th, .bills-table td {
  padding: 0.5rem;
  border: 1px solid #ddd;
}

.bills-table th {
  background-color: #f4f7f6;
}

button {
  background-color: #0056b3;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;
}

button:hover {
  background-color: #003d82;
}
</style>
