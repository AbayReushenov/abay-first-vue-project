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
import { computed } from 'vue';
import { useFetch } from '@/composables/useFetch';

// Типизация данных от API
interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

// Используем тестовый API reqres.in через прокси
const { data: response, loading, error, execute } = useFetch<ApiResponse>(
  '/api/users?page=1'
);

// Извлекаем массив пользователей из ответа
const data = computed(() => response.value?.data || null);

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
