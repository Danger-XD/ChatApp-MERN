import { userModel } from "../models/users.model.js";

export const getAllUsersService = async (req, res) => {
  try {
    const userId = req.user["_id"];
    const filteredUsers = await userModel
      .find({ _id: { $ne: userId } })
      .select("-password");
    return { status: "success", filteredUsers };
  } catch (error) {
    console.log("error: " + error.message);
    return { status: "failed", error: error.message };
  }
};
