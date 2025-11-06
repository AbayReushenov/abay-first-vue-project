## Да, бест-практисы **однозначно подтверждают** SFC подход

### Официальная позиция Vue

**SFC — это рекомендованный подход** от команды Vue для всех современных приложений. Вот прямая цитата из официальной документации:[^1][^2][^3]

> "SFC is a **defining feature of Vue** as a framework, and is the **recommended approach** for using Vue in the following scenarios: Single-Page Applications (SPA), Static Site Generation (SSG), Any non-trivial frontend where a build step can be justified."[^1]

Это не просто "одна из опций" — это **определяющая черта** Vue как фреймворка.[^2][^1]

### Почему SFC считается best practice

**1. Колокация связанных концепций (Colocation of concerns)**

Официальная документация Vue прямо отвечает на вопрос "а как же разделение ответственностей?":[^2][^1]

> "**Separation of concerns is not equal to separation of file types.** The ultimate goal of engineering principles is to improve the maintainability of codebases."[^1]

Шаблон, логика и стили **связаны** — они описывают один компонент. Разделять их по файлам — это догматизм, который не улучшает поддерживаемость кода.[^4][^2][^1]

**2. Преимущества из коробки**

SFC дают:[^5][^4][^2][^1]

- ✅ **Component-scoped CSS** — изоляция стилей без CSS-in-JS[^6][^7][^8]
- ✅ **Pre-compiled templates** — нет накладных расходов на runtime компиляцию[^1]
- ✅ **Hot Module Replacement (HMR)** — обновление только изменённого блока[^2][^1]
- ✅ **IDE support** — автодополнение, проверка типов в шаблонах[^9][^1]
- ✅ **Cross-analysis optimizations** — компилятор анализирует template и script вместе для оптимизаций[^1]

**3. Поддержка сообщества и экосистемы**

Вся экосистема Vue построена вокруг SFC:[^3][^5][^2]

- Vue Router примеры — в SFC
- Pinia документация — в SFC
- Все UI-библиотеки (Vuetify, Element Plus, PrimeVue) — в SFC[^10]
- Все обучающие материалы и курсы — в SFC[^11][^12]


### Мнение разработчиков: React vs Vue SFC

**React-разработчики, перешедшие на Vue, часто хвалят SFC:**

> "I totally agree it's always simpler to work with Vue, especially because it adopts the concept of SFC. So there is no need to mix Javascript with HTML and CSS."[^13]

> "The way React handles component-level CSS is a mess compared to Vue's SFC approach and `<style scoped>`."[^14]

> "Vue's SFC format is designed to encourage a structured approach."[^15]

**Даже критики SFC признают:**

> "While Vue's SFC format is designed to encourage a structured approach, it can also introduce unnecessary friction when refactoring."[^15]

Но это спорно — другие разработчики отмечают обратное:[^14]

> "SFCs, I'm not entirely sure I agree with them tending to encourage bloated components. The length of code is up to you."[^14]

### Official Style Guide: что говорит

**Vue Style Guide (Priority A — Essential)** не диктует обязательность SFC, но:[^16][^3]

- **Priority B (Strongly Recommended):** каждый компонент в отдельном файле[^3]

```
- **Priority C (Recommended):** порядок блоков в SFC — `<template>`, `<script>`, `<style>`[^17][^3]
```

Это подтверждает, что SFC — **стандарт индустрии** для Vue.[^5][^16][^3]

### Но есть оговорка

Официальная документация признаёт:[^2][^1]

> "That said, we do realize there are scenarios where SFCs can feel like overkill. This is why Vue can still be used via plain JavaScript without a build step."[^1]

И далее:

> "Note even if you don't like the idea of Single-File Components, you can still leverage its hot-reloading and pre-compilation features by separating your JavaScript and CSS into separate files using **Src Imports**."[^1]

То есть ты можешь разделить код на файлы, но всё равно использовать `.vue` как "обёртку".[^2][^1]

### Альтернативы: когда отходить от SFC

**JSX/TSX вместо SFC:**

Сообщество признаёт, что для React-разработчиков JSX может быть комфортнее:[^18][^19][^20]

> "You can use JSX in Vue, too. In some cases, I don't mind it."[^19]

Но это **меньшинство**. Большинство Vue-разработчиков предпочитают SFC.[^18][^13]

**Composables вместо больших SFC:**

Best practice — выносить логику в composables (как React hooks):[^21]

```typescript
// composables/useCounter.ts
export function useCounter() {
  const count = ref(0);
  const increment = () => count.value++;
  return { count, increment };
}
```

