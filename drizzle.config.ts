import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";
config();

export default defineConfig({
  out: "./migrations",
  dialect: "postgresql",
  schema: "./src/db/schema.ts", 
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
