<template>
  <div class="image-demo">
    <h2>Галерея изображений (Демо директив)</h2>

    <div class="controls">
      <label for="imageSelect">Выбери изображение:</label>
      <select id="imageSelect" v-model="selectedImage" @change="updateImage">
        <option value="">— Выбери —</option>
        <option value="default">Стандартное (150x150)</option>
        <option value="large">Большое (300x300)</option>
        <option value="colorful">Цветное (с текстом)</option>
        <option value="error">С ошибкой (тест fallback)</option>
      </select>

      <input v-model="customUrl" placeholder="Или введи свой URL..." @input="updateImage"
        style="padding: 8px; margin-left: 10px; width: 250px; border: 1px solid #ddd; border-radius: 4px;" />
    </div>

    <div class="main-image-container">
      <img :key="`${displayImage}-${imageKey}`" :src="displayImage" :alt="imageAlt"
        :class="{ 'large': isLarge, 'error': hasError }" :style="{ opacity: loading ? 0.5 : 1 }" @load="onImageLoad"
        @error="onImageError" loading="lazy" />

      <div v-show="loading" class="loading-overlay">
        Загружаем изображение...
      </div>

      <div v-if="hasError" class="error-overlay">
        Ошибка загрузки! Используем fallback.
        <button @click="retryLoad">Повторить</button>
      </div>
    </div>

    <div class="actions">
      <button @click="toggleSize">
        {{ isLarge ? 'Уменьшить' : 'Увеличить' }}
      </button>
      <button @click="randomImage">
        Случайное
      </button>
    </div>

    <div class="thumbnails" v-if="thumbnails.length">
      <h3>Миниатюры (кликни для выбора):</h3>
      <div class="thumb-grid">
        <img v-for="(thumb, index) in thumbnails" :key="index" :src="thumb.src" :alt="'Миниатюра ' + (index + 1)"
          @click="selectThumbnail(index)" class="thumbnail" @error="thumb.error = true" />
      </div>
    </div>

    <details v-if="showDebug" class="debug">
      <summary>Отладка</summary>
      <p>Текущий URL: {{ displayImage }}</p>
      <p>Alt текст: {{ imageAlt }}</p>
      <p>Состояние: {{ loading ? 'Загрузка' : (hasError ? 'Ошибка' : 'Готово') }}</p>
      <label>
        <input type="checkbox" v-model="showDebug" /> Показать отладку
      </label>
    </details>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

// Базовый URL изображения
const baseUrl = 'https://static.tildacdn.com/tild6639-6338-4265-a330-363036396334/mashaneuro9_Medium_f.png';

const presets = {
  default: `${baseUrl}?text=Vue+Default&w=150&h=150`,
  large: `${baseUrl}?text=Vue+Large&w=300&h=300`,
  colorful: `${baseUrl}?text=Colorful+Vue&w=200&h=200&bg=ff6b6b&fg=ffffff`,
  error: 'https://invalid-url-for-test.com/image.jpg'
};

const customUrl = ref('');
const selectedImage = ref('default');
const isLarge = ref(false);
const loading = ref(false);
const hasError = ref(false);
const showDebug = ref(false);
const imageKey = ref(0); // Ключ для принудительной перезагрузки изображения
// Use the standard browser Timeout type ('number'), NodeJS.Timeout is for Node.js only
let loadTimeout: number | null = null;

const displayImage = computed(() => {
  let url: string;

  // Если есть кастомный URL, используем его
  if (customUrl.value.trim()) {
    url = customUrl.value.trim();
  } else if (selectedImage.value && selectedImage.value in presets) {
    // Используем пресет из selectedImage
    url = presets[selectedImage.value as keyof typeof presets];
  } else {
    // Fallback на default
    url = presets.default;
  }

  return url;
});

const imageAlt = computed(() => {
  if (!displayImage.value) {
    return 'Нет изображения';
  }
  const url = typeof displayImage.value === 'string' ? displayImage.value.split('?')[0] : '';
  if (!url) {
    return 'Нет изображения';
  }
  const shortUrl = url.length > 30 ? url.substring(30) : url;
  return `Изображение: ${shortUrl}...`;
});

const thumbnails = ref([
  { src: `${baseUrl}?text=Thumb1&w=60&h=60`, error: false },
  { src: `${baseUrl}?text=Thumb2&w=60&h=60&bg=42b983&fg=ffffff`, error: false },
  { src: `${baseUrl}?text=Thumb3&w=60&h=60&bg=ff6b6b&fg=000000`, error: false }
]);

// Функция для обновления изображения
const triggerImageUpdate = () => {
  loading.value = true;
  hasError.value = false;
  imageKey.value++; // Принудительно перезагружаем изображение

  if (loadTimeout) {
    clearTimeout(loadTimeout);
  }

  loadTimeout = setTimeout(() => {
    loading.value = false;
    if (!hasError.value) {
      console.warn('Таймаут загрузки — сброс состояния');
    }
  }, 5000);
};

