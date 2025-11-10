<template>
  <div id="app">
    <h1>Мой первый Vue 3 + TypeScript проект</h1>
    <GreetingTwo />
    <Counter />
    <CounterDemo />
    <Greeting name="Абай" :age="58" />
    <Counter />
    <CounterDemo />
    <Greeting name="Филимон" :age="45" />
    <hr />
    <UsersList />
    <hr/>
    <DayThreeDirectives />
  </div>
</template>

<script setup lang="ts">
import GreetingTwo from './components/GreetingTwo.vue';
import Counter from './components/Counter.vue';
import CounterDemo from './components/CounterDemo.vue';
import Greeting from './components/Greeting.vue';
import UsersList from './components/UsersList.vue';
import DayThreeDirectives from './DayThreeDirectives.vue';
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
