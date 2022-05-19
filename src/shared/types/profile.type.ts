import { IRole } from "../interfaces/role.interface";
import { IUser } from "../interfaces/user.interface";

export type Profile = {
  user: IUser,
  roles: IRole[],
}