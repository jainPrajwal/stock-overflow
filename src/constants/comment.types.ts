import { loading } from "./common.types";
import { Profile } from "./profile.types";

export type Comment = {
  _id: string;
  comment: string;
  commenter: Profile;
  question?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  answer?: string;
};
export type CommentsState = {
  comments: {
    questionsMeta: {
      questions: Array<Comment>;
      loadingStatus: loading;
      message: string | null;
      error: unknown;
    };
    answersMeta: {
      loadingStatus: loading;
      message: string | null;
      error: unknown;
      answers: Array<Comment>;
    };
  };
};

export type CommentsResponseType = {
  success: boolean;
  message: string;
  comments: Array<Comment>;
};

export type CommentRequestType = {
  comment: {
    text: string;
  };
};
