import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
const verfiyToken = async (req, res, next) => {
  try {
    let  token  = req.headers && req.headers.authorization;
    if (!token) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: "you are not authorized",
      });
    } else if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
      const verfied = jwt.verify(token, process.env.SECRET_KEY);
      req.user = verfied;
      next();
    } else {
       res.status(StatusCodes.UNAUTHORIZED).json({
        message: "you are not authorized",
      });
    }
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "internal server error "+ e,
      error: e,
    });
  }
};
export default verfiyToken ; 