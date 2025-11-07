<!-- src/components/CounterDemo.vue -->
<template>
  <div>
    <h2>Count: {{ count }}</h2>
    <p>Doubled: {{ doubled }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useCounter } from '@/composables/useCounter';

const { count, doubled, increment, decrement } = useCounter(0);

watch(count, (newValue, oldValue) => {
  console.log(`Count: ${oldValue} -> ${newValue}`);
});
</script>
