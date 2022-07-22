import {
  IoIosArrowDropup,
  IoIosArrowDropdown,
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
  IoMdTrash,
} from "react-icons/io";
import { IoBookmarkOutline, IoBookmarkSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

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

// Icons
export const ICON_UPVOTE = IoIosArrowDropup;
export const ICON_DOWNVOTE = IoIosArrowDropdown;
export const ICON_ALREADY_UPVOTED = IoIosArrowDropupCircle;
export const ICON_ALREADY_DOWNVOTED = IoIosArrowDropdownCircle;
export const ICON_BOOKMARK = IoBookmarkOutline;
export const ICON_ALREADY_BOOKMARKED = IoBookmarkSharp;
export const ICON_EDIT = MdEdit;
export const ICON_DELETE = IoMdTrash;

// sort by
export const HIGHEST_SCORE = `HIGHEST_SCORE`;
export const NEWEST_FIRST = `NEWEST_FIRST`;
export const OLDEST_FIRST = `OLDEST_FIRST`;
