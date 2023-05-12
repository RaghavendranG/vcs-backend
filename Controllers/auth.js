import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.js";

dotenv.config();

const isSigned = async (req, res, next) => {
    let token;
  if (req.headers) {
    try {
      token = req.headers["x-auth-token"];
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await User.findById(decode.id);
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ Messaage: "Invalid Authorization" });
    }
  }

  if(!token) return res.send(400).json({ Message: "Access Denied" });
};


export {isSigned}