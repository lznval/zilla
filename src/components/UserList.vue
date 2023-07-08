<template>
  <Header />
  <div class="body">
    <h2>Список пользователей</h2>
    <table class="user-table">
      <thead>
      <tr>
        <th>Email</th>
        <th>Имя</th>
        <th>Номер телефона</th>
        <th>Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.email }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.phoneNumber }}</td>
        <td>
          <button @click="openEditModal(user)" class="edit-button edit">Редактировать</button>
          <button @click="openTodoModal(user)" class="todo-button">TODO</button>
        </td>
      </tr>
      </tbody>
    </table>
    <button @click="openAddModal" class="add-button" style="margin-top: 20px">Добавить пользователя</button>

    <!-- Модальное окно добавления пользователя -->
    <div v-if="showAddModal" class="modal-wrapper">
      <div class="modal-content">
        <h3 class="modal-title">Добавить пользователя</h3>
        <div class="form-group">
          <label for="addEmail">Email:</label>
          <input type="email" id="addEmail" v-model="newUser.email" class="form-control">
        </div>
        <div class="form-group">
          <label for="addName">Имя:</label>
          <input type="text" id="addName" v-model="newUser.name" class="form-control">
        </div>
        <div class="form-group">
          <label for="addPhoneNumber">Номер телефона:</label>
          <input type="text" id="addPhoneNumber" v-model="newUser.phoneNumber" class="form-control">
        </div>
        <button @click="saveNewUser" class="save-button">Сохранить</button>
        <button @click="closeAddModal" class="close-button" style="margin-top: 20px">Закрыть</button>
      </div>
    </div>
    <!-- Модальное окно редактирования данных пользователя -->
    <div v-if="showEditModal" class="modal-wrapper">
      <div class="modal-content">
        <h3 class="modal-title">Редактировать данные пользователя</h3>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="editUser.email" class="form-control">
        </div>
        <div class="form-group">
          <label for="name">Имя:</label>
          <input type="text" id="name" v-model="editUser.name" class="form-control">
        </div>
        <div class="form-group">
          <label for="phoneNumber">Номер телефона:</label>
          <input type="text" id="phoneNumber" v-model="editUser.phoneNumber" class="form-control">
        </div>
        <button @click="saveUser" class="save-button">Сохранить</button>
        <button @click="closeEditModal" class="close-button close">Закрыть</button>
      </div>
    </div>

    <!-- Модальное окно с TODO-листом пользователя -->
    <div v-if="showTodoModal" class="modal-wrapper">
      <div class="modal-content">
        <h3 class="modal-title">TODO-лист пользователя</h3>
        <ul>
          <li v-for="todo in selectedUser.todos" :key="todo.id" :class="{'completed': todo.completed}">
            <input type="checkbox" v-model="todo.completed" class="checkbox-input">
            <span>{{ todo.title }}</span>
          </li>
        </ul>
        <div class="add-task">
          <input type="text" v-model="newTask" placeholder="Введите задачу" class="task-input task">
          <button @click="addTask" class="add-button">Добавить</button>
        </div>
        <button @click="closeTodoModal" class="close-button close">Закрыть</button>
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
      users: [
        {
          id: 1,
          email: "user1@example.com",
          name: "Пользователь 1",
          phoneNumber: "1234567890",
          todos: [
            { id: 1, title: "Задача 1", completed: false },
            { id: 2, title: "Задача 2", completed: true },
            { id: 3, title: "Задача 3", completed: false }
          ]
        },
        {
          id: 2,
          email: "user2@example.com",
          name: "Пользователь 2",
          phoneNumber: "0987654321",
          todos: [
            { id: 4, title: "Задача 4", completed: true },
            { id: 5, title: "Задача 5", completed: false }
          ]
        }
      ],
      newTask: '',
      showEditModal: false,
      showTodoModal: false,
      editUser: null,
      selectedUser: null,
      showAddModal: false,
      newUser: {
        email: '',
        name: '',
        phoneNumber: ''
      }
    };
  },
  methods: {
    openEditModal(user) {
      this.editUser = { ...user };
      this.showEditModal = true;
    },
    saveUser() {
      // Найдем индекс пользователя в массиве и обновим его данные
      const index = this.users.findIndex(u => u.id === this.editUser.id);
      if (index !== -1) {
        this.users[index] = { ...this.editUser };
      }

      this.showEditModal = false;
    },
    closeEditModal() {
      this.editUser = null;
      this.showEditModal = false;
    },
    openTodoModal(user) {
      this.selectedUser = user;
      this.showTodoModal = true;
    },
    closeTodoModal() {
      this.selectedUser = null;
      this.showTodoModal = false;
    },
    addTask() {
      if (this.newTask.trim() !== "") {
        const newTodo = {
          id: this.selectedUser.todos.length + 1,
          title: this.newTask,
          completed: false
        };
        this.selectedUser.todos.push(newTodo);
        this.newTask = "";
      }
    },
    openAddModal() {
      this.showAddModal = true;
    },
    closeAddModal() {
      this.showAddModal = false;
      this.newUser = {
        email: '',
        name: '',
        phoneNumber: ''
      };
    },
    saveNewUser() {
      if (this.newUser.email && this.newUser.name && this.newUser.phoneNumber) {
        const newUser = {
          id: this.users.length + 1,
          email: this.newUser.email,
          name: this.newUser.name,
          phoneNumber: this.newUser.phoneNumber,
          todos: []
        };

        this.users.push(newUser);
        this.closeAddModal();
      } else {
        alert('Заполните все поля')
      }
    }
  }
};
</script>

<style scoped>
.body {
  padding: 0 20px;
}
.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
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

.form-group {
  margin-bottom: 10px;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="email"] {
  width: 100%;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.checkbox-input {
  margin-right: 15px;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.edit {
  margin-right: 10px;
}

.close {
  margin-top: 10px;
}

.task {
  margin-bottom: 10px;
}

.close-button {
  background-color: #dc3545;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}

.completed {
  text-decoration: line-through;
}
.add-task {
  margin-top: 10px;
}

.task-input {
  width: 70%;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.add-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #0056b3;
}
</style>