import { loading } from "./common.types";
import { Profile } from "./profile.types";

export type Tag = string;
export type Tags = Array<Tag>;

export type Question = {
  _id: string;
  title: string;
  description: string;
  tags: Array<string>;
  isDeleted: boolean;
  votes: {count: number};
  questioner: Profile;
  isFlaged: boolean;
  createdAt: string;
  updatedAt: string;
  views: number;
  totalAnswers: number;
  isAcceptedAnswerPresent: boolean;
};

export type QuestionsResponseType = {
  success: boolean;
  message: string;
  errorMessage?: string;
  questions: Array<Question>;
};

export type QuestionsState = {
  questions: Array<Question>;
  loadingStatus: loading;
  error: unknown;
  sortBy: string | null;
  filterBy: string | null;
  message:string |  null;
};

export type UserDefinedQuestionsType = {
  title: string | null;
  description: string | null;
  inputTag: {
    input: string | null;
    tags: Tags;
  };
};

export type QuestionResponseType = {
  success: boolean;
  message: string;
  errorMessage?: string;
  question: Question;
};


export type UpdateQuestionParamsType = {
  title?: string;
  description?: string;
  tags?: Array<string>;
  isDeleted?: boolean;
  votes?: {count: number};
  isFlaged?: boolean;
  views?: number;
  totalAnswers?: number;
  isAcceptedAnswerPresent?: boolean;
}