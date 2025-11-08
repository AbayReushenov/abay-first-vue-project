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
