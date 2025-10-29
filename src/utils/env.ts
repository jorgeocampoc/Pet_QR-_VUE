
export const getEnv = (key: string, defaultValue: string = ""): string => {
  return (import.meta.env as any)[key] || defaultValue;
};

export const API_BASE_URL = getEnv("VITE_API_BASE_URL");
export const API_BASE_URL_FRONT = getEnv("VITE_API_BASE_URL_FRONT");
