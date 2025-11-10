<template>
  <div class="image-demo">
    <h2>📸 Галерея изображений (Демо директив)</h2>

    <!-- Выбор изображения из пресетов (v-model + select) -->
    <div class="controls">
      <label for="imageSelect">Выбери изображение:</label>
      <select id="imageSelect" v-model="selectedImage" @change="updateImage">
        <option value="">— Выбери —</option>
        <option value="default">Стандартное (150x150)</option>
        <option value="large">Большое (300x300)</option>
        <option value="colorful">Цветное (с текстом)</option>
        <option value="error">С ошибкой (тест fallback)</option>
      </select>

      <!-- Кастомный URL (v-model) -->
      <input v-model="customUrl" placeholder="Или введи свой URL..." @input="updateImage"
        style="padding: 8px; margin-left: 10px; width: 250px; border: 1px solid #ddd; border-radius: 4px;" />
    </div>

    <!-- Основное изображение (:bind + :class + события) -->
    <div class="main-image-container">
      <!-- v-if для состояний -->
      <div v-if="loading" class="loading-state">
        ⏳ Загружаем изображение...
      </div>

      <img v-else :src="displayImage" :alt="imageAlt" :class="{ 'large': isLarge, 'error': hasError }"
        @load="onImageLoad" @error="onImageError" loading="lazy" />

      <!-- v-if для ошибки -->
      <div v-if="hasError" class="error-overlay">
        ❌ Ошибка загрузки! Используем fallback.
        <button @click="retryLoad">Повторить</button>
      </div>
    </div>

    <!-- Кнопки управления (@click) -->
    <div class="actions">
      <button @click="toggleSize">
        {{ isLarge ? '🗜️ Уменьшить' : '🔍 Увеличить' }}
      </button>
      <button @click="randomImage">
        🎲 Случайное
      </button>
    </div>

    <!-- Миниатюры галереи (v-for) -->
    <div class="thumbnails" v-if="thumbnails.length">
      <h3>Миниатюры (кликни для выбора):</h3>
      <div class="thumb-grid">
        <img v-for="(thumb, index) in thumbnails" :key="index" :src="thumb.src" :alt="`Миниатюра ${index + 1}`"
          @click="selectThumbnail(index)" class="thumbnail" @error="thumb.error = true" />
      </div>
    </div>

    <!-- Отладка (computed + v-if) -->
    <details v-if="showDebug" class="debug">
      <summary>🔧 Отладка (кликни)</summary>
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
import { ref, computed } from 'vue';

// Базовый URL (твой рабочий)
const baseUrl = 'https://static.tildacdn.com/tild6639-6338-4265-a330-363036396334/mashaneuro9_Medium_f.png';

// Пресеты изображений
const presets = {
  default: `${baseUrl}?text=Vue+Default&w=150&h=150`,
  large: `${baseUrl}?text=Vue+Large&w=300&h=300`,
  colorful: `${baseUrl}?text=Colorful+Vue&w=200&h=200&bg=ff6b6b&fg=ffffff`,
  error: 'https://invalid-url-for-test.com/image.jpg'  // Для теста ошибки
};

// Реактивные данные
const customUrl = ref('');
const selectedImage = ref('default');
const isLarge = ref(false);
const loading = ref(false);
const hasError = ref(false);
const showDebug = ref(false);

// Вычисляемое: URL для отображения (computed)
const displayImage = computed(() => {
  // Если есть кастомный URL, используем его
  if (customUrl.value.trim()) {
    return customUrl.value.trim();
  }
  // Иначе используем пресет из selectedImage
  if (selectedImage.value && selectedImage.value in presets) {
    return presets[selectedImage.value as keyof typeof presets];
  }
  // Fallback на default
  return presets.default;
});

// Вычисляемое: alt-текст
const imageAlt = computed(() => {
  if (!displayImage.value) return 'Нет изображения';
  try {
    const urlParts = displayImage.value.split('?');
    const url = urlParts[0] || displayImage.value;
    return `Изображение: ${url.length > 50 ? url.substring(0, 50) + '...' : url}`;
  } catch {
    return 'Изображение';
  }
});

// Миниатюры (массив для v-for)
const thumbnails = ref([
  { src: `${baseUrl}?text=Thumb1&w=60&h=60`, error: false },
  { src: `${baseUrl}?text=Thumb2&w=60&h=60&bg=42b983&fg=ffffff`, error: false },
  { src: `${baseUrl}?text=Thumb3&w=60&h=60&bg=ff6b6b&fg=000000`, error: false }
]);

// Функции
const updateImage = () => {
  loading.value = true;
  hasError.value = false;
  // Сбрасываем кастомный URL если выбран пресет
  if (selectedImage.value && !customUrl.value.trim()) {
    customUrl.value = '';
  }
};

const toggleSize = () => {
  isLarge.value = !isLarge.value;
};

const randomImage = () => {
  const keys = Object.keys(presets).filter(key => key !== 'error'); // Исключаем error из случайного выбора
  const randomKey = keys[Math.floor(Math.random() * keys.length)] as keyof typeof presets;
  selectedImage.value = randomKey;
  customUrl.value = ''; // Сбрасываем кастомный URL
  updateImage();
};

const selectThumbnail = (index: number) => {
  const presetMap: Record<number, string> = {
    0: 'default',
    1: 'large',
    2: 'colorful'
  };
  selectedImage.value = presetMap[index] || 'default';
  customUrl.value = ''; // Сбрасываем кастомный URL
  updateImage();
};

const retryLoad = () => {
  hasError.value = false;
  loading.value = true;
  // Принудительно обновляем изображение, меняя ключ для перезагрузки
  const currentUrl = displayImage.value;
  // Если это кастомный URL с ошибкой, сбрасываем его
  if (customUrl.value.trim() && currentUrl === customUrl.value.trim()) {
    customUrl.value = '';
    selectedImage.value = 'default';
  }
};

const onImageLoad = () => {
  loading.value = false;
  hasError.value = false;
  console.log('✅ Изображение загружено:', displayImage.value);
};

const onImageError = () => {
  loading.value = false;
  hasError.value = true;
  console.log('❌ Ошибка загрузки:', displayImage.value);

  // Если ошибка с кастомным URL, сбрасываем его и используем fallback
  if (customUrl.value.trim() && displayImage.value === customUrl.value.trim()) {
    customUrl.value = '';
    selectedImage.value = 'default';
    // Небольшая задержка для обновления computed
    setTimeout(() => {
      hasError.value = false;
    }, 100);
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
    opacity: 0.7;
  }
  
  .loading-state {
    padding: 40px;
    font-size: 18px;
    color: #42b983;
    animation: pulse 1.5s infinite;
  }
  
  @keyframes pulse {
  
    0%,
    100% {
      opacity: 1;
    }
  
    50% {
      opacity: 0.5;
    }
  }
  
  .error-overlay {
    position: absolute;
    background: rgba(231, 76, 60, 0.9);
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .error-overlay button {
    margin-top: 10px;
    padding: 5px 10px;
    background: white;
    color: #e74c3c;
    border: none;
    border-radius: 4px;
    cursor: pointer;
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
