export const cookieConfig = {
  name: "jwt",
  httpOnly: true,
  path: "/",
  secure: false,
  sameSite: "lax",
  maxAge: 60 * 60 * 24,
} as const;
