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

const defaults: Required<Omit<RepelOptions, "root">> = {
  targetSelector: "[data-repel]",
  containerSelector: "[data-repel-container]",
  autoWrap: true,

  minStrength: 18,
  maxStrength: 75,
  speedMultiplier: 130,

  minRotate: 8,
  maxRotate: 26,
  rotateMultiplier: 55,

  resetDelay: 300,
};

const clamp = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value));
};

const getNumber = (
  element: HTMLElement,
  name: string,
  fallback: number
) => {
  const value = element.dataset[name];
  if (!value) return fallback;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

function createWrapper(target: HTMLElement) {
  const display = window.getComputedStyle(target).display;
  const isInline = display === "inline" || display === "inline-block";

  const wrapper = document.createElement(isInline ? "span" : "div");
  wrapper.dataset.repelContainer = "";

  target.parentNode?.insertBefore(wrapper, target);
  wrapper.appendChild(target);

  return wrapper;
}

export function repel(options: RepelOptions = {}) {
  const config = {
    ...defaults,
    ...options,
  };

  const root = options.root ?? document;

  let lastX = 0;
  let lastY = 0;
  let lastTime = performance.now();

  let moveX = 0;
  let moveY = 0;
  let mouseSpeed = 0;

  const resetTimeouts = new Map<HTMLElement, number>();
  const controller = new AbortController();

  window.addEventListener(
    "pointermove",
    (event) => {
      const now = performance.now();
      const dt = Math.max(now - lastTime, 16);

      moveX = event.clientX - lastX;
      moveY = event.clientY - lastY;

      mouseSpeed = Math.hypot(moveX, moveY) / dt;

      lastX = event.clientX;
      lastY = event.clientY;
      lastTime = now;
    },
    { signal: controller.signal }
  );

  const targets = Array.from(
    root.querySelectorAll<HTMLElement>(config.targetSelector)
  );

  for (const target of targets) {
    let container = target.closest<HTMLElement>(config.containerSelector);

    if (!container && config.autoWrap) {
      container = createWrapper(target);
    }

    if (!container) {
      container = target;
    }

    container.addEventListener(
      "pointerenter",
      () => {
        const existingTimeout = resetTimeouts.get(target);

        if (existingTimeout) {
          clearTimeout(existingTimeout);
        }

        const distance = Math.hypot(moveX, moveY) || 1;

        const directionX = moveX / distance;
        const directionY = moveY / distance;

        const maxStrength = getNumber(
          target,
          "repelStrength",
          config.maxStrength
        );

        const maxRotate = getNumber(
          target,
          "repelRotate",
          config.maxRotate
        );

        const resetDelay = getNumber(
          target,
          "repelReset",
          config.resetDelay
        );

        const moveStrength = clamp(
          15 + mouseSpeed * config.speedMultiplier,
          config.minStrength,
          maxStrength
        );

        const rotateStrength = clamp(
          6 + mouseSpeed * config.rotateMultiplier,
          config.minRotate,
          maxRotate
        );

        const rotation = -directionX * directionY * rotateStrength;

        target.style.setProperty("--repel-x", `${directionX * moveStrength}px`);
        target.style.setProperty("--repel-y", `${directionY * moveStrength}px`);
        target.style.setProperty("--repel-r", `${rotation}deg`);

        const timeout = window.setTimeout(() => {
          target.style.setProperty("--repel-x", "0px");
          target.style.setProperty("--repel-y", "0px");
          target.style.setProperty("--repel-r", "0deg");
        }, resetDelay);

        resetTimeouts.set(target, timeout);
      },
      { signal: controller.signal }
    );
  }

  return () => {
    controller.abort();

    for (const timeout of resetTimeouts.values()) {
      clearTimeout(timeout);
    }

    resetTimeouts.clear();
  };
}