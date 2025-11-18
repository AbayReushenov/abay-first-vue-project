# abay-first-vue-project

Vue 3 + TypeScript проект с примерами компонентов и работы с API.

## 🚀 Технологии

- **Vue 3** - Прогрессивный JavaScript фреймворк
- **TypeScript** - Типизированный JavaScript
- **Vite** - Быстрый сборщик и dev-сервер
- **Pinia** - State management для Vue
- **Vue Router** - Маршрутизация

## ПЛАН
**День 1: Создай проект через npm create vue@latest, изучи структуру SFC​**

**День 2: Освой Composition API — ref, reactive, computed, watch​**

**День 3: Попрактикуй директивы — v-if, v-for, v-model, v-bind, v-on​**

**День 4: Создай простое приложение (TODO, счётчик) для закрепления​**

**День 5: Подключи Pinia для управления состоянием​**



## 📋 Компоненты проекта

### Компоненты
- `Counter.vue` - Простой счетчик
- `CounterDemo.vue` - Демонстрация использования composable `useCounter`
- `Greeting.vue` - Компонент приветствия с пропсами
- `UsersList.vue` - Компонент для загрузки и отображения списка пользователей

### Composables
- `useCounter.ts` - Composable для работы со счетчиком
- `useFetch.ts` - Composable для выполнения HTTP запросов

## 🔧 Установка и запуск

### Установка зависимостей

```sh
npm install
```

### Запуск dev-сервера

```sh
npm run dev
```

Приложение будет доступно по адресу `http://localhost:5173`

### Сборка для production

```sh
npm run build
```

### Предпросмотр production сборки

```sh
npm run preview
```

### Проверка типов

```sh
npm run type-check
```

### Линтинг

```sh
npm run lint
```

### Форматирование кода

```sh
npm run format
```

## ⚠️ Важная особенность: Моковые данные вместо API

### Проблема

API `reqres.in` теперь **требует API ключ** для всех запросов, что делает его недоступным для тестирования без регистрации.

### Решение

В компоненте `UsersList.vue` используются **локальные моковые данные** вместо реального API. Это обеспечивает:
- ✅ Надежную работу без зависимости от внешних сервисов
- ✅ Отсутствие необходимости в API ключах
- ✅ Быструю загрузку данных
- ✅ Имитацию реального API с задержкой сети

### Реализация

Компонент использует локальный массив данных с имитацией асинхронной загрузки:

```typescript
const mockUsers: User[] = [
  { id: 1, email: '...', first_name: 'George', last_name: 'Bluth', avatar: '...' },
  // ... другие пользователи
];

const execute = async () => {
  loading.value = true;
  await new Promise(resolve => setTimeout(resolve, 500)); // Имитация задержки
  data.value = mockUsers;
  loading.value = false;
};
```

### Альтернатива: Использование реального API

Если нужно использовать реальный API:
1. Зарегистрируйтесь на `https://reqres.in/signup` и получите API ключ
2. Добавьте ключ в заголовки запроса через `useFetch`
3. Или используйте другой бесплатный API (например, JSONPlaceholder)

## 📁 Структура проекта

```
src/
├── components/          # Vue компоненты
│   ├── Counter.vue
│   ├── CounterDemo.vue
│   ├── Greeting.vue
│   └── UsersList.vue
├── composables/         # Композиционные функции
│   ├── useCounter.ts
│   └── useFetch.ts
├── stores/              # Pinia stores
│   └── counter.ts
├── router/              # Vue Router конфигурация
│   └── index.ts
├── App.vue              # Корневой компонент
└── main.ts              # Точка входа
```

## 🛠️ Рекомендуемые инструменты

### IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (отключите Vetur).

### Browser Setup

