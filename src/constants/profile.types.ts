import { loading } from "./common.types";

export type Profile = {
  _id: string;
  name: string;
  email: string;
  reputation: number;
  profileImageUrl: string;
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

export type ProfileRequestType = {
  name?: string;
  reputation?: number;
  profileImageUrl?: string;
};

export type ProfileImageState = {
  message: string | null;
  profileImage: ProfileImage | null;
  loadingStatus: loading;
  error?: unknown;
};
export type ProfileImage = {
  asset_id: string;
  public_id: string;
  created_at: string;
  url: string;
  secure_url: string;
};

export type ProfileImageResponseType = {
  profileImage: {
    asset_id: string;
    public_id: string;
    created_at: string;
    url: string;
    secure_url: string;
  };
};

export type ProfileImageRequestType = {
  data: FormData;
};
