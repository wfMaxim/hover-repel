import { attachRepel, type RepelOptions } from "./core/attach";

export type { RepelOptions };
export { attachRepel };

export type RepelInitOptions = RepelOptions & {
  root?: ParentNode;
  targetSelector?: string;
};

export function repel(options: RepelInitOptions = {}) {
  const {
    root = document,
    targetSelector = "[data-repel]",
    ...repelOptions
  } = options;

  const targets = Array.from(
    root.querySelectorAll<HTMLElement>(targetSelector)
  );

  const destroyFns = targets.map((target) => {
    return attachRepel(target, repelOptions);
  });

  return () => {
    destroyFns.forEach((destroy) => destroy());
  };
}