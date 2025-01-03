import { userModel } from "../models/users.model.js";
import bcrypt from "bcrypt";
import generateAuthToken from "../utilities/tokenUtility.js";

export const registerService = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (!username && !password && !fullName && !gender) {
      return { status: "failed", message: "Required fields are empty" };
    }
    if (password !== confirmPassword) {
      return { status: "failed", message: "password does not match" };
    }
    const userExist = await userModel.findOne({ username });
    if (userExist) {
      return { status: "failed", message: "user already exists" };
    }

    const maleAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const salt = await bcrypt.genSalt(process.env.SALT_VALUE);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      fullName,
      username,
      password: hashedPassword,
      gender,
      avatar: gender === "male" ? maleAvatar : femaleAvatar,
    });
    await newUser.save();
    if (newUser) {
        let token = generateAuthToken(newUser._id,res);
      let data = await userModel.findById(newUser["_id"]).select("-password");
      return {
        status: "success",
        message: "user registered successfully",
        data: data,
        token
      };
    }
    return {
      status: "failed",
      message: "error occurred while registering user",
    };
  } catch (error) {
    console.log("error: " + error.toString());
    return { status: "failed", error: error.message };
  }
};
export const loginService = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return { status: "failed", message: "required fields are empty" };
    }
    const user = await userModel.findOne({ username });
    if (!user) {
      return { status: "failed", message: "user not found" };
    }
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
    if (!isPasswordCorrect) {
      return { status: "failed", message: "invalid password" };
    }
    const token = generateAuthToken(user,res);
    return {
      status: "success",
      message: "user logged in successfully",
      token,
    };
  } catch (error) {
    console.log("error: " + error.toString());
    return { status: "failed", error: error.message };
  }
};
export const logoutService = (req, res) => {
  try {
    const options = {
        maxAge:0
      }
    res.cookie("jwt","",options)
    return {status:"success", message:"Logout successfully"}
  } catch (error) {
    console.log("error: " + error.toString());
    return { status: "failed", error: error.message };
  }
};
