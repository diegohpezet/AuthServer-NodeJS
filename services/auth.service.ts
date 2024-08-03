import { userModel } from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class AuthService {
  /**
   * Logins a user
   * @param { String } email - Email of the user to log in
   * @param { String } password - Password of the user
   * @returns { String } token - JWT token for the user
   */
  public static async login(email: string, password: string) {
    const user = await userModel.scope('withPassword').findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_REFRESH_SECRET!, { expiresIn: '1d' });

    return { accessToken, refreshToken };
  }
}