```vue
<!-- Counter.vue (остаётся маленьким) -->
<template>
  <button @click="increment">{{ count }}</button>
</template>

<script setup lang="ts">
import { useCounter } from '@/composables/useCounter';
const { count, increment } = useCounter();
</script>
```

Это решает проблему "bloated components".[^21][^14]

### Итоговая рекомендация

| Сценарий | Подход | Причина |
| :-- | :-- | :-- |
| **Стандартная разработка** | SFC | Официальная рекомендация, экосистема, tooling[^2][^1][^3] |
| **Сложная логика** | SFC + Composables | Best practice для переиспользования[^21] |
| **Ты ненавидишь templates** | JSX/TSX | Vue поддерживает, но меньшинство[^20][^18] |
| **Без build step** | CDN + templates | Для простых случаев[^1] |

### Финальный вердикт

**Да, SFC — это best practice**, подтверждённый:

1. **Официальной документацией Vue**[^3][^2][^1]
2. **Экосистемой и сообществом**[^10][^13][^11]
3. **Tooling и IDE поддержкой**[^9]
4. **Мнением большинства разработчиков**[^13][^14]

Попробуй SFC хотя бы неделю. Если через неделю всё ещё некомфортно — используй composables для вынесения логики или переключись на JSX. Но шанс, что ты привыкнешь к SFC и полюбишь их — очень высок.[^20][^4][^5][^13][^21][^14]
<span style="display:none">[^22][^23][^24][^25][^26][^27][^28][^29][^30][^31][^32][^33][^34][^35]</span>

<div align="center">⁂</div>

[^1]: https://vuejs.org/guide/scaling-up/sfc

[^2]: https://ru.vuejs.org/guide/scaling-up/sfc

[^3]: https://vuejs.org/style-guide/rules-strongly-recommended.html

[^4]: https://purpleschool.ru/knowledge-base/article/sfc

[^5]: https://delvingdeveloper.com/posts/vuejs-sfc-structure-practices

[^6]: https://vuejs.org/api/sfc-css-features

[^7]: https://habr.com/ru/articles/587604/

[^8]: https://vuejs.org/api/sfc-css-features.html

[^9]: https://vuejs.org/guide/scaling-up/tooling

[^10]: https://prismic.io/blog/vue-component-libraries

[^11]: https://dev.to/jacobandrewsky/top-10-vuejs-libraries-you-should-be-using-in-2025-4bop

[^12]: https://stateofvue.framer.website

[^13]: https://dev.to/domagojvidovic/vue-js-vs-react-not-your-usual-comparison-2omm

[^14]: https://www.reddit.com/r/vuejs/comments/1etdoi5/has_anyone_moved_from_vue_to_react_for_a_heavy/

[^15]: https://foreignerds.com/revisiting-my-thoughts-on-react-vs-vue/

[^16]: https://vuejs.org/v2/style-guide/

[^17]: https://vuejs.org/style-guide/rules-recommended

[^18]: https://www.reddit.com/r/vuejs/comments/w19pze/should_i_use_tsx_or_vue_for_components_in_vuejs/

[^19]: https://dev.to/patarapolw/why-would-people-hate-react-or-jsx-but-not-vue-sfc-or-even-angular-o4a

[^20]: https://purpleschool.ru/knowledge-base/article/jsx

[^21]: https://dev.to/jacobandrewsky/good-practices-and-design-patterns-for-vue-composables-24lk

[^22]: https://livecodes.io/docs/languages/vue/

[^23]: https://vuejs.org/api/sfc-spec

[^24]: https://ru.vuejs.org/guide/essentials/component-basics

[^25]: https://github.com/zauberzeug/nicegui/discussions/1992

[^26]: https://stackoverflow.com/questions/58378154/what-is-best-practice-for-image-src-in-vue-sfc

[^27]: https://purpleschool.ru/knowledge-base/article/web

[^28]: https://www.kevinpeters.net/learn-to-refactor-vue-js-sf-cs-in-a-real-world-example

[^29]: https://vueschool.io/articles/vuejs-tutorials/how-to-structure-a-large-scale-vue-js-application/

[^30]: https://www.bacancytechnology.com/blog/vue-js-best-practices

[^31]: https://learnvue.co/articles/vue-best-practices

[^32]: https://betterprogramming.pub/when-to-use-vue-over-react-9a4e0f01e064

[^33]: https://vuejs.org/guide/best-practices/performance

[^34]: https://fadamakis.com/learning-vue-for-react-developers-602d0f98755a

[^35]: https://www.reddit.com/r/vuejs/comments/1ldovef/how_do_you_stay_updated_with_vuejs_best_practices/

