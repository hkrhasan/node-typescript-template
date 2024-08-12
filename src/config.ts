import "dotenv/config";

namespace Config {
  type val = number | string;
  type Config = { [key: string]: val };
  const config: Config = {};

  function register(name: string, defaultValue?: val) {
    const value = process.env[name] || defaultValue;
    if (!value) {
      throw new Error(`Environment variable ${name} is missing`);
    }
    config[name] = value;

    return value;
  }

  export const PORT = register("PORT", 3000);
  export const DATABASE_URL = register("DATABASE_URL");
  export const APP_SECRET = register("APP_SECRET") as string;
  export const NODE_ENV = register("NODE_ENV", "development");
}

export default Config;
