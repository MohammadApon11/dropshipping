import jwt from "jsonwebtoken";
import setting from "../../settings.json";
const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, setting.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent XSS attacks
    sameSite: "strict", //CSRF cross-site request forgery protection
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
