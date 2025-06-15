import jwt from "jsonwebtoken";
import { JWTResponse } from "../types/jwt.types";

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
  verify: (token: string): JWTResponse =>
    jwt.verify(token, process.env.SUPABASE_JWT_SECRET!) as JWTResponse,
  async edgeVerify(token: string): Promise<JWTResponse> {
    const [headerB64, payloadB64, signatureB64] = token.split(".");

    // Decode Payload
    const decodedPayload = JSON.parse(
      Buffer.from(payloadB64, "base64").toString()
    );

    // Create Signature
    const signatureData = `${headerB64}.${payloadB64}`;
    const encoder = new TextEncoder();

    const data = encoder.encode(signatureData);
    const secretBufffer = encoder.encode(process.env.SUPABASE_JWT_SECRET!);

    // create key from secret
    const key = await crypto.subtle.importKey(
      "raw",
      secretBufffer,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    // Verify signature
    const signatureValid = await crypto.subtle.verify(
      "HMAC",
      key,
      Buffer.from(signatureB64, "base64"),
      data
    );

    if (!signatureValid) {
      throw new Error("Invalid signature");
    }

    return decodedPayload as JWTResponse;
  },
};
