declare namespace NodeJS {
  interface ProcessEnv {
    BACKEND_PORT?: string;
    BACKEND_HOST?: string;

    MONGO_DB_URL: string;
  }
}
