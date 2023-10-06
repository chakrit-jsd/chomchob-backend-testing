declare namespace NodeJS {
  interface ProcessEnv {
    BACKEND_PORT?: string;
    BACKEND_HOST?: string;

    MONGO_DB_URL: string;

    DB_NAME: string;
    DB_DIAL: string;
    DB_USER: string;
    DB_PASS: string;
    DB_PORT: string;
  }
}
