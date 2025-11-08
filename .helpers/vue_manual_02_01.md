# Модуль  "Шаг 5: useFetch для API"


```
typescript
// src/composables/useFetch.ts
import { ref } from 'vue';

export function useFetch<T>(url: string) {
  const data = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  const execute = async () => {
    loading.value = true;
    try {
      const res = await fetch(url);
      data.value = await res.json();
    } catch (e) {
      error.value = e as Error;
    } finally {
      loading.value = false;
    }
  };

  return { data, loading, error, execute };
}
```

Отлично! Давай создадим компонент, который использует `useFetch` для загрузки данных из тестового API.

## Компонент для демонстрации useFetch

Создай файл `src/components/UsersList.vue`:

```vue
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
      ❌ Ошибка: {{ error.message }}
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

// Используем тестовый API reqres.in
const { data: response, loading, error, execute } = useFetch<ApiResponse>(
  'https://reqres.in/api/users?page=1'
);

// Извлекаем массив пользователей из ответа
import { computed } from 'vue';
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
```


## Добавь компонент в App.vue

```vue
<template>
  <div id="app">
    <h1>Мой первый Vue 3 + TypeScript проект</h1>

    <!-- Твой предыдущий Counter -->
    <Counter />

    <!-- Новый компонент с useFetch -->
    <UsersList />
  </div>
</template>

<script setup lang="ts">
import Counter from './components/Counter.vue';
import UsersList from './components/UsersList.vue';
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```


## Альтернатива: автозагрузка при монтировании

Если хочешь, чтобы данные загружались сразу при открытии страницы:

```vue
<script setup lang="ts">
import { onMounted } from 'vue';
import { useFetch } from '@/composables/useFetch';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ApiResponse {
  data: User[];
}

const { data: response, loading, error, execute } = useFetch<ApiResponse>(
  'https://reqres.in/api/users?page=1'
);

const data = computed(() => response.value?.data || null);

// Автозагрузка при монтировании компонента
onMounted(() => {
  execute();
});
</script>
```


## Улучшенная версия useFetch с автозагрузкой

Можешь обновить сам composable:

```typescript
// src/composables/useFetch.ts
import { ref, onMounted } from 'vue';

interface UseFetchOptions {
  immediate?: boolean; // загружать сразу?
}

export function useFetch<T>(url: string, options: UseFetchOptions = {}) {
  const data = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  const execute = async () => {
    loading.value = true;
    error.value = null; // сброс предыдущей ошибки

    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      data.value = await res.json();
    } catch (e) {
      error.value = e as Error;
    } finally {
      loading.value = false;
    }
  };

  // Автозагрузка если указано
  if (options.immediate) {
    onMounted(() => {
      execute();
    });
  }

  return { data, loading, error, execute };
}
```

Теперь можно использовать так:

```vue
<script setup lang="ts">
// Загрузка по клику
const users = useFetch<ApiResponse>('https://reqres.in/api/users?page=1');

// Или автозагрузка
const posts = useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts', {
  immediate: true
});
</script>
```


## Другие тестовые API для практики

```typescript
// JSONPlaceholder - посты
useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts')

// JSONPlaceholder - TODO
useFetch<Todo[]>('https://jsonplaceholder.typicode.com/todos')

// ReqRes - пользователи
useFetch<ApiResponse>('https://reqres.in/api/users?page=2')

// Random User API
useFetch<RandomUserResponse>('https://randomuser.me/api/?results=10')
```

Попробуй создать компонент и запустить — данные загрузятся с реального API! 🚀

