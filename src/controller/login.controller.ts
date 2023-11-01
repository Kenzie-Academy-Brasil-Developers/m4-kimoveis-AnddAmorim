import {Request, Response} from "express";
import {loginService} from "../services/login.service";
import {LoginReturn} from "../interfaces/users.interface";

export const loginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token: LoginReturn = await loginService(req.body);

  return res.status(200).json(token);
};
