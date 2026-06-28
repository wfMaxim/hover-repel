# Hover Repel

A tiny hover interaction library that makes elements react to your cursor with a quick directional “repel” movement.

Instead of sticking to the cursor like a magnetic hover effect, Hover Repel pushes the element away based on the direction and speed of your pointer. Fast movement creates a stronger impact, while the element smoothly snaps back into place.

Perfect for buttons, cards, icons, badges, product items, playful UI details, and interactive landing pages.

---

## Features

- Direction-aware hover movement
- Speed-based movement strength
- Optional rotation/tilt effect
- Works with plain HTML, React, Vue, Nuxt, Next, Astro, and more
- Simple `data-repel` attribute API
- Optional custom hitbox with `data-repel-container`
- Automatically creates a wrapper when needed
- Lightweight and dependency-free
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

## Basic Example

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

When the pointer enters the element, it will move slightly in the direction of the cursor movement and then return to its original position.

---

## How It Works

Hover Repel uses two elements:

```html
<div data-repel-container>
  <div data-repel></div>
</div>
```

The container acts as the stable hover area.  
The repel element is the element that visually moves.

This prevents flickering, because the hitbox stays in place while the child element moves.

---

## Easiest Usage

You can use only `data-repel`:

```html
<div data-repel class="box"></div>
```

Hover Repel will automatically wrap the element internally so the hover area stays stable.

---

## Advanced Usage

For more control, you can define the container yourself:

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

## Custom Strength

You can control the movement directly in HTML:

```html
<div
  data-repel
  data-repel-strength="90"
  data-repel-rotate="30"
  data-repel-reset="300"
>
  Hover me
</div>
```

---

## Data Attributes

| Attribute | Description | Default |
| --- | --- | --- |
| `data-repel` | Marks the element that should move | Required |
| `data-repel-container` | Marks the stable hover area | Optional |
| `data-repel-strength` | Maximum movement distance in pixels | `75` |
| `data-repel-rotate` | Maximum rotation in degrees | `26` |
| `data-repel-reset` | Delay before returning to rest in milliseconds | `300` |

---

## JavaScript Options

You can also configure Hover Repel globally:

```js
repel({
  maxStrength: 90,
  maxRotate: 30,
  resetDelay: 250,
});
```

Available options:

```ts
type RepelOptions = {
  root?: ParentNode;
  targetSelector?: string;
  containerSelector?: string;
  autoWrap?: boolean;

  minStrength?: number;
  maxStrength?: number;
  speedMultiplier?: number;

  minRotate?: number;
  maxRotate?: number;
  rotateMultiplier?: number;

  resetDelay?: number;
};
```

---

## Custom Root

Initialize Hover Repel only inside a specific part of the page:

```js
const section = document.querySelector(".interactive-section");

repel({
  root: section,
});
```

This is useful for components, modals, page sections, or dynamically rendered content.

---

## Cleanup

The `repel()` function returns a cleanup function.

```js
const destroy = repel();

// Later:
destroy();
```

This removes all event listeners and clears active timers.

This is especially useful in frameworks where components mount and unmount.

---

## React Example

```jsx
import { useEffect } from "react";
import { repel } from "hover-repel";
import "hover-repel/style.css";

export function Card() {
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

## Vue / Nuxt Example

```vue
<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { repel } from "hover-repel";
import "hover-repel/style.css";

let destroy;

onMounted(() => {
  destroy = repel();
});

onBeforeUnmount(() => {
  destroy?.();
});
</script>

<template>
  <div data-repel class="card">
    Hover me
  </div>
</template>
```

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

For most cases:

```html
<div data-repel></div>
```

For maximum layout control:

```html
<div data-repel-container>
  <div data-repel></div>
</div>
```

Use the automatic wrapper for speed.  
Use the manual container when you care about the exact hitbox, spacing, or layout behavior.

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

## API

### `repel(options?)`

Initializes all matching repel elements.

```js
const destroy = repel(options);
```

Returns a cleanup function.

---

## License

MIT

---

## Author

Made with care for playful interfaces.
# hover-repel
