<template>
  <div class="counter">
    <h2>{{ title }}</h2>
    <p>Счёт: {{ count }}</p>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Типизация через generic
const count = ref<number>(0);
const title = ref<string>('Мой первый счётчик');

const increment = (): void => {
  count.value++;
};

const decrement = (): void => {
  count.value--;
};
</script>

<style scoped>
.counter {
  text-align: center;
  padding: 20px;
  border: 2px solid #42b983;
  border-radius: 8px;
}

button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
