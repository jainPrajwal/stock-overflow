import { loading } from "./common.types";

export type AuthState = {
  email: string | null;
  token: string | null;
  
  toastMessage: string | null;
  signupLoadingStatus: loading,
  loginLoadingStatus: loading,
};

export type AuthResponseType = {
  token: string;
  user: {
    email: string;
    reputation: number;
    name: string;
  };
  message: string;
};
