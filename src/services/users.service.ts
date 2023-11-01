import User from "../entities/Users.entity";
import {
  CreateUser,
  ReadReturnUser,
  ReturnUser,
  UpdateUser,
} from "../interfaces/users.interface";
import {userRepo} from "../repositories";
import {returnUserListSchema, returnUserSchema} from "../schemas/users.schema";

export const createUserService = async (
  data: CreateUser
): Promise<ReturnUser> => {
  const user: User = userRepo.create(data);

  await userRepo.save(user);

  return returnUserSchema.parse(user);
};

export const readAllUsersService = async (): Promise<ReadReturnUser> => {
  const users: User[] = await userRepo.find();

  return returnUserListSchema.parse(users);
};

export const updateUserService = async (
  data: UpdateUser,
  user: User
): Promise<ReturnUser> => {
  const updateUser: User = userRepo.create({...user, ...data});

  await userRepo.save(updateUser);

  return returnUserSchema.parse(updateUser);
};

export const deleteUserService = async (user: User): Promise<void> => {
  await userRepo.softRemove(user);
};
