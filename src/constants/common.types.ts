export type ServerError = {
  success: boolean;
  message: string;
  errorMessage?: string;
};
export type Vote = {
  upvotes: {
    count: number;
    points: number;
  };
  downvotes: {
    count: number;
    points: number;
  };
};

export type loading = `idle` | `loading` | `success` | `error`;

export type UserLoginCredentials = {
  email: string;
  password: string;
};
