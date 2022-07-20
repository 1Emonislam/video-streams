import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { RegisterUserBody } from "./user.schema";
import { createUser } from "./user.service";
export async function registerUserHandler(req: Request<{}, {}, RegisterUserBody>, res: Response) {
 const { username, email, password, about } = req.body;
 try {
  await createUser({ username, email, password, about });
  return res.status(StatusCodes.CREATED).send({ message: 'user created successfully' })
 } catch (error: any) {
  if (error.code === 11000) {
   return res.status(StatusCodes.CONFLICT).send({ error: "User already exists" });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: error.message })
 }
}