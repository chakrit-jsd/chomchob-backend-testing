declare namespace NodeJS {
  interface ProcessEnv {
    BACKEND_PORT?: string;
    BACKEND_HOST?: string;

    DB_NAME: string;
    DB_HOST: string;
    DB_USER: string;
    DB_PASS: string;
    DB_PORT: string;

    DB_REDIS_URL: string;
    SS_SECRET: string;
  }
}
