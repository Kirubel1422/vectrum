import { db } from "@/db";
import { User } from "../types/user.types";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const UserService = {
  async saveUser(userData: Omit<User, "role">) {
    return await db.insert(usersTable).values({
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      password: userData.password,
    });
  },

  async getUserByEmail(email: string) {
    return await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
  },
};
