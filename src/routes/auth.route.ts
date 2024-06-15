import express from "express";
import { userLoginSchema, userSignUpSchema } from "../zod/schemas";
import { validate } from "../middlewares/validate.middleware";
import { LoginUser, SignUpUser } from "../controllers/auth.controller";

const AuthRouter = express.Router();

AuthRouter.post("/signup", validate(userSignUpSchema), SignUpUser);
AuthRouter.post("/login", validate(userLoginSchema), LoginUser);

export default AuthRouter;
