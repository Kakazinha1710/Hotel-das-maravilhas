/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_APP_NAME?: string;
  readonly VITE_APP_VERSION?: string;
  // adicione aqui outras variáveis de ambiente do projeto
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

