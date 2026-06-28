# Hover Repel

A tiny interaction library that makes elements react to your cursor with a quick directional “repel” movement.

Instead of sticking to the cursor like a magnetic hover effect, Hover Repel pushes the element away based on the direction and speed of your pointer. Fast movement creates a stronger impact, while the element smoothly snaps back into place.

It works with plain HTML, vanilla JavaScript, Vue, Nuxt, React, Astro, and most modern front-end setups.

---

## Features

- Direction-aware hover movement
- Speed-based movement strength
- Optional rotation/tilt effect
- Simple `data-repel` API for vanilla projects
- Vue directive support with `v-repel`
- Nuxt-friendly setup
- Optional custom hitbox with `data-repel-container`
- Automatically creates a wrapper when needed
- Lightweight and dependency-free core
- TypeScript support
- Respects `prefers-reduced-motion`

---

## Installation

```bash
npm install hover-repel
```

or

```bash
pnpm add hover-repel
```

or

```bash
yarn add hover-repel
```

---

## Quick Start

### Vanilla JavaScript

Add `data-repel` to any element you want to animate.

```html
<div data-repel class="card">
  Hover me
</div>
```

Then initialize Hover Repel:

```js
import { repel } from "hover-repel";
import "hover-repel/style.css";

repel();
```

That’s it.

---

## Vue Quick Start

Install the Vue plugin once in your app.

```ts
// main.ts
import { createApp } from "vue";
import App from "./App.vue";

import HoverRepelVue from "hover-repel/vue";
import "hover-repel/style.css";

const app = createApp(App);

app.use(HoverRepelVue);

app.mount("#app");
```

Then use `v-repel` anywhere:

```vue
<template>
  <button v-repel class="button">
    Hover me
  </button>
</template>
```

---

## Nuxt Quick Start

In Nuxt, load the CSS globally and register the Vue plugin on the client.

### 1. Add the CSS

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ["hover-repel/style.css"]
});
```

### 2. Create a client plugin

```ts
// plugins/hover-repel.client.ts
import HoverRepelVue from "hover-repel/vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(HoverRepelVue);
});
```

### 3. Use it in components

```vue
<template>
  <div v-repel class="card">
    Hover me
  </div>
</template>
```

Because the plugin file ends in `.client.ts`, Nuxt only runs it in the browser. This is the safest setup for DOM-based hover effects.

---

## Basic Styling Example

```html
<button data-repel class="button">
  Get started
</button>
```

```css
.button {
  padding: 1rem 1.5rem;
  border: 0;
  border-radius: 999px;
  background: #31e981;
  color: #111;
  font-weight: 700;
  cursor: pointer;
}
```

```js
import { repel } from "hover-repel";
import "hover-repel/style.css";

repel();
```

When the pointer enters the element, it moves slightly in the direction of the cursor movement and then returns to its original position.

---

## How It Works

Hover Repel uses two concepts:

```html
<div data-repel-container>
  <div data-repel></div>
</div>
```

The container acts as the stable hover area.  
The repel element is the element that visually moves.

This prevents flickering, because the hitbox stays in place while the child element moves away from the pointer.

---

## Easiest Usage

You can use only `data-repel`:

```html
<div data-repel class="box"></div>
```

Hover Repel will automatically wrap the element internally so the hover area stays stable.

This is the easiest option for most projects.

---

## Advanced Usage With Custom Container

For more control, define the container yourself:

```html
<div data-repel-container class="box-hitbox">
  <div data-repel class="box"></div>
</div>
```

This is useful when you want a larger hitbox, custom spacing, or full control over the layout.

```css
.box-hitbox {
  display: grid;
  place-items: center;
  padding: 2rem;
}

.box {
  width: 160px;
  height: 160px;
  border-radius: 2rem;
  background: hotpink;
}
```

---

## Vue Usage

### Global Plugin

```ts
import { createApp } from "vue";
import App from "./App.vue";

import HoverRepelVue from "hover-repel/vue";
import "hover-repel/style.css";

const app = createApp(App);

app.use(HoverRepelVue);

app.mount("#app");
```

Then:

```vue
<template>
  <div v-repel class="card">
    Hover me
  </div>
</template>
```

---

### Vue With Options

You can pass options directly to the directive:

```vue
<template>
  <button
    v-repel="{
      maxStrength: 100,
      maxRotate: 35,
      resetDelay: 250
    }"
    class="button"
  >
    Hover me harder
  </button>
