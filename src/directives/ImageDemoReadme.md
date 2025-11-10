# ImageDemo — Демо компонент для изучения директив Vue 3

Этот компонент демонстрирует базовые **директивы Vue 3** (v-if, v-for, v-model, v-bind, v-on) в контексте простой галереи изображений. Он создан для **Дня 3** вашего плана изучения Vue.js как React-разработчика. Компонент использует Composition API (ref, computed, watch), обрабатывает состояния загрузки/ошибок и интегрирует стили (scoped CSS).

Компонент загружает изображения с внешнего URL (fallback на tildacdn.com для стабильности в России), позволяет выбирать пресеты, вводить кастомный URL, масштабировать и тестировать fallback на ошибки. Это практический пример, как директивы упрощают шаблоны по сравнению с JSX в React.

## 🎯 Что демонстрирует компонент?

- **v-model**: Двусторонняя привязка для select (пресеты) и input (кастомный URL).
- **v-bind (:)**: Динамические атрибуты (src, alt, class, style для opacity).
- **v-on (@)**: Обработчики событий (click для кнопок/миниатюр, load/error для img).
- **v-if/v-show**: Условный рендеринг (ошибка — v-if; загрузка — v-show для оверлея).
- **v-for**: Цикл для миниатюр (массив thumbnails).
- **Дополнительно**: Computed для URL/alt, watch для реактивности, TypeScript для типизации.

**Аналогия с React**: Вместо `{items.map()} + onClick={handler}` здесь v-for/@click; вместо `value={url} onChange={...}` — v-model; вместо `style={{ opacity: loading ? 0.5 : 1 }}` — :style.

## 📋 Функции

- **Пресеты изображений**: Выберите из select (default, large, colorful, error) — демонстрирует v-model + @change.
- **Кастомный URL**: Введите свой URL (v-model + @input) — watch обновит src.
- **Масштабирование**: Кнопка "Увеличить/Уменьшить" (:class для .large, @click).
- **Загрузка/ошибка**: Оверлей loading (v-show) с анимацией; fallback на error (v-if + @error).
- **Миниатюры**: Галерея из 3 thumb (v-for + @click для выбора).
- **Отладка**: Checkbox (v-model) показывает состояние (computed).
- **Fallback**: При ошибке (@error) — автоматический возврат к default + таймаут (watch с setTimeout).

**Тестовые сценарии**:

- Выберите "error" — увидите оверлей ошибки и fallback.
- Введите invalid URL — сработает @error.
- Кликните миниатюру — v-for обработает @click.


## 🚀 Установка и использование

### 1. Добавьте в проект

- Создайте файл `src/directives/ImageDemo.vue` и скопируйте код из attachment (или используйте версию ниже).
- Импортируйте в `src/App.vue`:

```vue
<template>
  <div id="app">
    <h1>Vue 3 Demo — День 3: Директивы</h1>
    <ImageDemo />
  </div>
</template>

<script setup lang="ts">
import ImageDemo from './directives/ImageDemo.vue';
</script>
```


### 2. Запуск

- Убедитесь, что проект Vue 3 + TS (vite).
- `npm install` (если нужно).
- `npm run dev` — откройте `http://localhost:5173/`.
- В VS Code: Установите Volar (vue.volar@3.1.3) для автодополнения/типизации.


### 3. Настройка URL (для России)

- Base URL: `https://static.tildacdn.com/...` (ваш fallback, работает без блокировок).
- Если нужно изменить: В `<script setup>` отредактируйте `baseUrl` и `presets`.
- Альтернативы: Если tildacdn глючит, замените на локальный файл (`/public/image.png`) или другой CDN.


### 4. Зависимости

- Vue 3.4+ (с Composition API).
- TypeScript (опционально, но рекомендуется).
- Нет внешних библиотек — чистый Vue.


## 🔍 Разбор кода (по секциям)

### `<template>` — Шаблон с директивами

- **v-model на select/input**: Автоматически обновляет `selectedImage`/`customUrl`. В React это `value + onChange`.
- **:src / :alt / :class / :style**: Динамическая привязка (v-bind). `:class="{ 'large': isLarge }"` — объект для условных классов. `:style="{ opacity: loading ? 0.5 : 1 }"` — inline-стиль (аналог React style={}).
- **@click / @load / @error**: Обработчики. `@load`/`@error` — нативные события img (срабатывают после рендера).
- **v-show="loading"**: Показ оверлея без удаления DOM (img остаётся, события работают). Альтернатива: v-if (но может сломать события).
- **v-if="hasError"**: Условный блок для ошибки (удаляет/добавляет в DOM).
- **v-for="(thumb, index) in thumbnails :key="index"**: Цикл по массиву. `:key` обязателен для оптимизации (React аналог: key в map).

