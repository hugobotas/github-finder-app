/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_GITHUB_URL: string;
  readonly VITE_APP_GITHUB_TOKEN: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
