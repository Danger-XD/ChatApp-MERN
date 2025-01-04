import {
  loginService,
  logoutService,
  registerService,
} from "../services/authUsers.service.js";

export const register = async (req, res) => {
  let result = await registerService(req, res);
  res.status(200).json(result);
};

export const login = async (req, res) => {
  let result = await loginService(req, res);
  res.status(200).json(result);
};

export const logout = async (req, res) => {
  let result = await logoutService(req, res);
  res.status(200).json(result);
};
