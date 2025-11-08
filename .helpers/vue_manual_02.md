
## Composition API — полное руководство для React-разработчика
Composition API. Это аналог React Hooks, но с ключевыми отличиями.[^1][^2][^3]

***

## Что такое Composition API?

**Composition API** — это набор функций для управления состоянием и логикой компонентов в Vue 3. Он решает те же задачи, что и React Hooks: переиспользование логики, организация кода, TypeScript-поддержка.[^4][^5][^6][^7]

**Главные функции:**

- `ref()` — реактивное значение (примитивы и объекты)[^8][^9][^10]
- `reactive()` — реактивный объект[^11][^10][^8]
- `computed()` — вычисляемое значение (как `useMemo`)[^12][^13]
- `watch()` / `watchEffect()` — слежение за изменениями (как `useEffect`)[^14][^15][^12]


***

## 1. ref() — реактивные значения


### Что это?

`ref()` создаёт **реактивную обёртку** для любого значения. В JavaScript нужно обращаться через `.value`, в template — нет.[^9][^10][^8]

### Синтаксис

```typescript
import { ref } from 'vue';

const count = ref<number>(0);
const name = ref<string>('John');
const user = ref<{ name: string }>({ name: 'John' });

// Изменение значения
count.value++; // нужен .value
name.value = 'Jane';
user.value.name = 'Jane';
```


### Пример в компоненте

```vue
<template>
  <div>
    <h2>{{ count }}</h2> <!-- .value НЕ нужен в template -->
    <button @click="increment">+</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);

const increment = () => {
  count.value++; // .value нужен в JS
};
</script>
```


### Аналог в React

```tsx
// React
const [count, setCount] = useState(0);
const increment = () => setCount(count + 1);

// Vue
const count = ref(0);
const increment = () => count.value++;
```

**Ключевое отличие:** в Vue не нужна функция-сеттер, просто меняй `.value`.[^3][^8][^1]

***

## 2. reactive() — реактивные объекты

### Что это?

`reactive()` делает объект **глубоко реактивным**. Работает **только с объектами**, не с примитивами.[^10][^16][^17][^8][^11]

### Синтаксис

```typescript
import { reactive } from 'vue';

const state = reactive({
  count: 0,
  user: {
    name: 'John',
    age: 25
  }
});

// Изменение значений (.value НЕ нужен)
state.count++;
state.user.name = 'Jane';
```


### Пример в компоненте

```vue
<template>
  <div>
    <p>Count: {{ state.count }}</p>
    <p>User: {{ state.user.name }}</p>
    <button @click="state.count++">+</button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
  count: 0,
  user: { name: 'John' }
});
</script>
```


### Аналог в React

```tsx
// React (нужен отдельный useState для каждого)
const [count, setCount] = useState(0);
const [user, setUser] = useState({ name: 'John' });

// Vue (всё в одном объекте)
const state = reactive({
  count: 0,
  user: { name: 'John' }
});
```


***

## ref vs reactive: что выбрать?

| Критерий | ref | reactive |
| :-- | :-- | :-- |
| **Типы данных** | Примитивы и объекты | Только объекты[^16][^11] |
| **Синтаксис** | Нужен `.value` в JS | `.value` не нужен[^8][^17] |
| **Переназначение** | Можно `ref.value = newObj` | Нельзя! Потеря реактивности[^16][^11] |
| **Деструктуризация** | Теряет реактивность без `toRefs` | Теряет реактивность[^16][^18] |
| **Рекомендация** | **Используй везде**[^16][^19][^18] | Только для больших объектов[^16][^11] |

### Лучшая практика: используй ref везде

**Официальная рекомендация:** `ref()` для всего.[^16][^18][^19]

**Почему?**

- ✅ Универсальный (примитивы и объекты)[^16]
- ✅ `.value` явно показывает реактивность[^18][^16]
- ✅ Можно переназначать объект целиком[^17][^16]
- ✅ Меньше проблем с потерей реактивности[^18][^16]

```typescript
// ✅ Рекомендуется
const count = ref(0);
const user = ref({ name: 'John' });

// ⚠️ Используй только для больших state-объектов
const state = reactive({
  users: [],
  posts: [],
  loading: false
});
```


