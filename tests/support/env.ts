export function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta variable de entorno: ${name}`);
  }
  return value;
}

export const API_BASE_URL = process.env.API_BASE_URL ?? 'http://127.0.0.1:3001';
export const DELICIAS_API_KEY = process.env.DELICIAS_API_KEY ?? 'demo-key';
