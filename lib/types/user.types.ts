import { SignUpRequest } from "./auth.types";

export interface User extends SignUpRequest {
  role: string;
  id?: string;
}
