import { loading } from "./common.types";
import { Profile } from "./profile.types";

export type Answer = {
  _id: string;
  question: string;
  isMarkedAsCorrectAnswer: boolean;
  answerer: Profile;
  isDeleted: false;
  votes:  {count: number};
  createdAt: string;
  updatedAt: string;
};

export type AnswersState = {
  answers: Array<Answer>;
  loadingStatus: loading;
  error: unknown;
  sortBy: string | null;
  filterBy: string | null;
};
