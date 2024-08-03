require('dotenv').config();
import { hash, genSalt, compare } from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10);
  return hash(password, salt);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return compare(password, hashedPassword);
};
