import { z } from "zod";

const userSignUpSchema = z.object({
  avatar: z.string().optional(),
  fullname: z.string().min(3),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "password cannot be less than 8 digits" })
    .max(10, { message: "password cannot be more than 10 digits" }),
});

type userSignUpType = z.infer<typeof userSignUpSchema>;

const userLoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "password cannot be less than 8 digits" })
    .max(10, { message: "password cannot be more than 10 digits" }),
});

type userLoginType = z.infer<typeof userLoginSchema>;

export { userSignUpSchema, userSignUpType, userLoginSchema, userLoginType };
