import { Hono } from "hono";
import { ZodError } from "zod";
import { loginUser, registerUser } from "../auth/authService";
import logger from "../config/logger";
import { userSchema } from "../validation/userValidation";

const authController = new Hono();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
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

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
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
