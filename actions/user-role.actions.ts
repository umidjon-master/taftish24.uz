import { connectToDatabase } from "@/lib/mongoose";
import UserLoginCollection from "@/models/UserLogin";

export const getRole = async (login: string) => {
  try {
    await connectToDatabase();
    const user = await UserLoginCollection.findOne({ login }).select(
      "role isAdmin"
    );
    return {
      status: 200,
      message: "User Success ✅",
      user,
    };
  } catch (error) {
    throw new Error("Error getting role");
  }
};