**Chromium-based браузеры** (Chrome, Edge, Brave и т.д.):
- [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Включите Custom Object Formatter в Chrome DevTools](http://bit.ly/object-formatters)

**Firefox**:
- [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- [Включите Custom Object Formatter в Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## 📝 TypeScript поддержка

TypeScript не может обрабатывать информацию о типах для `.vue` импортов по умолчанию, поэтому используется `vue-tsc` вместо `tsc` для проверки типов. В редакторах нужен [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) для поддержки типов `.vue` файлов.

## 📚 Дополнительная информация

- [Vite Configuration Reference](https://vite.dev/config/)
- [Vue 3 Documentation](https://vuejs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## 📄 Лицензия

Private project

---

## Конспекты по дням

- [День 1 — Создай проект через create-vue](#day-1)
- [День 2 — Composition API](#day-2)
- [Дополнение — useFetch](#day-2-1)
- [День 3 — Директивы Vue](#day-3)

<a id="day-1"></a>
### День 1 — `.helpers/vue_manual_01.md`

### Создай проект через create-vue

Это **официальный** способ создания Vue 3 проектов.

Открой терминал и выполни:

```bash
npm create vue@latest
```

Эта команда установит и запустит `create-vue` — официальный инструмент для инициализации проектов Vue.

### Шаг 3: Ответь на вопросы интерактивного мастера

После запуска команды тебе будет предложен ряд опций:

```
✔ Project name: … my-vue-app
✔ Add TypeScript? … Yes
✔ Add JSX Support? … No
✔ Add Vue Router for Single Page Application development? … Yes
✔ Add Pinia for state management? … Yes
✔ Add Vitest for Unit Testing? … No
✔ Add an End-to-End Testing Solution? … No
✔ Add ESLint for code quality? … Yes
✔ Add Prettier for code formatting? … Yes
```

**Что выбрать для первого проекта:**

- **Project name:** `my-vue-app` (или любое имя на английском)
- **Add TypeScript?** → **Yes** ✅ (главное для тебя!)
- **Add Vue Router?** → **Yes** (маршрутизация, аналог React Router)
- **Add Pinia?** → **Yes** (управление состоянием, аналог Redux)
- **Add ESLint?** → **Yes** (линтер для проверки кода)
- **Add Prettier?** → **Yes** (форматирование кода)

Остальное можно пропустить (No) для упрощения старта.[^8][^7]

### Шаг 4: Установи зависимости

После создания проекта перейди в папку и установи зависимости:[^9][^6][^2]

```bash
cd my-vue-app
npm install
```

Эта команда скачает все необходимые пакеты, включая TypeScript, Vue Router, Pinia и другие.[^4][^7]

### Шаг 5: Запусти dev-сервер

Теперь запусти локальный сервер для разработки:[^6][^4][^2]

```bash
npm run dev
```

Откроется браузер (или перейди вручную) по адресу:

```
http://localhost:5173
```

Если всё прошло успешно, ты увидишь приветственную страницу Vue 3 🎉.[^9][^2][^6]

### Шаг 6: Изучи структуру проекта

Открой проект в редакторе (рекомендую VS Code с расширением **Volar**). Структура будет такой:[^7][^4][^1]

```
my-vue-app/
├── node_modules/       # Установленные зависимости
├── public/             # Статичные файлы (favicon и т.д.)
├── src/
│   ├── assets/         # Изображения, стили
│   ├── components/     # Vue компоненты
│   ├── router/         # Настройки роутинга
│   ├── stores/         # Pinia stores (состояние)
│   ├── views/          # Страницы (компоненты-страницы)
│   ├── App.vue         # Главный компонент
│   └── main.ts         # Точка входа (обрати внимание на .ts!)
├── index.html          # HTML-шаблон
├── tsconfig.json       # Настройки TypeScript
├── vite.config.ts      # Конфигурация Vite
└── package.json        # Зависимости и скрипты
```

**Обрати внимание:**

- Файлы с расширением `.ts` вместо `.js` — это TypeScript[^1][^7]
- Компоненты в `.vue` файлах имеют блок `<script setup lang="ts">`[^10][^1]

### Шаг 10: Полезные команды для работы

```bash
# Запуск dev-сервера
npm run dev

# Сборка для продакшена
npm run build

# Просмотр собранного проекта локально
npm run preview

# Проверка типов TypeScript
npm run type-check

# Линтинг кода
npm run lint
```


### Важно: настройка редактора

**Для VS Code установи расширение:**

- **Volar** (официальное для Vue 3 + TypeScript)
Volar — это расширение (extension) для VS Code с идентификатором vue.volar. Версия 3.1.3 — это актуальная версия.​

Что это:

Volar — официальное расширение Vue для VS Code, созданное командой Vue. Оно обеспечивает:​

✅ Подсветку синтаксиса .vue файлов

✅ Автодополнение (IntelliSense) для Vue и TypeScript

✅ Подсказки типов в реальном времени

✅ Проверку ошибок TypeScript прямо в редакторе

✅ Поддержку Template Syntax (директивы v-if, v-for и т.д.)

✅ Перейти к определению (Go to Definition)

Почему это важно:

### Альтернативный способ: через Vite напрямую

```bash
code --install-extension Vue.volar
```

```bash
npm create vite@latest my-vue-app -- --template vue-ts
cd my-vue-app
npm install
npm run dev
```

Флаг `--template vue-ts` сразу создаёт проект с TypeScript.

<a id="day-2"></a>
### День 2 — `.helpers/vue_manual_02.md`

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

<a id="day-2-1"></a>
### Дополнение — `.helpers/vue_manual_02_01.md`

# Модуль  "Шаг 5: useFetch для API"


```
typescript
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

Отлично! Давай создадим компонент, который использует `useFetch` для загрузки данных из тестового API.

## Компонент для демонстрации useFetch

Создай файл `src/components/UsersList.vue`:

```vue
<template>
  <div class="users-list">
    <h2>Список пользователей</h2>

    <button @click="execute" :disabled="loading">
      {{ loading ? 'Загрузка...' : 'Загрузить пользователей' }}
    </button>

    <!-- Индикатор загрузки -->
    <p v-if="loading" class="loading">⏳ Загружаем данные...</p>

    <!-- Ошибка -->
    <div v-if="error" class="error">
      ❌ Ошибка: {{ error.message }}
    </div>

    <!-- Данные -->
    <div v-if="data && !loading" class="users">
      <div v-for="user in data" :key="user.id" class="user-card">
        <img :src="user.avatar" :alt="user.first_name" />
        <div class="user-info">
          <h3>{{ user.first_name }} {{ user.last_name }}</h3>
          <p>{{ user.email }}</p>
        </div>
      </div>
    </div>

    <!-- Состояние до загрузки -->
    <p v-if="!data && !loading && !error" class="hint">
      👆 Нажми кнопку чтобы загрузить данных
    </p>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from '@/composables/useFetch';

// Типизация данных от API
interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

// Используем тестовый API reqres.in
const { data: response, loading, error, execute } = useFetch<ApiResponse>(
  'https://reqres.in/api/users?page=1'
);

// Извлекаем массив пользователей из ответа
import { computed } from 'vue';
const data = computed(() => response.value?.data || null);
</script>

<style scoped>
.users-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

button {
  padding: 12px 24px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #359268;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.loading {
  font-size: 18px;
  color: #42b983;
  margin: 20px 0;
}

.error {
  padding: 16px;
  background-color: #fee;
  border-left: 4px solid #f44;
  border-radius: 4px;
  margin: 20px 0;
  color: #c33;
}

.hint {
  color: #666;
  font-style: italic;
  margin: 20px 0;
}

.users {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.user-card {
  display: flex;
  gap: 16px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  transition: transform 0.2s, box-shadow 0.2s;
}

.user-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.user-card img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info h3 {
  margin: 0 0 8px 0;
  color: #2c3e50;
  font-size: 18px;
}

.user-info p {
  margin: 0;
  color: #666;
  font-size: 14px;
}
</style>
```


## Добавь компонент в App.vue

```vue
<template>
  <div id="app">
    <h1>Мой первый Vue 3 + TypeScript проект</h1>

    <!-- Твой предыдущий Counter -->
    <Counter />

    <!-- Новый компонент с useFetch -->
    <UsersList />
  </div>
</template>

<script setup lang="ts">
import Counter from './components/Counter.vue';
import UsersList from './components/UsersList.vue';
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```


## Альтернатива: автозагрузка при монтировании

Если хочешь, чтобы данные загружались сразу при открытии страницы:

```vue
<script setup lang="ts">
import { onMounted } from 'vue';
import { useFetch } from '@/composables/useFetch';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ApiResponse {
  data: User[];
}

const { data: response, loading, error, execute } = useFetch<ApiResponse>(
  'https://reqres.in/api/users?page=1'
);

const data = computed(() => response.value?.data || null);

// Автозагрузка при монтировании компонента
onMounted(() => {
  execute();
});
</script>
```


## Улучшенная версия useFetch с автозагрузкой

Можешь обновить сам composable:

```typescript
// src/composables/useFetch.ts
import { ref, onMounted } from 'vue';

interface UseFetchOptions {
  immediate?: boolean; // загружать сразу?
}

export function useFetch<T>(url: string, options: UseFetchOptions = {}) {
  const data = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  const execute = async () => {
    loading.value = true;
    error.value = null; // сброс предыдущей ошибки

    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      data.value = await res.json();
    } catch (e) {
      error.value = e as Error;
    } finally {
      loading.value = false;
    }
  };

  // Автозагрузка если указано
  if (options.immediate) {
    onMounted(() => {
      execute();
    });
  }

  return { data, loading, error, execute };
}
```

Теперь можно использовать так:

```vue
<script setup lang="ts">
// Загрузка по клику
const users = useFetch<ApiResponse>('https://reqres.in/api/users?page=1');

// Или автозагрузка
const posts = useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts', {
  immediate: true
});
</script>
```


## Другие тестовые API для практики

```typescript
// JSONPlaceholder - посты
useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts')

// JSONPlaceholder - TODO
useFetch<Todo[]>('https://jsonplaceholder.typicode.com/todos')

// ReqRes - пользователи
useFetch<ApiResponse>('https://reqres.in/api/users?page=2')

// Random User API
useFetch<RandomUserResponse>('https://randomuser.me/api/?results=10')
```

Попробуй создать компонент и запустить — данные загрузятся с реального API! 🚀

<a id="day-3"></a>
### День 3 — `.helpers/vue_manual_03_day.md`

## День 3: Директивы Vue — основы шаблонов

Отлично! День 3 — переход к **шаблонам и директивам**. В React ты работал с JSX, где логика (if, for, events) пишется на JavaScript. В Vue директивы — это **специальный синтаксис** для упрощения шаблонов, который компилируется в JavaScript под капотом.[^1][^2][^3][^4]

**Почему директивы важны?** Они делают шаблоны более декларативными и читаемыми. Vue **рекомендует** использовать их в `<template>` для большинства случаев.[^2][^5][^1]

***

## Основные директивы

Все директивы начинаются с `v-` или сокращений (`:` для v-bind, `@` для v-on). Они работают только в `<template>`.[^4][^1][^2]

***

## 1. v-bind (:) — привязка атрибутов

### Что это?

`v-bind` связывает **атрибуты HTML** с данными из JavaScript. Сокращение: `:` (colon).[^1][^2]

### Синтаксис

```vue
<!-- Полная форма -->
<img v-bind:src="imageUrl" v-bind:alt="imageAlt" />

<!-- Сокращение -->
<img :src="imageUrl" :alt="imageAlt" />
```


### Пример в компоненте

```vue
<template>
  <div>
    <h2>Галерея изображений</h2>
    <input v-model="currentImage" placeholder="URL изображения" />
    <img :src="currentImage" :alt="imageAlt" :class="{ 'large': isLarge }" />
    <button @click="toggleSize">Увеличить</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const currentImage = ref('https://via.placeholder.com/150');
const isLarge = ref(false);

const imageAlt = computed(() => `Изображение: ${currentImage.value}`);

const toggleSize = () => {
  isLarge.value = !isLarge.value;
};
</script>

<style scoped>
img {
  width: 150px;
  height: auto;
  border: 1px solid #ddd;
  transition: width 0.3s;
}

.large {
  width: 300px;
}
</style>
```


### Аналог в React

```tsx
// React
<img src={currentImage} alt={imageAlt} className={isLarge ? 'large' : ''} />

// Vue
<img :src="currentImage" :alt="imageAlt" :class="{ 'large': isLarge }" />
```

**Ключевое отличие:** Vue `:class` и `:style` имеют специальные синтаксисы для объектов и массивов.[^1]

### Лучшая практика

- Используй `:` для **динамических** атрибутов (src, href, id)[^1]
- Для статичных — обычный HTML (не :id="id")
- `:class` поддерживает объекты: `:{ 'active': isActive, 'error': hasError }`[^4][^1]

***

## 2. v-on (@) — обработка событий

### Что это?

`v-on` привязывает **обработчики событий** к элементам. Сокращение: `@` (at).[^2][^1]

### Синтаксис

```vue
<!-- Полная форма -->
<button v-on:click="handleClick">Кликни</button>

<!-- Сокращение -->
<button @click="handleClick">Кликни</button>

<!-- Inline (как onClick в React) -->
<button @click="count++">Кликни</button>
```


### Пример в компоненте

```vue
<template>
  <div class="events-demo">
    <h2>Обработка событий</h2>

    <button @click="onPrimaryClick" class="primary">Основная кнопка</button>
    <button @click="onSecondaryClick" class="secondary">Вторичная кнопка</button>

    <p>Кликнуто: {{ clickCount }} раз</p>

    <!-- События с параметрами -->
    <input @input="onInput($event)" placeholder="Введи текст" />
    <p>Последний ввод: {{ lastInput }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const clickCount = ref(0);
const lastInput = ref('');

const onPrimaryClick = () => {
  clickCount.value++;
  console.log('Основная кнопка кликнута!');
};

const onSecondaryClick = () => {
  alert('Вторичная кнопка!');
  clickCount.value++;
};

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  lastInput.value = target.value;
};
</script>

<style scoped>
.events-demo {
  text-align: center;
  padding: 20px;
}

button {
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.primary {
  background-color: #42b983;
  color: white;
}

.secondary {
  background-color: #f39c12;
  color: white;
}

input {
  padding: 8px;
  margin: 10px;
  width: 200px;
}
</style>
```


### Аналог в React

```tsx
// React
<button onClick={onPrimaryClick}>Кликни</button>

// Vue
<button @click="onPrimaryClick">Кликни</button>
```

**Ключевое отличие:** В Vue можно передавать `$event` (аналог event в React), но обычно не нужно — используй composables для сложной логики.[^6][^1]

### Лучшая практика

- Используй `@` для событий (click, input, submit)[^1]
- Для сложных обработчиков — отдельные функции в `<script>`[^1]
- `@submit.prevent` — предотвращает стандартное поведение формы[^5][^1]

***

## 3. v-model — двусторонняя привязка

### Что это?

`v-model` создаёт **связь** между input/textarea и данными: изменения в UI обновляют данные, и наоборот. Аналог `value + onChange` в React.[^7][^5]

### Синтаксис

```vue
<input v-model="text" />
<select v-model="selected">
  <option value="a">A</option>
</select>
```


### Пример в компоненте

```vue
<template>
  <div class="form-demo">
    <h2>Форма с v-model</h2>

    <!-- Текст -->
    <div class="field">
      <label>Имя:</label>
      <input v-model="user.name" type="text" />
    </div>

    <!-- Email -->
    <div class="field">
      <label>Email:</label>
      <input v-model="user.email" type="email" />
    </div>

    <!-- Checkbox -->
    <div class="field">
      <label>
        <input type="checkbox" v-model="user.agree" /> Согласен с условиями
      </label>
    </div>

    <!-- Radio -->
    <div class="field">
      <label>Пол:</label>
      <input type="radio" v-model="user.gender" value="male" /> Мужской
      <input type="radio" v-model="user.gender" value="female" /> Женский
    </div>

    <!-- Select -->
    <div class="field">
      <label>Возраст:</label>
      <select v-model="user.age">
        <option value="18">18+</option>
        <option value="25">25-35</option>
        <option value="40">40+</option>
      </select>
    </div>

    <!-- Отображение данных -->
    <div class="preview">
      <h3>Данные формы:</h3>
      <pre>{{ user }}</pre>
      <button @click="saveUser">Сохранить</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const user = reactive({
  name: '',
  email: '',
  agree: false,
  gender: 'male',
  age: '18'
});

const saveUser = () => {
  console.log('Сохранён пользователь:', user);
  alert(`Сохранено: ${user.name} (${user.gender})`);
};
</script>

<style scoped>
.form-demo {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.field {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.preview {
  margin-top: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

pre {
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: left;
  font-size: 14px;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```


### Аналог в React

```tsx
// React
<input
  value={user.name}
  onChange={(e) => setUser({ ...user, name: e.target.value })}
/>

// Vue
<input v-model="user.name" />
```

**Ключевое отличие:** `v-model` автоматически обрабатывает события (input, change), упрощая код.[^5][^7]

### Лучшая практика

- `v-model` для форм (input, select, checkbox)[^7]
- Для custom компонентов — используй `v-model` с emit[^7]
- Модификаторы: `v-model.trim` (убирает пробелы), `v-model.number` (преобразует в число)[^7]

***

## 4. v-if, v-else, v-else-if — условный рендеринг

### Что это?

`v-if` рендерит элемент **только** если условие истинно. `v-else` и `v-else-if` — альтернативы.[^3]

### Синтаксис

```vue
<div v-if="isLoggedIn">Добро пожаловать!</div>
<div v-else>Войдите в систему</div>

<!-- Множественные условия -->
<div v-if="score >= 90">Отлично!</div>
<div v-else-if="score >= 70">Хорошо</div>
<div v-else-if="score >= 50">Удовлетворительно</div>
<div v-else>Неудовлетворительно</div>
```


### Пример в компоненте

```vue
<template>
  <div class="conditional-demo">
    <h2>Условный рендеринг</h2>

    <button @click="toggleLoggedIn">
      {{ isLoggedIn ? 'Выйти' : 'Войти' }}
    </button>

    <!-- Простое условие -->
    <div v-if="isLoggedIn" class="welcome">
      <h3>Добро пожаловать, {{ userName }}!</h3>
      <p>Ваш статус: {{ userRole }}</p>
    </div>
    <div v-else class="login">
      <input v-model="loginInput" placeholder="Логин" />
      <button @click="simulateLogin">Войти</button>
    </div>

    <!-- Множественные условия -->
    <div class="status">
      <h3>Статус пользователя:</h3>
      <p v-if="userRole === 'admin'" class="admin">🛡️ Администратор</p>
      <p v-else-if="userRole === 'moderator'" class="moderator">🔧 Модератор</p>
      <p v-else-if="userRole === 'user'" class="user">👤 Обычный пользователь</p>
      <p v-else class="guest">👻 Гость</p>
    </div>

    <!-- v-show для частых переключений -->
    <button :class="{ 'active': showAdvanced }" @click="toggleAdvanced">
      {{ showAdvanced ? 'Скрыть' : 'Показать' }} расширенные опции
    </button>
    <div v-show="showAdvanced" class="advanced">
      Расширенные настройки...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isLoggedIn = ref(false);
const userName = ref('Гость');
const userRole = ref('guest');
const loginInput = ref('');
const showAdvanced = ref(false);

const toggleLoggedIn = () => {
  isLoggedIn.value = !isLoggedIn.value;
  if (isLoggedIn.value) {
    userName.value = 'Иван Иванов';
    userRole.value = 'user';
  } else {
    userName.value = 'Гость';
    userRole.value = 'guest';
  }
};

const simulateLogin = () => {
  if (loginInput.value === 'admin') {
    userRole.value = 'admin';
  } else if (loginInput.value === 'mod') {
    userRole.value = 'moderator';
  } else {
    userRole.value = 'user';
  }
  isLoggedIn.value = true;
  userName.value = loginInput.value;
};

const toggleAdvanced = () => {
  showAdvanced.value = !showAdvanced.value;
};
</script>

<style scoped>
.conditional-demo {
  padding: 20px;
  text-align: center;
}

button {
  padding: 10px 20px;
  margin: 5px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.welcome, .login {
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
}

.welcome {
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
}

.login {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
}

.status p {
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  font-weight: bold;
}

.admin { background-color: #cce5ff; color: #004085; }
.moderator { background-color: #fff3cd; color: #856404; }
.user { background-color: #d1ecf1; color: #0c5460; }
.guest { background-color: #f8d7da; color: #721c24; }

.advanced {
  margin-top: 20px;
  padding: 15px;
  background-color: #e9ecef;
  border-radius: 4px;
  display: none; /* v-show не удаляет из DOM */
}
</style>
```


### Аналог в React

```tsx
// React
{isLoggedIn ? <div>Добро пожаловать!</div> : <div>Войдите</div>}

// Vue
<div v-if="isLoggedIn">Добро пожаловать!</div>
<div v-else>Войдите</div>
```

**Ключевое отличие:** `v-if` **удаляет** элемент из DOM (экономия памяти), `v-show` **скрывает** CSS-ом (быстрее для частых переключений).[^3]

### Лучшая практика

- `v-if` для условий, которые редко меняются[^3]
- `v-show` для частых переключений (табы, меню)[^3]
- **Никогда не используй `v-if` с `v-for`** — сначала `v-for`, потом `v-if`[^3]

***

## 5. v-for — рендеринг списков

### Что это?

`v-for` создаёт **циклы** для рендеринга массивов или объектов. Требует `:key` для оптимизации.[^3][^1]

### Синтаксис

```vue
<!-- Массив -->
<li v-for="item in items" :key="item.id">{{ item.name }}</li>

<!-- С индексом -->
<li v-for="(item, index) in items" :key="item.id">
  {{ index + 1 }}: {{ item.name }}
</li>

<!-- Объект -->
<div v-for="(value, key) in user" :key="key">{{ key }}: {{ value }}</div>

<!-- Число -->
<p v-for="n in 10" :key="n">{{ n }}</p>
```


### Пример в компоненте

```vue
<template>
  <div class="list-demo">
    <h2>Списки с v-for</h2>

    <!-- Добавление элементов -->
    <div class="add-item">
      <input v-model="newItem" placeholder="Новый элемент" />
      <button @click="addItem" :disabled="!newItem.trim()">Добавить</button>
    </div>

    <!-- Список задач -->
    <ul class="task-list">
      <li
        v-for="(task, index) in tasks"
        :key="task.id"
        :class="{ 'completed': task.completed }"
      >
        <span>{{ index + 1 }}.</span>
        <input type="checkbox" v-model="task.completed" />
        <span class="task-text">{{ task.text }}</span>
        <button @click="removeTask(index)" class="remove">×</button>
      </li>
    </ul>

    <p>Всего задач: {{ tasks.length }}</p>

    <!-- Фильтрация -->
    <div class="filter">
      <button @click="filter = 'all'" :class="{ active: filter === 'all' }">Все</button>
      <button @click="filter = 'active'" :class="{ active: filter === 'active' }">Активные</button>
      <button @click="filter = 'completed'" :class="{ active: filter === 'completed' }">Выполненные</button>
    </div>

    <ul class="filtered-list">
      <li v-for="task in filteredTasks" :key="task.id">
        {{ task.text }} {{ task.completed ? '(выполнено)' : '' }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const tasks = ref<Task[]>([
  { id: 1, text: 'Изучить Vue', completed: true },
  { id: 2, text: 'Создать проект', completed: false },
  { id: 3, text: 'Написать компонент', completed: false }
]);

const newItem = ref('');
const filter = ref<'all' | 'active' | 'completed'>('all');

const addItem = () => {
  if (newItem.value.trim()) {
    tasks.value.push({
      id: Date.now(),
      text: newItem.value,
      completed: false
    });
    newItem.value = '';
  }
};

const removeTask = (index: number) => {
  tasks.value.splice(index, 1);
};

const filteredTasks = computed(() => {
  if (filter.value === 'active') {
    return tasks.value.filter(task => !task.completed);
  }
  if (filter.value === 'completed') {
    return tasks.value.filter(task => task.completed);
  }
  return tasks.value;
});
</script>

<style scoped>
.list-demo {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.add-item {
  margin-bottom: 20px;
}

input {
  padding: 8px;
  width: 300px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-list li {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
  gap: 10px;
}

.completed .task-text {
  text-decoration: line-through;
  color: #999;
}

.remove {
  background-color: #e74c3c;
  color: white;
  padding: 5px 8px;
  font-size: 18px;
  line-height: 1;
  margin-left: auto;
}

.filter {
  margin: 20px 0;
}

.filter button {
  margin-right: 10px;
}

.filter button.active {
  background-color: #3498db;
}

.filtered-list {
  background-color: #e9ecef;
  padding: 15px;
  border-radius: 4px;
}

.filtered-list li {
  padding: 5px 0;
  list-style: none;
}
</style>
```


### Аналог в React

```tsx
// React
{items.map((item, index) => (
  <li key={item.id}>
    {index + 1}. {item.name}
  </li>
))}

// Vue
<li v-for="(item, index) in items" :key="item.id">
  {{ index + 1 }}. {{ item.name }}
</li>
```

**Ключевое отличие:** `v-for` интегрируется в шаблон, `key` обязателен для отслеживания изменений.[^1][^3]

### Лучшая практика

- **Всегда** используй `:key` (производительность и стабильность)[^3][^1]
- Для массивов объектов — key по уникальному ID (не index)[^1]
- Фильтрацию делай через `computed`, не в шаблоне[^3]
- `v-if` внутри `v-for` — только если редко (иначе используй `computed` для фильтрации)[^3]

***

## Сравнение с React

| Директива | React | Vue |
| :-- | :-- | :-- |
| **Атрибуты** | `src={url}` | `:src="url"` |
| **События** | `onClick={handler}` | `@click="handler"` |
| **Форма** | `value={value} onChange={...}` | `v-model="value"` |
| **Условие** | `{condition && <div>}` | `<div v-if="condition">` |
| **Список** | `{items.map(...)}` | `<li v-for="item in items">` |

**Преимущества директив:** Меньше JavaScript в шаблоне, лучше читаемость. Но ты можешь писать JSX в Vue, если хочешь.[^8][^5][^1]

***

## Твой план на сегодня

**Шаг 1: Создай директивы-демо проект**

В твоём существующем проекте создай папку `src/directives/`:

```bash
mkdir src/directives
touch src/directives/ImageDemo.vue
touch src/directives/EventsDemo.vue
touch src/directives/FormDemo.vue
touch src/directives/ConditionalDemo.vue
touch src/directives/ListDemo.vue
```

**Шаг 2: Скопируй примеры выше**

Начни с **EventsDemo.vue** и **FormDemo.vue** — они проще всего.

**Шаг 3: Добавь в App.vue**

```vue
<template>
  <div id="app">
    <h1>День 3: Директивы</h1>

    <!-- Переключение между демо -->
    <button @click="currentDemo = 'events'">События</button>
    <button @click="currentDemo = 'form'">Форма</button>
    <button @click="currentDemo = 'conditional'">Условия</button>
    <button @click="currentDemo = 'list'">Список</button>

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

const currentDemo = ref('events');
</script>
```

**Шаг 4: Экспериментируй**

- Добавь `v-model` в форму с валидацией (if на ошибки)
- Создай список с фильтрацией (`computed` + `v-for`)
- Попробуй `v-show` vs `v-if` — проверь в DevTools (DOM)

**Шаг 5: Интеграция с предыдущим**

Добавь `v-for` в твой `UsersList.vue` из дня 2:

```vue
<ul>
  <li v-for="user in users" :key="user.id">
    {{ user.first_name }}
  </li>
</ul>

<script setup lang="ts">
const users = computed(() => data.value || []);
</script>
```

**Завтра:** Компоненты, props, emits и роутинг. Ты уже освоил 70% основ! 🚀

<div align="center">⁂</div>

[^1]: https://ya.zerocoder.ru/pgt-shpargalka-po-vue-vash-kompleksnyj-pomoshhnik-po-vue-js/

[^2]: https://ru.vuejs.org/api/built-in-directives

[^3]: https://ru.vuejs.org/guide/essentials/conditional

[^4]: https://monsterlessons.com/project/lessons/standartnye-direktivy-v-vuejs

[^5]: https://foxminded.ua/ru/direktivi-vue/

[^6]: https://www.syncfusion.com/blogs/post/vue-composition-api-vs-react-hooks

[^7]: https://ru.vuejs.org/guide/components/v-model

[^8]: https://purpleschool.ru/knowledge-base/article/jsx

