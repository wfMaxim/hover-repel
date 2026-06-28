import { repel, attachRepel } from "./index";

declare global {
  interface Window {
    HoverRepel: {
      repel: typeof repel;
      attachRepel: typeof attachRepel;
    };
  }
}

window.HoverRepel = {
  repel,
  attachRepel
};