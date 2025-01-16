import { Hono } from "hono";
import { ZodError } from "zod";
import { userSchema } from "../validation/userValidation";
import { registerUser, loginUser } from "../auth/authService";
import logger from "../config/logger";

const authController = new Hono();

authController.post("/register", async (ctx) => {
  try {
    const data = await ctx.req.json();
    const userData = userSchema.parse(data);
    await registerUser(userData);
    return ctx.json({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    if (error instanceof ZodError) {
      return ctx.json({ error: error.errors }, 400);
    }
    if (error instanceof Error && error.message === "E-mail já registrado") {
      return ctx.json({ error: error.message }, 400);
    }
    logger.error(error);
    return ctx.json({ error: "Ooops! Algo deu errado" }, 500);
  }
});

authController.post("/login", async (ctx) => {
  try {
    const { email, password } = await ctx.req.json();
    const result = await loginUser(email, password);
    return ctx.json(result);
  } catch (error) {
    logger.error(error);
    return ctx.json({ error: "Ooops! Algo deu errado" }, 500);
  }
});

export default authController;
