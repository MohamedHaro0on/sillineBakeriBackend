import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import { StatusCodes } from "http-status-codes";

// REGISTER USER ;
export const register = async (req, res) => {
  try {
    const {
      userName,
      email,
      password,
    } = req.body;

    const isEmailUsed = await User.findOne({ email });
    if (isEmailUsed) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Email is associated with anathor account",
      });
    } else {
      const newUser = new User({
        userName,
        email,
        password,
      });
      const savedUser = await newUser.save();
      res.status(StatusCodes.CREATED).json({
        message: "User Created Successfully ",
        data: savedUser,
      });
    }
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `can't register ....  ${e}`,
      e
    });
  }
};

// USER LOGIN :
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "User doesn't exist",
      });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        delete user.password;

        res.status(StatusCodes.OK).json({
          message: "Logged in Successfully",
          token,
          data: user,
        });
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "wrong password",
        });
      }
    }
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `can't login ...... ${e}`,
    });
  }
};

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(StatusCodes.OK).json({
      data: users,
    });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `can't login ...... ${e}`,
    });
  }
};

// GET USER
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    res.status(StatusCodes.OK).json({
      message: "user found",
      data: user,
    });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `can't login ...... ${e}`,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;

  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `can't login ...... ${e}`,
    });
  }
};
