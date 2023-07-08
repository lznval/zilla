<template>
  <Header />
  <div class="body">
    <h2>Список платежей</h2>
    <table class="payment-table">
      <thead>
      <tr>
        <th>Название</th>
        <th>Сумма</th>
        <th>Статус</th>
        <th>Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="payment in payments" :key="payment.id">
        <td>{{ payment.name }}</td>
        <td>{{ payment.amount }}</td>
        <td>{{ payment.status }}</td>
        <td>
          <button @click="viewPaymentDetails(payment)" class="details-button">Подробно</button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Модальное окно с подробными данными платежа -->
    <div v-if="showDetailsModal" class="modal-wrapper">
      <div class="modal-content">
        <h3 class="modal-title">Детали платежа</h3>
        <p><strong>Название:</strong> {{ selectedPayment.name }}</p>
        <p><strong>Сумма:</strong> {{ selectedPayment.amount }}</p>
        <p><strong>Статус:</strong> {{ selectedPayment.status }}</p>
        <p><strong>Дата создания:</strong> {{ selectedPayment.createdDate }}</p>
        <p><strong>Дата оплаты:</strong> {{ selectedPayment.paymentDate }}</p>
        <p><strong>Описание:</strong> {{ selectedPayment.description }}</p>
        <button @click="closeDetailsModal" class="close-button">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    Header
  },
  data() {
    return {
      payments: [
        {
          id: 1,
          name: "Платеж 1",
          amount: 100,
          status: "Оплачено",
          createdDate: "2023-07-01",
          paymentDate: "2023-07-02",
          description: "Оплата за товар 1"
        },
        {
          id: 2,
          name: "Платеж 2",
          amount: 200,
          status: "Ожидание",
          createdDate: "2023-07-03",
          paymentDate: null,
          description: "Оплата за товар 2"
        },
        {
          id: 3,
          name: "Платеж 3",
          amount: 300,
          status: "Оплачено",
          createdDate: "2023-07-05",
          paymentDate: "2023-07-06",
          description: "Оплата за товар 3"
        },
      ],
      showDetailsModal: false,
      selectedPayment: null,
    };
  },
  methods: {
    viewPaymentDetails(payment) {
      this.selectedPayment = payment;
      this.showDetailsModal = true;
    },
    closeDetailsModal() {
      this.selectedPayment = null;
      this.showDetailsModal = false;
    },
  },
};
</script>

<style scoped>
.body {
  padding: 0 20px;
}
.payment-table {
  width: 100%;
  border-collapse: collapse;
}

.payment-table th, .payment-table td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.details-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
}

.modal-title {
  font-size: 18px;
  margin-bottom: 10px;
}

.close-button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
