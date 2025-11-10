<template>
  <div class="users-list">
    <h2>Список пользователей</h2>

    <button @click="execute" :disabled="loading">
      {{ loading ? 'Загрузка...' : 'Загрузить пользователей' }}
    </button>

    <!-- Индикатор загрузки -->
    <p v-if="loading" class="loading">⏳ Загружаем данные...</p>

    <!-- Ошибка -->
    <div v-if="error" class="error">
      ❌ Ошибка: {{ error?.message || error }}
    </div>

    <!-- Данные -->
    <div v-if="data && !loading" class="users">
      <div v-for="user in data" :key="user.id" class="user-card">
        <img :src="user.avatar" :alt="user.first_name" />
        <div class="user-info">
          <h3>{{ user.first_name }} {{ user.last_name }}</h3>
          <p>{{ user.email }}</p>
        </div>
      </div>
    </div>

    <!-- Состояние до загрузки -->
    <p v-if="!data && !loading && !error" class="hint">
      👆 Нажми кнопку чтобы загрузить данных
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Типизация данных
interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

// Моковые данные пользователей
// API reqres.in теперь требует API ключ, поэтому используем локальные данные
const mockUsers: User[] = [
  {
    id: 1,
    email: 'george.bluth@reqres.in',
    first_name: 'George',
    last_name: 'Bluth',
    avatar: 'https://reqres.in/img/faces/1-image.jpg'
  },
  {
    id: 2,
    email: 'janet.weaver@reqres.in',
    first_name: 'Janet',
    last_name: 'Weaver',
    avatar: 'https://reqres.in/img/faces/2-image.jpg'
  },
  {
    id: 3,
    email: 'emma.wong@reqres.in',
    first_name: 'Emma',
    last_name: 'Wong',
    avatar: 'https://reqres.in/img/faces/3-image.jpg'
  },
  {
    id: 4,
    email: 'eve.holt@reqres.in',
    first_name: 'Eve',
    last_name: 'Holt',
    avatar: 'https://reqres.in/img/faces/4-image.jpg'
  },
  {
    id: 5,
    email: 'charles.morris@reqres.in',
    first_name: 'Charles',
    last_name: 'Morris',
    avatar: 'https://reqres.in/img/faces/5-image.jpg'
  },
  {
    id: 6,
    email: 'tracey.ramos@reqres.in',
    first_name: 'Tracey',
    last_name: 'Ramos',
    avatar: 'https://reqres.in/img/faces/6-image.jpg'
  }
];

// Состояние компонента
const data = ref<User[] | null>(null);
const loading = ref(false);
const error = ref<Error | null>(null);

// Функция загрузки данных
const execute = async () => {
  loading.value = true;
  error.value = null;
  try {
    // Имитируем задержку сети для реалистичности
    await new Promise(resolve => setTimeout(resolve, 500));
    data.value = mockUsers;
  } catch (e) {
    error.value = e as Error;
    data.value = null;
  } finally {
    loading.value = false;
  }
};

</script>

<style scoped>
.users-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

button {
  padding: 12px 24px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #359268;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.loading {
  font-size: 18px;
  color: #42b983;
  margin: 20px 0;
}

.error {
  padding: 16px;
  background-color: #fee;
  border-left: 4px solid #f44;
  border-radius: 4px;
  margin: 20px 0;
  color: #c33;
}

.hint {
  color: #666;
  font-style: italic;
  margin: 20px 0;
}

.users {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.user-card {
  display: flex;
  gap: 16px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  transition: transform 0.2s, box-shadow 0.2s;
}

.user-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.user-card img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info h3 {
  margin: 0 0 8px 0;
  color: #2c3e50;
  font-size: 18px;
}

.user-info p {
  margin: 0;
  color: #666;
  font-size: 14px;
}
</style>
