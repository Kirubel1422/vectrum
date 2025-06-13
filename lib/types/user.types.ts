import { SignUpRequest } from "./auth.types";

export interface User extends SignUpRequest {
  role: string;
  id?: string;
  created_at?: Date;
  updated_at?: Date;
}
