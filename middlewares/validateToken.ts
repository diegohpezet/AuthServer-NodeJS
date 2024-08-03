import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyAccessToken } from "../utils/jwt";
import dotenv from "dotenv";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      email: string
      password: string
      user?: JwtPayload
    }
  }
}

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  const refreshToken = req.cookies["refreshToken"];

  if (!accessToken && !refreshToken) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = verifyAccessToken(accessToken!);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Unauthorized" });
  }
}

export default validateToken;