# Hover Repel

![Hover Repel demo](./assets/demo.gif)

A tiny hover interaction library that makes elements react to your cursor with a quick directional “repel” movement.

Hover Repel pushes an element away based on the direction and speed of your pointer, then smoothly returns it to its original position. It is great for buttons, cards, icons, badges, product items, playful UI details, and landing pages.

---

## Features

- Direction-aware hover movement
- Speed-based movement strength
- Optional rotation/tilt effect
- Works with vanilla HTML/JS, Vue, Nuxt, React, Astro, and more
- Simple `data-repel` API
- Vue directive support with `v-repel`
- Optional stable hitbox with `data-repel-container`
- Automatically creates a wrapper when needed
- Lightweight core
- TypeScript support
- Reduced-motion friendly

---

## Installation

```bash
npm install hover-repel
```

```bash
pnpm add hover-repel
```

```bash
yarn add hover-repel
```

---

## Vanilla HTML / JavaScript

Use the browser build from a CDN.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/hover-repel/dist/style.css">

<div data-repel class="card">
  Hover me
</div>

<script src="https://cdn.jsdelivr.net/npm/hover-repel/dist/browser.global.js"></script>
<script>
  HoverRepel.repel();
</script>
```

Example page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hover Repel Demo</title>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/hover-repel/dist/style.css">

  <style>
    body {
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: #111;
    }

    .card {
      width: 180px;
      height: 240px;
      border-radius: 24px;
      background: #31e981;
    }
  </style>
</head>
<body>
  <div data-repel class="card"></div>

  <script src="https://cdn.jsdelivr.net/npm/hover-repel/dist/browser.global.js"></script>
  <script>
    HoverRepel.repel();
  </script>
</body>
</html>
```

You can also use local files:

```html
<link rel="stylesheet" href="./style.css">

<div data-repel class="card"></div>

<script src="./browser.global.js"></script>
<script>
  HoverRepel.repel();
</script>
```

---

## Bundler Usage

For Vite, Webpack, Parcel, Astro, React, Vue, Nuxt, and other bundlers:

```js
import { repel } from "hover-repel";
import "hover-repel/style.css";

repel();
```

Basic markup:

```html
<div data-repel class="card">
  Hover me
</div>
```

---

## How It Works

Hover Repel uses a moving element and an optional stable hitbox.

```html
<div data-repel-container>
  <div data-repel></div>
</div>
```

`data-repel-container` is the stable hover area.  
`data-repel` is the element that visually moves.

For most cases, you only need this:

```html
<div data-repel></div>
```

Hover Repel will automatically create a wrapper when needed.

Use a manual container when you want full control over the hitbox, spacing, or layout.

---

## Vue

Register the Vue plugin once:

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

With options:

```vue
<template>
  <button
    v-repel="{
      maxStrength: 100,
      maxRotate: 35,
      resetDelay: 250
    }"
  >
    Hover me harder
  </button>
</template>
```

Global defaults:

```ts
app.use(HoverRepelVue, {
  maxStrength: 90,
  maxRotate: 30,
  resetDelay: 250
});
```

Local directive usage:

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

---

## Nuxt

Add the CSS globally:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ["hover-repel/style.css"]
});
```

Create a client plugin:

```ts
// plugins/hover-repel.client.ts
import HoverRepelVue from "hover-repel/vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(HoverRepelVue);
});
```

Use it in any component:

```vue
<template>
  <NuxtLink v-repel to="/contact" class="cta">
    Contact us
  </NuxtLink>
</template>
```

With global defaults:

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

## React

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

    return () => destroy();
  }, []);

  return (
    <div ref={ref} data-repel className="card">
      Hover me
    </div>
  );
}
```

---

## Data Attributes

| Attribute | Description | Default |
| --- | --- | --- |
| `data-repel` | Element that should move | Required for vanilla usage |
| `data-repel-container` | Stable hover area | Optional |
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

In Vue/Nuxt, `v-repel` automatically adds `data-repel`.

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

Cleanup:

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

This is useful for components and dynamic elements.

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

For `repel()` you can also pass:

```ts
type RepelInitOptions = RepelOptions & {
  root?: ParentNode;
  targetSelector?: string;
};
```

| Option | Description | Default |
| --- | --- | --- |
| `root` | Root used by `repel()` to find targets | `document` |
| `targetSelector` | Selector used by `repel()` | `[data-repel]` |
| `containerSelector` | Selector for the stable hover container | `[data-repel-container]` |
| `autoWrap` | Automatically creates a wrapper when no container exists | `true` |
| `minStrength` | Minimum movement distance | `18` |
| `maxStrength` | Maximum movement distance | `75` |
| `speedMultiplier` | How much pointer speed affects movement | `130` |
| `minRotate` | Minimum rotation amount | `8` |
| `maxRotate` | Maximum rotation amount | `26` |
| `rotateMultiplier` | How much pointer speed affects rotation | `55` |
| `resetDelay` | Delay before returning to rest | `300` |

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

Customize animation timing:

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

---

## Package Exports

```ts
import { repel, attachRepel } from "hover-repel";
import HoverRepelVue, { vRepel } from "hover-repel/vue";
import "hover-repel/style.css";
```

For vanilla HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/hover-repel/dist/browser.global.js"></script>
<script>
  HoverRepel.repel();
</script>
```

---

## Common Issues

### The effect does not work

Make sure the CSS is loaded:

```js
import "hover-repel/style.css";
```

or in plain HTML:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/hover-repel/dist/style.css">
```

---

### Nuxt only works on first load

Use the Nuxt client plugin with `v-repel` instead of manually calling `repel()`.

```ts
// plugins/hover-repel.client.ts
import HoverRepelVue from "hover-repel/vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(HoverRepelVue);
});
```

---

### The layout changes unexpectedly

Hover Repel automatically creates a wrapper when no `data-repel-container` exists.

For full layout control:

```html
<div data-repel-container>
  <div data-repel></div>
</div>
```

Or disable auto wrapping:

```js
repel({
  autoWrap: false
});
```

---

## Browser Support

Hover Repel uses modern pointer events and CSS transforms. It works in all modern browsers.

---

## License

MIT
