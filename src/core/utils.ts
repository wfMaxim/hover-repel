export const clamp = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value));
};

export const getNumber = (
  element: HTMLElement,
  name: string,
  fallback: number
) => {
  const value = element.dataset[name];

  if (!value) return fallback;

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : fallback;
};