**Пример рендера**: При смене src watch запускает loading=true → v-show показывает оверлей → @load сбрасывает.

### `<script setup lang="ts">` — Логика (Composition API)

- **ref()**: Реактивные переменные (selectedImage, loading и т.д.). Аналог useState в React.
- **computed()**: displayImage (комбинирует select + input), imageAlt (динамический текст). Кэшируется, пересчитывается только при deps.
- **watch(displayImage, ...)**: Следит за изменением URL, стартует loading + таймаут (защита от зависания). Аналог useEffect([url], ...).
- **Функции**: updateImage (обновляет src), toggleSize (@click), onImageLoad/@error (события), randomImage/selectThumbnail (для миниатюр).
- **TypeScript**: Интерфейсы не нужны (простой), но ref типизированы (ref<string>).

**Ключевой момент**: watch + @load обеспечивают реактивность без manual setState.

### `<style scoped>` — Стили

- **Scoped**: Стили применяются только к этому компоненту (Vue добавляет [data-v-xxx]).
- **CSS Grid/Flex**: .thumb-grid (grid для v-for), .controls (flex для input/select).
- **Анимации**: transition (для :class large), @keyframes pulse (для loading).
- **Responsive**: max-width, flex-wrap.

**Совет**: Для динамических стилей используйте :style, не CSS-переменные (пока не нужны).

## 📚 Учебные моменты (связано с React)

| Директива | Что делает | React-аналог | Почему лучше в Vue? |
| :-- | :-- | :-- | :-- |
| **v-model** | Привязка input/select | `<input value={state} onChange={setState} />` | Автоматически: нет boilerplate для onChange. |
| **:class** | Условные классы | `className={isLarge ? 'large' : ''}` | Объект/массив: `{ 'large': isLarge }` — короче. |
| **:style** | Динамические стили | `style={{ opacity: loading ? 0.5 : 1 }}` | Аналогично, но с Vue-refs (реактивно). |
| **v-if/v-show** | Условия | `{condition && <div>}` / `style={display: none}` | v-show экономит DOM (не перерендерит события); v-if — для редких. |
| **v-for** | Циклы | `{items.map(item => <li key={item.id}>{item}</li>)}` | Интегрировано в HTML, :key обязателен (оптимизация). |
| **@click** | События | `onClick={handler}` | Коротко: `@click="handler"` или inline `@click="isLarge = !isLarge"`. |

**Отличия от React**:

- Директивы — декларативны: меньше JS в JSX.
- v-model упрощает формы (нет дублирования value/onChange).
- Watch + computed — как useEffect/useMemo, но автоматическое отслеживание deps.
- Ошибки: @error/@load — встроено, без addEventListener.

**Лучшие практики** (из официальной доки Vue):

- Всегда `:key` в v-for (стабильность).
- v-if вне v-for (иначе производительность).
- :style для простых случаев; CSS vars для сложных.
- Обработка ошибок: @error + fallback (как здесь).


## 🛠️ Расширение (домашка)

1. **Добавьте валидацию**: v-if на input (если URL пустой — покажите warning).
2. **Drag \& Drop**: @drop для загрузки локального файла (FileReader API).
3. **Persist state**: Используйте Pinia (store) для сохранения selectedImage.
4. **Анимация**: Добавьте <transition> для v-if (fade-in/out).
5. **Тестирование**: Создайте тест с Vitest: `expect(loading.value).toBe(false)` после load.

## 📖 Ресурсы

- [Vue Docs: Directives](https://vuejs.org/guide/essentials/template-syntax.html) — официал.
- [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html) — vs Hooks.
- [Vite + Vue](https://vitejs.dev/guide/) — ваш билд-tool.
- Ваш план: День 3 завершён! Следующий — компоненты (props/emits).

Если код не совпадает с attachment — адаптируйте (уберите эмодзи из комментариев). Вопросы? Пиши! 🚀

***

*Создано для вашего Vue-курса. Версия: Day 3 (2025-11-10).*