***

## 3. computed() — вычисляемые значения

### Что это?

`computed()` создаёт **кэшируемое** вычисляемое значение. Пересчитывается только при изменении зависимостей.[^20][^13][^12]

### Синтаксис

```typescript
import { ref, computed } from 'vue';

const firstName = ref('John');
const lastName = ref('Doe');

// Вычисляемое значение
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`;
});

console.log(fullName.value); // "John Doe"
```


### Пример в компоненте

```vue
<template>
  <div>
    <input v-model="firstName" placeholder="Имя" />
    <input v-model="lastName" placeholder="Фамилия" />
    <p>Полное имя: {{ fullName }}</p>
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
```


### Аналог в React

```tsx
// React
const fullName = useMemo(() => {
  return `${firstName} ${lastName}`;
}, [firstName, lastName]); // нужно указать зависимости вручную

// Vue
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`;
}); // зависимости отслеживаются автоматически!
```

**Ключевое отличие:** Vue **автоматически** отслеживает зависимости, не нужен массив deps.[^2][^1][^3]

### computed с записью (setter)

```typescript
const firstName = ref('John');
const lastName = ref('Doe');

const fullName = computed({
  get() {
    return `${firstName.value} ${lastName.value}`;
  },
  set(newValue: string) {
    const [first, last] = newValue.split(' ');
    firstName.value = first;
    lastName.value = last;
  }
});

fullName.value = 'Jane Smith'; // вызовет setter
```


***

## 4. watch() — слежение за изменениями

### Что это?

`watch()` выполняет **побочные эффекты** при изменении значений. Аналог `useEffect` в React.[^15][^14][^12][^2][^3]

### Синтаксис для ref

```typescript
import { ref, watch } from 'vue';

const count = ref(0);

watch(count, (newValue, oldValue) => {
  console.log(`Count изменился: ${oldValue} -> ${newValue}`);
});

count.value++; // выведет: "Count изменился: 0 -> 1"
```


### Синтаксис для reactive

```typescript
import { reactive, watch } from 'vue';

const state = reactive({ count: 0 });

// Нужна функция-геттер для свойства объекта
watch(() => state.count, (newValue, oldValue) => {
  console.log(`Count изменился: ${oldValue} -> ${newValue}`);
});
```


### Пример: API-запрос при изменении поиска

```vue
<template>
  <div>
    <input v-model="search" placeholder="Поиск..." />
    <p v-if="loading">Загрузка...</p>
    <ul v-else>
      <li v-for="item in results" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const search = ref('');
const results = ref([]);
const loading = ref(false);

watch(search, async (newValue) => {
  if (!newValue) {
    results.value = [];
    return;
  }

  loading.value = true;
  try {
    const response = await fetch(`/api/search?q=${newValue}`);
    results.value = await response.json();
  } finally {
    loading.value = false;
  }
});
</script>
```


### Аналог в React

```tsx
// React
useEffect(() => {
  if (!search) {
    setResults([]);
    return;
  }

  setLoading(true);
  fetch(`/api/search?q=${search}`)
    .then(res => res.json())
    .then(data => setResults(data))
    .finally(() => setLoading(false));
}, [search]); // нужно указать зависимости

// Vue
watch(search, async (newValue) => {
  // логика
}); // зависимость одна — search
```


### Отложенный watch (debounce)

Для оптимизации запросов используй `watchDebounced` из VueUse:[^15]

```typescript
import { watchDebounced } from '@vueuse/core';

watchDebounced(
  search,
  async (newValue) => {
    const data = await fetchPosts(newValue);
    console.log(data);
  },
  { debounce: 800 } // задержка 800ms
);
```


***

## 5. watchEffect() — автоматическое слежение

### Что это?

`watchEffect()` автоматически отслеживает **все** реактивные зависимости внутри функции.[^14][^2][^15]

### Синтаксис

```typescript
import { ref, watchEffect } from 'vue';

const count = ref(0);
const doubled = ref(0);

watchEffect(() => {
  // автоматически отслеживает count
  doubled.value = count.value * 2;
  console.log(`Count: ${count.value}, Doubled: ${doubled.value}`);
});

count.value++; // автоматически вызовет watchEffect
```


