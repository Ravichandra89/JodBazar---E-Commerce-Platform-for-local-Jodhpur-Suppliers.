import jwt from "jsonwebtoken";

const generateToken = (id: string, role: string): string => {
  const secret = process.env.JWT_SECRET || "your_jwt_secret";
  return jwt.sign({ id, role }, secret, { expiresIn: "1d" });
};

export default generateToken;
