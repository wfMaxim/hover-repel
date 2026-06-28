import type { App, Directive } from "vue";
import { attachRepel, type RepelOptions } from "../core/attach";

type RepelElement = HTMLElement & {
  __repelDestroy__?: () => void;
};

export type HoverRepelVueOptions = RepelOptions;

export function createRepelDirective(
  globalOptions: HoverRepelVueOptions = {}
): Directive<RepelElement, RepelOptions | undefined> {
  return {
    mounted(element, binding) {
      element.dataset.repel = "";

      element.__repelDestroy__ = attachRepel(element, {
        ...globalOptions,
        ...(binding.value ?? {})
      });
    },

    updated(element, binding) {
      if (binding.value === binding.oldValue) return;

      element.__repelDestroy__?.();

      element.__repelDestroy__ = attachRepel(element, {
        ...globalOptions,
        ...(binding.value ?? {})
      });
    },

    beforeUnmount(element) {
      element.__repelDestroy__?.();
      delete element.__repelDestroy__;
    }
  };
}

export const vRepel = createRepelDirective();

const HoverRepelVue = {
  install(app: App, options: HoverRepelVueOptions = {}) {
    app.directive("repel", createRepelDirective(options));
  }
};

export default HoverRepelVue;