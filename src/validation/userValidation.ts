import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "../db/schema";

export const userSchema = createInsertSchema(users).extend({
	password: z.string().min(6),
});
