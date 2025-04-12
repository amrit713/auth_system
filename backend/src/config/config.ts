import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  authSecret: string;
}

//create variable for env
const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  authSecret: process.env.AUTH_SECRET!,
};

export default config;
