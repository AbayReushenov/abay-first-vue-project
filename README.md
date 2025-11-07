# abay-first-vue-project

Vue 3 + TypeScript проект с примерами компонентов и работы с API.

## 🚀 Технологии

- **Vue 3** - Прогрессивный JavaScript фреймворк
- **TypeScript** - Типизированный JavaScript
- **Vite** - Быстрый сборщик и dev-сервер
- **Pinia** - State management для Vue
- **Vue Router** - Маршрутизация

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

## ⚠️ Важная особенность: Прокси для API

### Проблема

API `reqres.in` требует API ключ при прямых запросах из браузера, что приводит к ошибке `401 Unauthorized`.

### Решение

В проекте настроен **прокси через Vite** для обхода этой проблемы. Все запросы к `/api/*` автоматически проксируются на `https://reqres.in` через сервер разработки.

### Конфигурация прокси

В файле `vite.config.ts` настроен прокси:

```typescript
server: {
  proxy: {
    '/api': {
      target: 'https://reqres.in',
      changeOrigin: true,
    },
  },
}
```

### Использование в компонентах

В компонентах используйте **относительные URL** с префиксом `/api`:

```typescript
// ✅ Правильно - через прокси
const { data, loading, error, execute } = useFetch<ApiResponse>(
  '/api/users?page=1'
);

// ❌ Неправильно - прямой запрос (будет ошибка 401)
const { data, loading, error, execute } = useFetch<ApiResponse>(
  'https://reqres.in/api/users?page=1'
);
```

### Важно

- **Прокси работает только в режиме разработки** (`npm run dev`)
- Для production сборки необходимо настроить прокси на production сервере (nginx, Apache и т.д.)
- При изменении `vite.config.ts` необходимо **перезапустить dev-сервер**

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
