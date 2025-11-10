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