### watch vs watchEffect

| watch | watchEffect |
| :-- | :-- |
| Указываешь что отслеживать | Отслеживает всё автоматически[^2][^15] |
| Ленивый (не выполняется сразу) | Выполняется сразу[^2][^14] |
| Доступ к старому значению | Нет доступа к старому значению[^15] |

**Когда использовать:**

- `watch` — когда нужен контроль (конкретная переменная, старое значение)[^12][^14]
- `watchEffect` — когда зависимости сложные или их много[^15]

**Лучшая практика:** Если можешь заменить на `computed` — используй `computed`.[^21][^15]

```typescript
// ❌ Плохо: watchEffect для вычислений
const filteredItems = ref([]);
watchEffect(() => {
  filteredItems.value = items.value.filter(item => item.active);
});

// ✅ Хорошо: computed для вычислений
const filteredItems = computed(() =>
  items.value.filter(item => item.active)
);
```


***

## Отличия от React Hooks

### 1. Setup выполняется один раз

**React:** функция компонента выполняется при **каждом рендере**.[^1][^2][^3]

```tsx
// React
function Counter() {
  const [count, setCount] = useState(0);
  console.log('Рендер!'); // выполнится при КАЖДОМ изменении count

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**Vue:** `setup()` выполняется **один раз** при создании компонента.[^2][^3][^1]

```vue
<script setup lang="ts">
import { ref } from 'vue';

console.log('Setup!'); // выполнится ОДИН РАЗ
const count = ref(0);
</script>
```

**Преимущество:** нет проблем с порядком вызова (Rules of Hooks в React).[^3][^1][^2]

### 2. Автоматическое отслеживание зависимостей

**React:** массив deps вручную.[^1][^3]

```tsx
// React
useEffect(() => {
  console.log(count);
}, [count]); // забыл добавить? баг!

const fullName = useMemo(() => {
  return `${first} ${last}`;
}, [first, last]); // нужно помнить все зависимости
```

**Vue:** автоматически.[^2][^3][^1]

```typescript
// Vue
watch(count, () => {
  console.log(count.value);
}); // зависимость одна — count

const fullName = computed(() => {
  return `${first.value} ${last.value}`;
}); // Vue сам увидит зависимости
```


### 3. Менее строгие правила

**React Hooks:**

- ❌ Нельзя вызывать в условиях
- ❌ Нельзя вызывать в циклах
- ❌ Только в функциональных компонентах

**Vue Composition API:**

- ✅ Можно вызывать где угодно внутри `setup()`[^3][^1][^2]
- ✅ Условия и циклы не проблема

```typescript
// Vue — это нормально
if (someCondition) {
  const count = ref(0);
}
```


***

## Composables — переиспользование логики

### Что это?

**Composables** — это функции, которые инкапсулируют логику и состояние. Аналог custom hooks в React.[^5][^7][^22][^23]

### Пример: useCounter

```typescript
// composables/useCounter.ts
import { ref } from 'vue';

export function useCounter(initial = 0) {
  const count = ref(initial);

  const increment = () => count.value++;
  const decrement = () => count.value--;
  const reset = () => count.value = initial;

  return {
    count,
    increment,
    decrement,
    reset
  };
}
```

**Использование:**

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script setup lang="ts">
import { useCounter } from '@/composables/useCounter';

const { count, increment, decrement, reset } = useCounter(10);
</script>
```


### Пример: useMouse

```typescript
// composables/useMouse.ts
import { ref, onMounted, onUnmounted } from 'vue';

export function useMouse() {
  const x = ref(0);
  const y = ref(0);

  const update = (event: MouseEvent) => {
    x.value = event.pageX;
    y.value = event.pageY;
  };

  onMounted(() => window.addEventListener('mousemove', update));
  onUnmounted(() => window.removeEventListener('mousemove', update));

  return { x, y };
}
```

**Использование:**

