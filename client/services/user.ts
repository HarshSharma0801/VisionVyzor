import axios from "axios";
import { IUser } from "@/utils/types";

axios.defaults.baseURL = "http://localhost:4030";

export const create_user = async ({
  user,
}: {
  user: IUser;
}): Promise<{ user: IUser | null; valid: boolean }> => {
  try {
    const { data } = await axios.post("/users", {
      email: user.email,
      name: user.name,
      googleId: user.googleId,
      image: user.image,
    });

    if (data.valid) {
      return { valid: true, user: data.user };
    }
    return { valid: false, user: null };
  } catch (error) {
    console.error("Error creating user:", error);
    return { valid: false, user: null };
  }
};

export const get_user_by_email = async (email: string): Promise<Boolean> => {
  try {
    const { data } = await axios.get(`/users/${email}`);
    if (data.valid) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error fetching user:", error);
    return false;
  }
};
