"use server";

import { cookies } from "next/headers";
import { JwtService } from "../service/jwt.service";
import { JWTResponse } from "../types/jwt.types";

export async function getRole() {
  const jwt = (await cookies()).get("jwt")?.value;
  if (jwt) {
    const { role } = JwtService.verify(jwt) as JWTResponse;
    return role;
  } else {
    return null;
  }
}
