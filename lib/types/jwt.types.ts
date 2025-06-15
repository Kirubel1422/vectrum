import { User } from "./user.types";

export interface JWTResponse extends User {
  userId: string;
  iat: number;
}