</template>
```

---

### Vue Global Defaults

You can also set global defaults when installing the plugin:

```ts
app.use(HoverRepelVue, {
  maxStrength: 90,
  maxRotate: 30,
  resetDelay: 250
});
```

Then every `v-repel` element uses those defaults:

```vue
<template>
  <button v-repel>
    Uses global settings
  </button>
</template>
```

You can still override options per element:

```vue
<template>
  <button v-repel="{ maxStrength: 120 }">
    Stronger than the global default
  </button>
</template>
```

---

### Local Vue Directive

If you do not want to register the plugin globally, you can import the directive locally.

```vue
<script setup lang="ts">
import { vRepel } from "hover-repel/vue";
import "hover-repel/style.css";
</script>

<template>
  <button v-repel>
    Hover me
  </button>
</template>
```

In Vue `<script setup>`, imported directives named like `vSomething` can be used in the template as `v-something`.

---

## Nuxt Usage

### Recommended Nuxt Setup

Use a client plugin:

```ts
// plugins/hover-repel.client.ts
import HoverRepelVue from "hover-repel/vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(HoverRepelVue);
});
```

Add the CSS globally:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ["hover-repel/style.css"]
});
```

Then use `v-repel` in any page or component:

```vue
<template>
  <section>
    <NuxtLink v-repel to="/contact" class="cta">
      Contact us
    </NuxtLink>
  </section>
</template>
```

---

### Nuxt With Global Defaults

```ts
// plugins/hover-repel.client.ts
import HoverRepelVue from "hover-repel/vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(HoverRepelVue, {
    maxStrength: 90,
    maxRotate: 30,
    resetDelay: 250
  });
});
```

---

## React Usage

React can use the vanilla API.

```jsx
import { useEffect, useRef } from "react";
import { attachRepel } from "hover-repel";
import "hover-repel/style.css";

export function Card() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const destroy = attachRepel(ref.current);

    return () => {
      destroy();
    };
  }, []);

  return (
    <div ref={ref} data-repel className="card">
      Hover me
    </div>
  );
}
```

You can also initialize all `[data-repel]` elements with `repel()` if your page is mostly static.

```jsx
import { useEffect } from "react";
import { repel } from "hover-repel";
import "hover-repel/style.css";

export function Page() {
  useEffect(() => {
    const destroy = repel();

    return () => {
      destroy();
    };
  }, []);

  return (
    <div data-repel className="card">
      Hover me
    </div>
  );
}
```

---

## Data Attributes

| Attribute | Description | Default |
| --- | --- | --- |
| `data-repel` | Marks the element that should move | Required for vanilla usage |
| `data-repel-container` | Marks the stable hover area | Optional |
| `data-repel-strength` | Maximum movement distance in pixels | `75` |
| `data-repel-rotate` | Maximum rotation in degrees | `26` |
| `data-repel-reset` | Delay before returning to rest in milliseconds | `300` |

Example:

```html
<div
  data-repel
  data-repel-strength="90"
  data-repel-rotate="30"
  data-repel-reset="250"
>
  Hover me
</div>
```

In Vue, the directive automatically adds `data-repel`, so this is enough:

```vue
<template>
  <div v-repel>
    Hover me
  </div>
</template>
```

You can still use the attributes if you want:

```vue
<template>
  <div
    v-repel
    data-repel-strength="100"
    data-repel-rotate="35"
  >
    Hover me
  </div>
</template>
```

---

## JavaScript API

### `repel(options?)`

Initializes all matching repel elements.

```js
import { repel } from "hover-repel";

const destroy = repel();
```

With options:

```js
const destroy = repel({
  root: document.querySelector(".section"),
  maxStrength: 90,
  maxRotate: 30,
  resetDelay: 250
});
```

Returns a cleanup function.

```js
destroy();
```

---

### `attachRepel(element, options?)`

Attaches the effect to one element.

```js
import { attachRepel } from "hover-repel";

const element = document.querySelector(".card");

const destroy = attachRepel(element);
```

This is useful when working with components, dynamic elements, or frameworks.

---

## Options

