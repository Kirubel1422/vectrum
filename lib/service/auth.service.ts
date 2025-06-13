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
        user.id,
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
      user_metadata: {
        role: "user",
        displayName: authData.first_name + " " + authData.last_name,
      },
    });

    if (error) throw error;

    const dbResponse = await UserService.saveUser({
      id: data.user.id,
      email: authData.email,
      first_name: authData.first_name,
      last_name: authData.last_name,
      password: hashedPassword,
    });
    const user = dbResponse[0];

    // @ts-ignore
    delete user.password;

    const jwt = JwtService.generate(
      user.id,
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

  async refreshToken(userId: string) {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    return JwtService.generate(
      user.id,
      user.first_name,
      user.last_name,
      user.email,
      user.role,
      user.created_at as Date
    );
  },

  async changePassword(
    email: string,
    current_password: string,
    new_password: string,
    userId: string
  ): Promise<{ success: boolean; message: string; signOut: boolean }> {
    if (!email || !current_password || !new_password)
      return {
        message: "All fields are required",
        success: false,
        signOut: false,
      };

    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (result.length === 0)
      return { success: false, message: "User not found", signOut: true };

    // Compare plain password with the saved password
    const [user] = result;
    const match = await bcrypt.compare(current_password, user.password);

    if (!match)
      return {
        success: false,
        message: "Invalid credentials.",
        signOut: false,
      };

    const newHashedPassword = await this.hashPassword(new_password);

    const { error: updateUserError } = await supabase.auth.admin.updateUserById(
      userId,
      {
        password: newHashedPassword,
      }
    );

    if (updateUserError)
      return {
        success: false,
        message: updateUserError.message,
        signOut: false,
      };

    await db
      .update(usersTable)
      .set({ password: newHashedPassword })
      .where(eq(usersTable.id, user.id));

    return {
      success: true,
      message: "Successfully changed your password!",
      signOut: false,
    };
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
