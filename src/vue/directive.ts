import type { Directive } from "vue";
import { attachRepel, type RepelOptions } from "../core/attach";

type RepelElement = HTMLElement & {
  __repelDestroy__?: () => void;
};

export const vRepel: Directive<RepelElement, RepelOptions | undefined> = {
  mounted(element, binding) {
    element.dataset.repel = "";

    element.__repelDestroy__ = attachRepel(element, binding.value ?? {});
  },

  updated(element, binding) {
    if (binding.value === binding.oldValue) return;

    element.__repelDestroy__?.();
    element.__repelDestroy__ = attachRepel(element, binding.value ?? {});
  },

  beforeUnmount(element) {
    element.__repelDestroy__?.();
    delete element.__repelDestroy__;
  }
};