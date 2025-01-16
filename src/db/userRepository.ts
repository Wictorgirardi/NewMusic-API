import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import type { UserData } from "../interfaces/user";
import { db } from "./index";
import { users } from "./schema";

export const findUserByEmail = async (email: string) => {
	return db.select().from(users).where(eq(users.email, email)).execute();
};

export const createUser = async (userData: UserData) => {
	return db.insert(users).values({
		...userData,
		password: await bcrypt.hash(userData.password, 10),
		createdAt: new Date(),
		updatedAt: new Date(),
	});
};

export const updateUserTokens = async (
	email: string,
	accessToken: string,
	refreshToken: string,
) => {
	return db
		.update(users)
		.set({ accessToken, refreshToken })
		.where(eq(users.email, email))
		.execute();
};
