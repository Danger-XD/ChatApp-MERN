import { getAllUsersService } from "../services/users.service.js";

export const getAllUsers = async (req, res) => {
  let result = await getAllUsersService(req, res);
  res.status(200).json(result);
};
