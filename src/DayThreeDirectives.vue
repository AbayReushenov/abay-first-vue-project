<template>
  <div id="app">
    <h1>День 3: Директивы</h1>

    <!-- Переключение между демо -->
    <button @click="currentDemo = 'image'">Картинки</button>
    <button @click="currentDemo = 'events'">События</button>
    <button @click="currentDemo = 'form'">Форма</button>
    <button @click="currentDemo = 'conditional'">Условия</button>
    <button @click="currentDemo = 'list'">Список</button>

    <ImageDemo v-if="currentDemo === 'image'" />
    <EventsDemo v-if="currentDemo === 'events'" />
    <FormDemo v-if="currentDemo === 'form'" />
    <ConditionalDemo v-if="currentDemo === 'conditional'" />
    <ListDemo v-if="currentDemo === 'list'" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EventsDemo from './directives/EventsDemo.vue';
import FormDemo from './directives/FormDemo.vue';
import ConditionalDemo from './directives/ConditionalDemo.vue';
import ListDemo from './directives/ListDemo.vue';
import ImageDemo from './directives/ImageDemo.vue';

const currentDemo = ref('events');
</script>
