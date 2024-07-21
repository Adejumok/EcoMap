/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_NREL_API_KEY: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }