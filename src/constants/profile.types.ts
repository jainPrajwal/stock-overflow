import { loading } from "./common.types";

export type Profile = {
  _id: string;
  name: string;
  email: string;
  reputation: number;
  createdAt: string;
  updatedAt: string;
};

export type ProfileResponseType = {
  success: boolean;
  message: string;
  error: unknown;
  errorMessage?: string;
  profile: Profile;
};

export type ProfileState = {
  message: string | null;
  errorMessage?: string;
  profile: Profile | null;
  loadingStatus: loading;
};
