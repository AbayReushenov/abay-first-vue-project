<template>
  <div class="image-demo">
    <h2>Галерея изображений (Демо директив)</h2>
    <input v-model="currentImage" placeholder="URL изображения" style="padding: 8px; margin: 10px; width: 300px;" />
    <br />
    <img :src="currentImage" :alt="imageAlt" :class="{ 'large': isLarge }" @error="onImageError" />
    <br />
    <button @click="toggleSize">
      {{ isLarge ? 'Уменьшить' : 'Увеличить' }}
    </button>
    <br />
    <!-- Отладка: покажи значения -->
    <p>URL: {{ currentImage }}</p>
    <p>Alt: {{ imageAlt }}</p>
    <p>Размер: {{ isLarge ? 'Большой' : 'Маленький' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const currentImage = ref('https://i.pinimg.com/736x/c0/19/0f/c0190fbf59f566234f0d68c5f4cbeed1.jpg?text=Vue+Image');
const isLarge = ref(false);

const imageAlt = computed(() => {
  // Добавил проверку на пустоту
  return currentImage.value ? `Изображение: ${currentImage.value.substring(0, 50)}...` : 'Нет изображения';
});

const toggleSize = () => {
  isLarge.value = !isLarge.value;
};

const onImageError = () => {
  console.log('Ошибка загрузки изображения!');  // Для отладки
  currentImage.value = 'https://i.pinimg.com/736x/c0/19/0f/c0190fbf59f566234f0d68c5f4cbeed1.jpg?text=Error';  // Fallback
};
</script>

<style scoped>
.image-demo {
  text-align: center;
  padding: 20px;
  border: 2px dashed #42b983;
  border-radius: 8px;
  margin: 20px;
}

img {
  width: 150px;
  height: auto;
  border: 2px solid #ddd;
  border-radius: 8px;
  transition: width 0.3s ease;
  margin: 10px 0;
}

.large {
  width: 300px;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;
}

button:hover {
  background-color: #359268;
}
</style>
