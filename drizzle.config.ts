import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
config();

export default defineConfig({
	out: "./migrations",
	dialect: "postgresql",
	schema: "./src/db/schema.ts",
	dbCredentials: {
		url: process.env.DATABASE_URL || "",
	},
});
