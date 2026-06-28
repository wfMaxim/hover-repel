import { clamp, getNumber } from "./utils";
import { getPointerMovement, startPointerTracker } from "./pointer";

export type RepelOptions = {
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

const defaults: Required<RepelOptions> = {
  minStrength: 18,
  maxStrength: 75,
  speedMultiplier: 130,

  minRotate: 8,
  maxRotate: 26,
  rotateMultiplier: 55,

  resetDelay: 300,

  containerSelector: "[data-repel-container]",
  autoWrap: true
};

function createWrapper(target: HTMLElement) {
  const display = window.getComputedStyle(target).display;
  const wrapper = document.createElement(display === "inline" ? "span" : "div");

  wrapper.dataset.repelContainer = "";

  target.parentNode?.insertBefore(wrapper, target);
  wrapper.appendChild(target);

  return wrapper;
}

export function attachRepel(
  target: HTMLElement,
  options: RepelOptions = {}
) {
  const config = {
    ...defaults,
    ...options
  };

  startPointerTracker();

  let container = target.closest<HTMLElement>(config.containerSelector);

  if (!container && config.autoWrap) {
    container = createWrapper(target);
  }

  if (!container) {
    container = target;
  }

  let resetTimeout: number | undefined;
  let previousPointerEvents: string | undefined;

  const disablePointerEvents = () => {
    if (previousPointerEvents !== undefined) {
      return;
    }

    previousPointerEvents = target.style.pointerEvents;
    target.style.pointerEvents = "none";
  };

  const restorePointerEvents = () => {
    if (previousPointerEvents === undefined) {
      return;
    }

    target.style.pointerEvents = previousPointerEvents;
    previousPointerEvents = undefined;
  };

  const onPointerEnter = () => {
    if (resetTimeout !== undefined) {
      clearTimeout(resetTimeout);
      resetTimeout = undefined;
    }

    const { moveX, moveY, mouseSpeed } = getPointerMovement();

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
    disablePointerEvents();

    resetTimeout = window.setTimeout(() => {
      target.style.setProperty("--repel-x", "0px");
      target.style.setProperty("--repel-y", "0px");
      target.style.setProperty("--repel-r", "0deg");
      restorePointerEvents();
      resetTimeout = undefined;
    }, resetDelay);
  };

  container.addEventListener("pointerenter", onPointerEnter);

  return () => {
    container.removeEventListener("pointerenter", onPointerEnter);

    if (resetTimeout !== undefined) {
      clearTimeout(resetTimeout);
    }

    restorePointerEvents();

    target.style.removeProperty("--repel-x");
    target.style.removeProperty("--repel-y");
    target.style.removeProperty("--repel-r");
  };
}
