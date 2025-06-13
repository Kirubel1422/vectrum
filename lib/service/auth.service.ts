import { supabase } from "../supabase";
import { SignInRequest, SignUpRequest } from "../types/auth.types";
import bcrypt from "bcryptjs";
import { JwtService } from "./jwt.service";
import { UserService } from "./user.service";
import { User } from "../types/user.types";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const AuthService = {
  async signin(authData: SignInRequest) {
    const { isMatch, user } = await this.match(
      authData.email,
      authData.password
    );

    if (!isMatch) throw Error("Bad credentials");

    // Dont send password
    // @ts-ignore
    delete user.password;

    return {
      user,
      jwt: JwtService.generate(
        user.id as string,
        user.first_name,
        user.last_name,
        user.email,
        user.role,
        user.created_at as Date
      ),
    };
  },
  async signup(authData: SignUpRequest) {
    const hashedPassword = await this.hashPassword(authData.password);

    const { data, error } = await supabase.auth.admin.createUser({
      email: authData.email,
      password: hashedPassword,
    });

    if (error) throw error;

    const dbResponse = await UserService.saveUser({
      email: authData.email,
      first_name: authData.first_name,
      last_name: authData.last_name,
      password: hashedPassword,
    });
    const user = dbResponse[0];

    // @ts-ignore
    delete user.password;

    const jwt = JwtService.generate(
      data.user.id,
      user.first_name,
      user.last_name,
      user.email,
      user.role,
      user.created_at as Date
    );

    return {
      jwt,
      user,
    };
  },

  async changePassword(
    email: string,
    current_password: string,
    new_password: string
  ): Promise<boolean> {
    const hashedPassword = await this.hashPassword(current_password);
    const { isMatch, user } = await this.match(email, hashedPassword);

    if (!isMatch) throw Error("Bad credentials");

    const newHashedPassword = await this.hashPassword(new_password);
    const { error } = await supabase.auth.admin.updateUserById(
      user.id as string,
      {
        password: newHashedPassword,
      }
    );

    if (error) throw error;

    db.update(usersTable)
      .set({ password: newHashedPassword })
      .where(eq(usersTable.id, user.id as string));

    return true;
  },

  async hashPassword(plainPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(plainPassword, salt);
  },

  async match(
    email: string,
    plainPassword: string
  ): Promise<{ isMatch: boolean; user: User }> {
    const result = await UserService.getUserByEmail(email);

    if (result.length === 0) {
      throw Error("Bad credentials");
    }

    const [user] = result;
    const isMatch = await bcrypt.compare(plainPassword, user.password);

    return { isMatch, user };
  },
};
