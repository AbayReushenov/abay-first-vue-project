<template>
  <div class="greeting-two">
    <h6>Введелите Ваше имя и фамилию ниже:</h6>
    <input v-model="firstName" placeholder="Имя" />
    <input v-model="lastName" placeholder="Фамилия" />
    <p v-if="fullName">Полное имя: {{ fullName }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const firstName = ref('');
const lastName = ref('');

const fullName = computed(() => {
  console.log('Пересчёт!'); // вызовется только при изменении firstName/lastName
  return `${firstName.value} ${lastName.value}`;
});
</script>

<style scoped>
.greeting-two {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input, p {
    width: auto;
    text-align: center;
    padding: 20px;
    border: 1px solid rgb(202, 185, 194);
  }
}


</style>
