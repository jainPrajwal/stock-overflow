import { loading, Vote } from "./common.types";
import { Profile } from "./profile.types";

export type Answer = {
  _id: string;
  question: string;
  isMarkedAsCorrectAnswer: boolean;
  answerer: Profile;
  isDeleted: false;
  votes: Vote;
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
