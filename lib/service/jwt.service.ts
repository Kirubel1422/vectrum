import jwt from "jsonwebtoken";

export const JwtService = {
  generate: (
    userId: string,
    first_name: string,
    last_name: string,
    email: string,
    role: string,
    created_at: Date
  ) =>
    jwt.sign(
      { userId, first_name, last_name, email, role, created_at },
      process.env.SUPABASE_JWT_SECRET!
    ),
  verify: (token: string): { userId: string; iat: number } =>
    jwt.verify(token, process.env.SUPABASE_JWT_SECRET!) as {
      userId: string;
      iat: number;
    },
};
