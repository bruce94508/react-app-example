declare let window: Window &
  typeof globalThis & {
    _env_: any;
  };
if (!window._env_) window._env_ = {};

const VALID_RUNTIME_ENV_KEYS = ['PUBLIC_URL'] as const;
export const RUNTIME_ENV_VARS = VALID_RUNTIME_ENV_KEYS.reduce((res, key) => {
  res[key] = window._env_[key] || process.env[key];
  return res;
}, {} as Record<(typeof VALID_RUNTIME_ENV_KEYS)[number], string>);