```vue
<template>
  <p>Позиция мыши: {{ x }}, {{ y }}</p>
</template>

<script setup lang="ts">
import { useMouse } from '@/composables/useMouse';

const { x, y } = useMouse();
</script>
```


### Пример: useFetch

```typescript
// composables/useFetch.ts
import { ref } from 'vue';

export function useFetch<T>(url: string) {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(false);

  const fetch = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await window.fetch(url);
      if (!response.ok) throw new Error('Network error');
      data.value = await response.json();
    } catch (e) {
      error.value = e as Error;
    } finally {
      loading.value = false;
    }
  };

  return { data, error, loading, fetch };
}
```


***

## Лучшие практики

### 1. Используй ref для всего

```typescript
// ✅ Хорошо
const count = ref(0);
const user = ref({ name: 'John' });
const items = ref([]);

// ⚠️ Только для больших state-объектов
const state = reactive({
  users: [],
  posts: [],
  comments: []
});
```


### 2. computed для вычислений, watch для побочных эффектов

```typescript
// ✅ computed — для вычислений
const fullName = computed(() => `${first.value} ${last.value}`);

// ✅ watch — для побочных эффектов (API, localStorage, логи)
watch(search, async (value) => {
  await fetchResults(value);
});
```


### 3. Выноси логику в composables

```typescript
// ❌ Плохо: вся логика в компоненте
<script setup lang="ts">
const count = ref(0);
const doubled = computed(() => count.value * 2);
const increment = () => count.value++;
// ... ещё 100 строк
</script>

// ✅ Хорошо: логика в composable
<script setup lang="ts">
import { useCounter } from '@/composables/useCounter';
const { count, doubled, increment } = useCounter();
</script>
```


### 4. Именуй composables как `use*`

```typescript
// ✅ Хорошо
useCounter.ts
useMouse.ts
useFetch.ts

// ❌ Плохо
counter.ts
mouse.ts
fetch.ts
```


### 5. Очищай побочные эффекты

```typescript
export function useEventListener(target: EventTarget, event: string, handler: Function) {
  onMounted(() => target.addEventListener(event, handler));
  onUnmounted(() => target.removeEventListener(event, handler)); // ✅ очистка
}
```


***

## Твой план на сегодня

**Шаг 1: Создай файл для практики**

```bash
# В твоём проекте
mkdir src/composables
touch src/composables/useCounter.ts
```

**Шаг 2: Напиши useCounter**

```typescript
// src/composables/useCounter.ts
import { ref, computed } from 'vue';

export function useCounter(initial = 0) {
  const count = ref(initial);
  const doubled = computed(() => count.value * 2);

  const increment = () => count.value++;
  const decrement = () => count.value--;

  return { count, doubled, increment, decrement };
}
```

**Шаг 3: Используй в компоненте**

```vue
<!-- src/components/CounterDemo.vue -->
<template>
  <div>
    <h2>Count: {{ count }}</h2>
    <p>Doubled: {{ doubled }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script setup lang="ts">
import { useCounter } from '@/composables/useCounter';

const { count, doubled, increment, decrement } = useCounter(0);
</script>
```

**Шаг 4: Добавь watch**

```vue
<script setup lang="ts">
import { watch } from 'vue';
import { useCounter } from '@/composables/useCounter';

const { count, doubled, increment, decrement } = useCounter(0);

watch(count, (newValue, oldValue) => {
  console.log(`Count: ${oldValue} -> ${newValue}`);
});
</script>
```

**Шаг 5: Создай useFetch для API**

```typescript
// src/composables/useFetch.ts
import { ref } from 'vue';

export function useFetch<T>(url: string) {
  const data = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  const execute = async () => {
    loading.value = true;
    try {
      const res = await fetch(url);
      data.value = await res.json();
    } catch (e) {
      error.value = e as Error;
    } finally {
      loading.value = false;
    }
  };

  return { data, loading, error, execute };
}
```


***

## Итоговая шпаргалка

