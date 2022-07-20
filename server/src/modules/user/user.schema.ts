import { object, string, TypeOf } from 'zod';
export const registerUserSchema = {
 body: object({
  username: string({
   required_error: "Username is required",
  }),
  email: string({
   required_error: "Email is required",
  }),
  password: string({
   required_error: "Password is required",
  }).min(6, "Password must be at least 6 characters long").max(64, "Password should not be longer then 64 characters"),
  about: string().optional(),
  confirmPassword: string({
   required_error: "Confirm Password"
  })
 }).refine((data) => {
  let isSame = data.password === data.confirmPassword;
  return isSame;
 }, {
  message: 'Password do not match',
  path: ['confirmPassword'],
 })
}
export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>