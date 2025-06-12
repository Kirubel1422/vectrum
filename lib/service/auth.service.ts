import { supabase } from "../supabase";
import { SignInRequest, SignUpRequest } from "../types/auth.types";
import bcrypt from "bcryptjs";
import { JwtService } from "./jwt.service";
import { UserService } from "./user.service";
import { User } from "../types/user.types";

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
      jwt: JwtService.generate(user.id as string),
    };
  },
  async signup(authData: SignUpRequest) {
    const hashedPassword = await this.hashPassword(authData.password);

    const { data, error } = await supabase.auth.admin.createUser({
      email: authData.email,
      password: hashedPassword,
    });

    if (error) throw error;

    await UserService.saveUser({
      email: authData.email,
      first_name: authData.first_name,
      last_name: authData.last_name,
      password: hashedPassword,
    });

    const jwt = JwtService.generate(data.user.id);
    console.log("SignedUp User: ", data.user);
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

    return { isMatch, user: result[0] };
  },
};
