<template>
  <div id="app">
    <h1>Мой первый Vue 3 + TypeScript проект</h1>
    <Counter />
    <Greeting name="Филимон" :age="58" />
  </div>
</template>

<script setup lang="ts">
import Counter from './components/Counter.vue';
import Greeting from './components/Greeting.vue';
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
