<!-- src/components/AddBillForm.vue -->
<template>
  <form @submit.prevent="submitBillForm">
    <div>
      <label for="amount">金额:</label>
      <input id="amount" v-model="billData.amount" type="number" required>
    </div>
    <div>
      <label for="type">账单类型:</label>
      <input id="type" v-model="billData.type" type="text" required>
    </div>
    <div>
      <label for="status">状态:</label>
      <input id="status" v-model="billData.status" type="text" required>
    </div>
    <div>
      <label for="dueDate">截止日期:</label>
      <input id="dueDate" v-model="billData.dueDate" type="date" required>
    </div>
    <button type="submit">添加账单</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      billData: {
        user: '', // 根据需要设置
        amount: '',
        type: '',
        status: '',
        dueDate: ''
      }
    };
  },
  methods: {
    ...mapActions('bill', ['addBill']),

    submitBillForm() {
      this.addBill(this.billData).then(() => {
        // 处理提交后的逻辑，例如显示消息或清空表单
      });
    },
  },
};
</script>
