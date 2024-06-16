import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { userLoginType, userSignUpType } from "../zod/schemas";
import { sign } from "jsonwebtoken";
import { SECRET } from "../..";
import { User } from "../models/Models";

const SignUpUser = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password } = req.body as userSignUpType;
    const isUserExists = await User.exists({ email });
    if (isUserExists) {
      res.status(409).send({ message: "Account Exists!" });
      return;
    }
    const encryprtedPassword = await bcrypt.hash(password, 10);
    const record = await User.create({
      fullname,
      email,
      password: encryprtedPassword,
    });
    res.status(201).send({ message: "Account Created SuccessFully!", record });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error Occured , Please Try Again!", error });
  }
};

const LoginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as userLoginType;
    const UserRecord = await User.findOne({
      email,
    });
    if (!UserRecord) {
      res.status(409).send({ message: "User Not Found!" });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      UserRecord.password as string
    );
    if (!isPasswordMatch) {
      res.status(400).send({ message: "email or password incorrect" });
      return;
    }
    const token = sign(
      {
        userId: UserRecord.id,
        email: UserRecord.email,
        name: UserRecord.fullname,
      },
      SECRET!,
      { expiresIn: "24h" }
    );
    res.status(200).send({
      user: {
        fullname: UserRecord.fullname,
      },
      token: token,
      message: "success",
    });
  } catch (error) {
    res.status(500).send({ message: "Error Occured , Please Try Again!" });
  }
};
export { SignUpUser, LoginUser };
