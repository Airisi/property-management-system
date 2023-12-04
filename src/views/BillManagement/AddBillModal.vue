<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>添加账单</h2>
      <form @submit.prevent="submitBill">
        <div>
          <label for="amount">金额:</label>
          <input type="number" id="amount" v-model="bill.amount">
        </div>
        <div>
          <label for="type">账单类型:</label>
          <input type="text" id="type" v-model="bill.type">
        </div>
        <div>
          <label for="status">状态:</label>
          <select id="status" v-model="bill.status">
            <option value="未支付">未支付</option>
            <option value="已支付">已支付</option>
          </select>
        </div>
        <div>
          <label for="dueDate">截止日期:</label>
          <input type="date" id="dueDate" v-model="bill.dueDate">
        </div>
        <button type="submit">提交</button>
      </form>
    </div>
  </div>
  <div v-if="showError" class="error-message">
  {{ errorMessage }}
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import axios from 'axios';
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

export default {
  emits: ['close'],
  data() {
    return {
      showError: false,  // 控制错误提示的显示
      errorMessage: '',  // 存储错误信息
      bill: {
        amount: '',
        type: '',
        status: '未支付',
        dueDate: '',
      },
    };
  },
  methods: {
    ...mapActions('bill', ['addBill']),

    submitBill() {
      this.addBill({
          user: this.$store.getters['user/user'], // 用户信息在 Vuex store 中
          amount: this.bill.amount,
          type: this.bill.type,
          status: this.bill.status,
          dueDate: this.bill.dueDate,
        }).then((result) => {
          // 假设 addBill action 返回一个对象，其中包含操作的成功或失败状态
          if (result && result.success) {
            // 如果操作成功，则关闭模态框
            this.$emit('close');
            // 可以在这里添加其他成功后的处理逻辑，如显示成功消息
          } else {
            // 如果操作失败，可以在这里处理错误情况，如显示错误消息
            this.displayError('添加账单失败，请重试。');
          }
      });
    },
    // async submitBill() {
    //   try {
        // await axios.post(`${apiBaseUrl}/bills`, {
        //   user: this.$store.getters['user/user'], // 用户信息在 Vuex store 中
        //   amount: this.bill.amount,
        //   type: this.bill.type,
        //   status: this.bill.status,
        //   dueDate: this.bill.dueDate,
        // });
    //     this.$emit('close'); // 关闭模态框并可能触发父组件的某些操作，例如刷新列表
    //   } catch (error) {
    //     console.error('创建账单失败', error);
    //     // 处理错误
    //   }
    // },
    closeModal() {
      this.$emit('close');
    },
    displayError(message) {
      this.errorMessage = message;
      this.showError = true;

      setTimeout(() => {
        this.showError = false;
      }, 1000);  // 1秒后隐藏错误提示
    }
  },
};
</script>

<style scoped>
.modal {
  display: block; /* Hidden by default */
  position: fixed; 
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.error-message {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: red;
    color: white;
    padding: 10px;
    border-radius: 5px;
    z-index: 1000;
  }
</style>
