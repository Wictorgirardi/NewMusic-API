import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import {
  findUserByEmail,
  createUser,
  updateUserTokens,
} from "../db/userRepository";

export const registerUser = async (userData: any) => {
  const existingUser = await findUserByEmail(userData.email);
  if (existingUser.length > 0) {
    throw new Error("E-mail já registrado");
  }
  await createUser({ ...userData, id: uuidv4() });
};

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (
    user.length === 0 ||
    !(await bcrypt.compare(password, user[0].password))
  ) {
    throw new Error("Credenciais invalidas");
  }

  const accessToken = uuidv4();
  const refreshToken = uuidv4();
  await updateUserTokens(email, accessToken, refreshToken);

  return {
    accessToken,
    refreshToken,
    user: {
      username: user[0].username,
      email: user[0].email,
      role: user[0].role,
    },
  };
};
