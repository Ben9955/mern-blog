import jwt from "jsonwebtoken";
import { errorHandler } from "./error";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; //  access_token the name that we gave to the cookie when we created it

  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }

    req.user = user;

    next();
  });
};