```ts
type RepelOptions = {
  minStrength?: number;
  maxStrength?: number;
  speedMultiplier?: number;

  minRotate?: number;
  maxRotate?: number;
  rotateMultiplier?: number;

  resetDelay?: number;

  containerSelector?: string;
  autoWrap?: boolean;
};
```

For the `repel()` function, you can also pass:

```ts
type RepelInitOptions = RepelOptions & {
  root?: ParentNode;
  targetSelector?: string;
};
```

---

## Option Reference

| Option | Description | Default |
| --- | --- | --- |
| `root` | Root element used by `repel()` to find targets | `document` |
| `targetSelector` | Selector used by `repel()` to find moving elements | `[data-repel]` |
| `containerSelector` | Selector used to find the stable hover container | `[data-repel-container]` |
| `autoWrap` | Automatically creates a wrapper when no container exists | `true` |
| `minStrength` | Minimum movement distance | `18` |
| `maxStrength` | Maximum movement distance | `75` |
| `speedMultiplier` | How much pointer speed affects movement | `130` |
| `minRotate` | Minimum rotation amount | `8` |
| `maxRotate` | Maximum rotation amount | `26` |
| `rotateMultiplier` | How much pointer speed affects rotation | `55` |
| `resetDelay` | Delay before the element returns to rest | `300` |

---

## CSS Variables

Hover Repel uses CSS variables for the transform:

```css
[data-repel] {
  --repel-x: 0px;
  --repel-y: 0px;
  --repel-r: 0deg;
}
```

You can customize the animation timing:

```css
[data-repel] {
  --repel-duration: 900ms;
  --repel-ease: cubic-bezier(.16, 1.8, .35, 1);
}
```

---

## Styling Example

```css
.card {
  width: 220px;
  height: 280px;
  border-radius: 2rem;
  background: linear-gradient(135deg, #31e981, #16c7ff);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25);
}
```

```html
<div data-repel class="card"></div>
```

For Vue:

```vue
<template>
  <div v-repel class="card"></div>
</template>
```

---

## Reduced Motion

Hover Repel includes a reduced-motion fallback by default.

```css
@media (prefers-reduced-motion: reduce) {
  [data-repel] {
    transition: none;
    transform: none;
  }
}
```

Users who prefer reduced motion will not get the animated movement effect.

---

## Recommended Markup

For most vanilla projects:

```html
<div data-repel></div>
```

For maximum layout control:

```html
<div data-repel-container>
  <div data-repel></div>
</div>
```

For Vue and Nuxt:

```vue
<template>
  <div v-repel></div>
</template>
```

Use the automatic wrapper for speed.  
Use the manual container when you care about the exact hitbox, spacing, or layout behavior.

---

## Package Exports

```ts
import { repel, attachRepel } from "hover-repel";
import HoverRepelVue, { vRepel } from "hover-repel/vue";
import "hover-repel/style.css";
```

Available exports:

| Import | Description |
| --- | --- |
| `hover-repel` | Vanilla JavaScript API |
| `hover-repel/vue` | Vue plugin and directive |
| `hover-repel/style.css` | Required CSS styles |

---

## Browser Support

Hover Repel uses modern pointer events and CSS transforms.

It works in all modern browsers, including:

- Chrome
- Edge
- Firefox
- Safari

---

## Why Not Just Use `:hover`?

CSS hover effects are great, but they usually do not know where the pointer came from or how fast it moved.

Hover Repel tracks pointer movement globally, then uses that movement direction and speed when the pointer enters an element. This creates a more physical, responsive interaction.

---

## Common Issues

### The effect does not work

Make sure you imported the CSS:

```js
import "hover-repel/style.css";
```

In Nuxt, add it to `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  css: ["hover-repel/style.css"]
});
```

---

### It works only on the first page load in Nuxt

Use the Vue plugin/directive setup instead of calling `repel()` manually.

```ts
// plugins/hover-repel.client.ts
import HoverRepelVue from "hover-repel/vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(HoverRepelVue);
});
```

Then use:

```vue
<div v-repel></div>
```

---

### The layout changes unexpectedly

Hover Repel automatically creates a wrapper when no `data-repel-container` exists.

If you want full layout control, create the container yourself:

```html
<div data-repel-container>
  <div data-repel></div>
</div>
```

Or disable automatic wrapping in JavaScript:

```js
repel({
  autoWrap: false
});
```

---

## License

MIT

---

## Author

Made with care for playful interfaces.
