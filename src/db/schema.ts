import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";

export const users = pgTable("users", {
	id: uuid("id").primaryKey().default(uuidv4()),
	username: text("username").notNull(),
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
	avatar: text("avatar"),
	accessToken: uuid("accessToken"),
	refreshToken: uuid("refreshToken"),
	acceptedPolicy: boolean("acceptedPolicy").default(false),
	newsaletter: boolean("newsaletter").default(true),
	role: text("role").default("user"),
	createdAt: timestamp("createdAt").defaultNow(),
	updatedAt: timestamp("updatedAt")
		.defaultNow()
		.$onUpdateFn(() => new Date()),
	status: text("status").default("inactive"),
});
