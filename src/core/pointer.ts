let isListening = false;

let lastX = 0;
let lastY = 0;
let lastTime = performance.now();

let moveX = 0;
let moveY = 0;
let mouseSpeed = 0;

function onPointerMove(event: PointerEvent) {
  const now = performance.now();
  const dt = Math.max(now - lastTime, 16);

  moveX = event.clientX - lastX;
  moveY = event.clientY - lastY;

  mouseSpeed = Math.hypot(moveX, moveY) / dt;

  lastX = event.clientX;
  lastY = event.clientY;
  lastTime = now;
}

export function startPointerTracker() {
  if (isListening) return;

  isListening = true;
  window.addEventListener("pointermove", onPointerMove, { passive: true });
}

export function getPointerMovement() {
  return {
    moveX,
    moveY,
    mouseSpeed
  };
}