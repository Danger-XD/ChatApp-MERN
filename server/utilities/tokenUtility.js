import jwt from "jsonwebtoken";

const generateAuthToken = (userId, res) => {
  // Generate access token
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  };
  res.cookie("jwt", accessToken, options);
  return { accessToken };
};
export default generateAuthToken;
