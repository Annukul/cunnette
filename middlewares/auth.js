import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Login First to access the resource" });
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decode.id);
  console.log(req.user);
  next();
};

export default isAuthenticatedUser;
