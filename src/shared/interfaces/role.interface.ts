import { Permission } from "../types/permission.type";
import { IUser } from "./user.interface";

export interface IRole {
  name: string
  code: string
  users: IUser[] | string[]
  permissions: Permission[]
}