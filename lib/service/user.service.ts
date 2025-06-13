import { db } from "@/db";
import { User } from "../types/user.types";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { GeneralSchemaType } from "@/app/(protected)/dashboard/my-account/_lib/schema";

export const UserService = {
  async saveUser(userData: Omit<User, "role">) {
    return await db
      .insert(usersTable)
      .values({
        id: userData.id,
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        password: userData.password,
      })
      .returning();
  },

  async getUserByEmail(email: string) {
    return await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
  },

  async handleChangeGeneralInfo(
    data: GeneralSchemaType
  ): Promise<{ success: boolean; message: string }> {
    const { first_name, last_name } = data;

    if (!first_name || !last_name)
      return { success: false, message: "All fields are required" };

    await db.update(usersTable).set({
      first_name,
      last_name,
    });

    return { success: true, message: "Successfully updated info." };
  },
};
