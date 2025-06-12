import jwt from "jsonwebtoken";

export const JwtService = {
  generate: (userId: string) =>
    jwt.sign({ userId }, process.env.SUPABASE_JWT_SECRET!),
};
