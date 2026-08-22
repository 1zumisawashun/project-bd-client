"use server";

import { getUserByEmail } from "@/functions/db/user";
import { actionResult } from "@/functions/helpers/actionResult";
import { hashPassword } from "@/functions/helpers/password";
import db from "@project-bd-client/db";
import { users } from "@project-bd-client/db/schema";
import { Schema, schema } from "./signUp.schema";

type SignUpProps = { data: Schema };

export const signUp = async (props: SignUpProps) => {
  try {
    const { success, error, data } = schema.safeParse(props.data);

    if (!success) {
      return actionResult.end(error.message);
    }

    const existingUser = await getUserByEmail({
      email: data.email,
    });

    if (existingUser) {
      return actionResult.end("このメールアドレスは既に登録されています");
    }

    const hashedPassword = await hashPassword(data.password);

    const [response] = await db
      .insert(users)
      .values({
        id: crypto.randomUUID(),
        email: data.email,
        hashedPassword,
      })
      .returning();

    return actionResult.success(response);
  } catch (error) {
    return actionResult.error(error);
  }
};
