import { IoIosArrowDropup, IoIosArrowDropdown,IoIosArrowDropdownCircle,IoIosArrowDropupCircle } from "react-icons/io";
export type ServerError = {
  success: boolean;
  message: string;
  errorMessage?: string;
};


export type loading = `idle` | `loading` | `success` | `error`;

export type UserLoginCredentials = {
  email: string;
  password: string;
};

export const ICON_UPVOTE = IoIosArrowDropup;
export const ICON_DOWNVOTE = IoIosArrowDropdown;
export const ICON_ALREADY_UPVOTED = IoIosArrowDropupCircle;
export const ICON_ALREADY_DOWNVOTED = IoIosArrowDropdownCircle