import { serve } from "@hono/node-server";
import { Hono } from "hono";
import logger from "./config/logger";
import authController from "./controllers/authController";

const app = new Hono();

app.use("*", async (ctx, next) => {
	logger.info(`Request para: ${ctx.req.method} ${ctx.req.url}`);
	await next();
});

app.route("/auth", authController);

serve(app);

export default app;
