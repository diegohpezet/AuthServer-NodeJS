import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import jwt, { Secret } from "jsonwebtoken";
import { generateAccessToken, verifyAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt";
import { userModel } from "../models";

export class AuthController {
  public static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await AuthService.login(email, password);

      return res
        .setHeader('Authorization', 'Bearer ' + accessToken)
        .cookie('refreshToken', refreshToken, { httpOnly: true })
        .json({ message: 'Login successful', accessToken });
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: err.message })
    }
  }

  /**
   * CHECK IF NECESSARY
   */
  public static async refreshSession(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token provided' });
    }

    try {
      const decoded = verifyRefreshToken(refreshToken);
      const user = await userModel.findByPk(decoded.id);

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      const newAccessToken = generateAccessToken(user.id);
      return res.status(200).json({ accessToken: newAccessToken });
    } catch (err) {
      console.log(err)
      return res.status(401).json({ error: 'Invalid refresh token' });

    }
  }
}