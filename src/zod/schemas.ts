import { z } from "zod";

const userSignUpSchema = z.object({
  fullname: z.string().min(3),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "password cannot be less than 8 digits" })
    .max(10, { message: "password cannot be more than 10 digits" }),
  confirmpassword: z
    .string()
    .min(8, { message: "password cannot be less than 8 digits" })
    .max(10, { message: "password cannot be more than 10 digits" }),
  phone: z.string().optional(),
  address: z.string().optional(),
  pincode: z.string().optional(),
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

const locationSchema = z.object({
  type: z.enum(["Point"]),
  coordinates: z.array(z.number()).nonempty(),
});

const addressSchema = z.object({
  title: z.string().min(3).max(100),
  user: z.string(),
  location: locationSchema,
  phone: z.string(),
  address: z.string().min(3).max(300),
  pincode: z.string().length(6),
});

type addressType = z.infer<typeof addressSchema>;

export {
  userSignUpSchema,
  userSignUpType,
  userLoginSchema,
  userLoginType,
  addressSchema,
  addressType,
};
