import { loading } from "./common.types";
import { Profile } from "./profile.types";

export type Answer = {
  _id: string;
  question: string;
  isMarkedAsCorrectAnswer: boolean;
  answerer: Profile;
  isDeleted: false;
  votes: { count: number };
  createdAt: string;
  updatedAt: string;
  answer: string;
};

export type AnswersState = {
  answers: Array<Answer>;
  loadingStatus: loading;
  error: unknown;
  sortBy: string | null;
  filterBy: string | null;
  message: string | null;
};

export type AnswersResponseType = {
  success: boolean;
  message: string;
  error: unknown;
  answer: Answer;
};

export type AnswerRequestType = {
  question?: string;
  isMarkedAsCorrectAnswer?: boolean;
  answerer?: Profile;
  isDeleted?: false;
  votes?: { count: number };
  answer?: string;
};

export type AnswerResponseType = {
  success: boolean;
  message: string;
  error: unknown;
  answer: Answer;
};
