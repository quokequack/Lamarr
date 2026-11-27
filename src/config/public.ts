export const publicConfig = {
  appName: import.meta.env.VITE_APP_NAME ?? 'Lamarr',
  environment: import.meta.env.MODE,
} as const