// Отслеживаем изменения selectedImage
watch(selectedImage, (newValue, oldValue) => {
  // При изменении select сбрасываем customUrl и обновляем изображение
  if (newValue && newValue !== '' && newValue !== oldValue) {
    customUrl.value = '';
    // Явно обновляем изображение
    triggerImageUpdate();
  }
}, { immediate: false });

// Отслеживаем изменения displayImage для обновления состояния загрузки
watch(displayImage, (newUrl, oldUrl) => {
  if (newUrl && newUrl !== oldUrl) {
    triggerImageUpdate();
  }
}, { immediate: false });

const updateImage = () => {
  // При изменении select или input принудительно обновляем изображение
  if (selectedImage.value && selectedImage.value !== '') {
    customUrl.value = '';
  }
  // triggerImageUpdate будет вызван через watch на displayImage
};

const toggleSize = () => {
  isLarge.value = !isLarge.value;
};

const randomImage = () => {
  const keys = Object.keys(presets);
  const randomKey = keys[Math.floor(Math.random() * keys.length)] as keyof typeof presets;
  selectedImage.value = randomKey;
  updateImage();
};

const selectThumbnail = (index: number) => {
  selectedImage.value = index === 0 ? 'default' : index === 1 ? 'large' : 'colorful';
  updateImage();
};

const retryLoad = () => {
  hasError.value = false;
  loading.value = true;

  if (loadTimeout) {
    clearTimeout(loadTimeout);
    loadTimeout = null;
  }

  // Если это пресет "error", переключаем на default
  if (selectedImage.value === 'error') {
    selectedImage.value = 'default';
    customUrl.value = '';
  } else if (customUrl.value.trim()) {
    // Если это кастомный URL с ошибкой, сбрасываем его
    customUrl.value = '';
    selectedImage.value = 'default';
  }

  // Устанавливаем новый таймаут для загрузки
  loadTimeout = setTimeout(() => {
    loading.value = false;
    if (!hasError.value) {
      console.warn('Таймаут загрузки — сброс состояния');
    }
  }, 5000);

  updateImage();
};

const onImageLoad = () => {
  loading.value = false;
  hasError.value = false;

  if (loadTimeout) {
    clearTimeout(loadTimeout);
    loadTimeout = null;
  }
};

const onImageError = () => {
  loading.value = false;
  hasError.value = true;

  if (loadTimeout) {
    clearTimeout(loadTimeout);
    loadTimeout = null;
  }

  // Если это пресет "error" (для теста), не делаем автоматический fallback
  // Пользователь может нажать "Повторить" или выбрать другое изображение
  if (selectedImage.value === 'error') {
    return;
  }

  // Для кастомных URL и других ошибок - автоматический fallback
  if (customUrl.value.trim()) {
    customUrl.value = '';
    selectedImage.value = 'default';
  } else {
    // Если это не пресет error и не кастомный URL, переключаем на default
    selectedImage.value = 'default';
  }
};
</script>

<style scoped>
.image-demo {
  text-align: center;
  padding: 30px;
  border: 2px solid #42b983;
  border-radius: 12px;
  margin: 20px auto;
  max-width: 600px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  box-shadow: 0 4px 20px rgba(66, 185, 131, 0.1);
}

.controls {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

label {
  font-weight: bold;
  color: #2c3e50;
}

select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
}

.main-image-container {
  position: relative;
  margin: 20px 0;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  width: 150px;
  height: auto;
  border: 3px solid #42b983;
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

img:hover {
  transform: scale(1.05);
}

.large {
  width: 300px;
  border-color: #3498db;
  box-shadow: 0 6px 25px rgba(52, 152, 219, 0.2);
}

.error {
  border-color: #e74c3c !important;
}

.loading-overlay {
  position: absolute;
  background: rgba(255, 255, 255, 0.9);
  color: #42b983;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  z-index: 2;
  animation: pulse 1.5s infinite;
  }

  @keyframes pulse {

    0%,
    100% {
      opacity: 0.8;
    }

    50% {
      opacity: 1;
    }
  }

  .error-overlay {
    position: absolute;
    background: rgba(231, 76, 60, 0.95);
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    text-align: center;
    top: 50%;
    left: 50%;
      transform: translate(-50%, -50%);
      z-index: 3;
      min-width: 200px;
    }
    
    .error-overlay button {
      margin-top: 10px;
      padding: 8px 16px;
      background: white;
      color: #e74c3c;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }
    
    .error-overlay button:hover {
      background: #f8f9fa;
}

.actions {
  margin: 20px 0;
  display: flex;
  gap: 10px;
  justify-content: center;
}

button {
  padding: 12px 24px;
  background: linear-gradient(135deg, #42b983 0%, #359268 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 10px rgba(66, 185, 131, 0.2);
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(66, 185, 131, 0.3);
}

.thumbnails {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
}

.thumb-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 10px;
  justify-items: center;
}

.thumbnail {
  width: 60px;
  height: 60px;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.2s, transform 0.2s;
}

.thumbnail:hover {
  border-color: #42b983;
  transform: scale(1.1);
}

.debug {
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: left;
}

summary {
  cursor: pointer;
  font-weight: bold;
  color: #42b983;
}
</style>
