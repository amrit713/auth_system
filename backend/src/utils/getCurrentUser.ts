import AppError from "./AppError";
import { db } from "./db";

// it will return the login user
export const getCurrentUser = async (id: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
};
