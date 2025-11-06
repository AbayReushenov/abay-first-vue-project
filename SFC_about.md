## **Single File Components (SFC)** — ключевая особенность Vue, которая радикально отличается от React.

### Почему это сделано так?

**Философия Vue:** один компонент = один файл со всем необходимым. Это называется **колокация** (colocation) — когда шаблон, логика и стили живут вместе, потому что они описывают **одну сущность**.[^2][^3][^1]

### Преимущества SFC

**1. Изоляция стилей через `scoped`**

```vue
<style scoped>
.button {
  color: red; /* применится только к этому компоненту! */
}
</style>
```

CSS с атрибутом `scoped` применяется **только** к текущему компоненту. Vue автоматически добавляет уникальные data-атрибуты. Это решает проблему глобального CSS без CSS-in-JS.[^1][^2]

**2. Лучшая читаемость**

Ты видишь **всю** логику компонента сразу: что он рендерит, как работает, как выглядит. Не нужно прыгать между файлами.[^3][^2]

**3. Hot Module Replacement (HMR)**

```
Vite обновляет только измененный блок (`<template>`, `<script>` или `<style>`) без перезагрузки страницы. Это быстрее чем в React.[^4][^2]
```


### Но у тебя есть альтернативы!

Если тебе некомфортно, Vue предлагает другие подходы:

#### Вариант 1: Разделить на файлы (как в React)

```typescript
// Counter.ts
import { ref } from 'vue';

export const useCounter = () => {
  const count = ref(0);
  const increment = () => count.value++;
  return { count, increment };
};
```

```vue
<!-- Counter.vue -->
<template>
  <button @click="increment">{{ count }}</button>
</template>

<script setup lang="ts">
import { useCounter } from './Counter';
const { count, increment } = useCounter();
</script>
```

Стили можно вынести в отдельный `.css` файл и импортировать:

```vue
<script setup lang="ts">
import './Counter.css';
</script>
```


#### Вариант 2: JSX вместо Template (как в React)

Vue поддерживает JSX! Создай файл `.tsx`:[^5][^6]

```tsx
// Counter.tsx
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const count = ref(0);
    const increment = () => count.value++;

    return () => (
      <div>
        <button onClick={increment}>{count.value}</button>
      </div>
    );
  }
});
```

Это **полностью** React-подход в Vue.[^6][^5]

#### Вариант 3: Композиция (Composables)

Логику выносишь в отдельные функции (как custom hooks в React):

```typescript
// composables/useCounter.ts
import { ref } from 'vue';

export function useCounter(initial = 0) {
  const count = ref(initial);
  const increment = () => count.value++;
  const decrement = () => count.value--;

  return { count, increment, decrement };
}
```

```vue
<!-- Counter.vue -->
<template>
  <div>
    <button @click="decrement">-</button>
    <span>{{ count }}</span>
    <button @click="increment">+</button>
  </div>
</template>

<script setup lang="ts">
import { useCounter } from '@/composables/useCounter';
const { count, increment, decrement } = useCounter(10);
</script>

<style scoped>
/* минимум стилей */
</style>
```


### Сравнение: React vs Vue подходы

| React | Vue SFC | Vue альтернатива |
| :-- | :-- | :-- |
| `.jsx` + CSS Modules | `.vue` (всё в одном) | `.tsx` + `.css` |
| CSS-in-JS (styled-components) | `<style scoped>` | `import './styles.css'` |
| Логика в компоненте | `<script setup>` | Composables (как hooks) |
| JSX | `<template>` | JSX в `.tsx` |

**Главное:** SFC — это **не обязательно**. Это рекомендация, а не требование.
