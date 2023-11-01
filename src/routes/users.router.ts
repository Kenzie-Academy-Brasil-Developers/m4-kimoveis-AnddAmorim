import {Router} from "express";
import {
  validateBody,
  verifyAdmin,
  verifyPermission,
  verifyToken,
} from "../middlewares/globals.middleware";
import {createUserSchema, updateUserSchema} from "../schemas/users.schema";
import {
  verifyUserEmail,
  verifyUserExists,
} from "../middlewares/users.middleware";
import {
  createUserController,
  deleteUserController,
  readAllUsersController,
  updateUserController,
} from "../controller/users.controller";

export const userRouter: Router = Router();

userRouter.post(
  "/",
  validateBody(createUserSchema),
  verifyUserEmail,
  createUserController
);

userRouter.get("/", verifyToken, verifyAdmin, readAllUsersController);

userRouter.patch(
  "/:id",
  validateBody(updateUserSchema),
  verifyToken,
  verifyUserExists,
  verifyPermission,
  updateUserController
);

userRouter.delete(
  "/:id",
  verifyToken,
  verifyUserExists,
  verifyPermission,
  deleteUserController
);
