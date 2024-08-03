import jwt, { Secret } from 'jsonwebtoken';

export const generateAccessToken = (id: number): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as Secret, { expiresIn: '1h' });
};

export const generateRefreshToken = (id: number): string => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET as Secret, { expiresIn: '7d' });
}

export const verifyAccessToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET as Secret);
};

export const verifyRefreshToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET as Secret);

}
