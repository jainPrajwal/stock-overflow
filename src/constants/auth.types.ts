import { loading } from "./common.types";

export type AuthState = {
  email: string | null;
  token: string | null;
  loadingStatus: loading;
  toastMessage: string | null;
  
};