| Концепция | React | Vue |
| :-- | :-- | :-- |
| Состояние | `useState(0)` | `ref(0)` или `reactive({})` |
| Вычисления | `useMemo(() => ..., [deps])` | `computed(() => ...)` |
| Эффекты | `useEffect(() => ..., [deps])` | `watch(source, () => ...)` |
| Автоэффекты | — | `watchEffect(() => ...)` |
| Custom hooks | `useCustom()` | `useCustom()` (composables) |
| Deps массив | **Нужен вручную** | **Автоматически** |
| Рендер функции | Каждый раз | Один раз (setup) |


***

**Готово!** Ты освоил Composition API. Завтра переходи к директивам (`v-if`, `v-for`, `v-model`) и роутингу 🚀
<span style="display:none">[^24][^25][^26][^27][^28][^29][^30][^31][^32][^33][^34][^35][^36][^37]</span>

<div align="center">⁂</div>

[^1]: https://foreignerds.com/vue-composition-api-vs-react-hooks-aspx/

[^2]: https://www.syncfusion.com/blogs/post/vue-composition-api-vs-react-hooks

[^3]: https://ru.vuejs.org/guide/extras/composition-api-faq

[^4]: https://fatcatremote.com/it-glossary/vuejs/composition-api-vs-options-api-what-to-use-in-2025

[^5]: https://dev.to/delia_code/the-ultimate-guide-to-vue-3-composition-api-tips-and-best-practices-54a6

[^6]: https://www.zignuts.com/blog/vue-composition-api-benefits-2025

[^7]: https://vuejs.org/guide/extras/composition-api-faq.html

[^8]: https://blog.logrocket.com/reactivity-vue-3-composition-api-ref-reactive/

[^9]: https://vuejs.org/guide/essentials/reactivity-fundamentals.html

[^10]: https://ru.vuejs.org/guide/essentials/reactivity-fundamentals

[^11]: https://mokkapps.de/blog/ref-vs-reactive-what-to-choose-using-vue-3-composition-api

[^12]: https://purpleschool.ru/knowledge-base/article/computed

[^13]: https://ru.vuejs.org/guide/essentials/computed

[^14]: https://upread.ru/art.php?id=1034

[^15]: https://habr.com/ru/articles/915394/

[^16]: https://stackoverflow.com/questions/61452458/ref-vs-reactive-in-vue-3

[^17]: https://dev.to/jacobandrewsky/reactive-vs-ref-in-vue-3-whats-the-difference-1jm1

[^18]: https://vuejsdevelopers.com/2022/06/01/ref-vs-reactive/

[^19]: https://michaelnthiessen.com/ref-vs-reactive

[^20]: https://stackoverflow.com/questions/45934836/what-is-the-difference-between-watch-and-computed-methods-in-vuejs

[^21]: https://www.reddit.com/r/vuejs/comments/17lsge1/computed_vs_watch_advice/

[^22]: https://ru.vuejs.org/guide/reusability/composables

[^23]: https://purpleschool.ru/knowledge-base/article/composition

[^24]: https://www.danvega.dev/blog/vue3-ref-vs-reactive

[^25]: https://habr.com/ru/articles/668072/

[^26]: https://www.uxpin.com/studio/blog/advanced-prototyping-techniques-with-vue-3-composition-api/

[^27]: https://www.youtube.com/watch?v=Nxs-AQW5jCM

[^28]: https://expertdevelopers.in/blog/vuejs-3-composition-api-a-2025-guide-for-expert-developers

[^29]: https://ru.vuejs.org/api/reactivity-core

[^30]: https://habr.com/ru/articles/927214/

[^31]: https://tproger.ru/articles/obzor-vue-composition-api-realnost-okazalas-slozhnee

[^32]: https://habr.com/ru/companies/otus/articles/922582/

[^33]: https://www.reddit.com/r/vuejs/comments/gqemny/react_hooks_vs_vue_3_composition_api/

[^34]: https://www.youtube.com/watch?v=pyTUQUTI4mU

[^35]: https://habr.com/ru/companies/auriga/articles/753270/

[^36]: https://www.reddit.com/r/vuejs/comments/paklz8/are_there_any_good_examples_of_how_to_compose/

[^37]: https://ya.ru/neurum/c/tehnologii/q/kakie_preimuschestva_daet_primenenie_composition_3bf86d60

