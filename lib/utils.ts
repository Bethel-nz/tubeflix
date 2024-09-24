import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T, K extends (...args: K[]) => Promise<K>>(
  func: T,
  wait: number
) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(
    ...args: Parameters<K>
  ): Promise<ReturnType<K>> {
    return new Promise((resolve, reject) => {
      const later = () => {
        clearTimeout(timeout);
        (func as T as (...args: Parameters<K>) => Promise<ReturnType<K>>)(
          ...args
        )
          .then(resolve)
          .catch(reject);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    });
  };
}
