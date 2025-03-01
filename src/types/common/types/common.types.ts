import { Crumb, UserRoleEnum } from "~/types";

export type UserRole =
  | UserRoleEnum.Admin
  | UserRoleEnum.User
  | UserRoleEnum.Moderator;

export type SwitchContent = {
  text: string;
  tooltip?: string;
};

export type SwitchOptions = {
  [key in "left" | "right"]?: SwitchContent;
};
export type Crumbfunc = (data: unknown) => Crumb;
