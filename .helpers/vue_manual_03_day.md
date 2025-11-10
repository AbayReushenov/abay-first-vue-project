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

