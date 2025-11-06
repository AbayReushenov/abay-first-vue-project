<template>
  <div class="greeting">
    <h3>Привет, {{ name }}!</h3>
    <p v-if="age">Тебе {{ age }} лет</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string;
  age?: number; // опциональное поле
}

// Типизация props через interface
const props = withDefaults(defineProps<Props>(), {
  age: 0
});
</script>

<style scoped>
.greeting {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    width: auto;
    text-align: center;
    padding: 20px;
    border: 2px solid #b94283ff;
    border-radius: 50px;
  }
}


</style>
