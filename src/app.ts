import { Hono } from "hono";
import { serve } from "@hono/node-server";
import authController from "./controllers/authController";
import logger from "./config/logger";

const app = new Hono();

app.use("*", async (ctx, next) => {
  logger.info(`Request para: ${ctx.req.method} ${ctx.req.url}`);
  await next();
});

app.route("/auth", authController);

serve(app);

export default app;