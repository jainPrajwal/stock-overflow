import { Answer } from "./answer.types";
import { loading } from "./common.types";
import { Question } from "./question.types";

export type ActivitiesState = {
  questions: {
    upvoted: Array<Question>;
    downvoted: Array<Question>;
    bookmarked: Array<Question>;
  };
  answers: {
    upvoted: Array<Answer>;
    downvoted: Array<Answer>;
  };
  loadingStatus: loading;
  error: unknown;
  message: string | null;
};

export type ActivityResponseType = {
  activity: {
    questions: {
      upvoted: Array<Question>;
      downvoted: Array<Question>;
      bookmarked: Array<Question>;
    };
    answers: {
      upvoted: Array<Answer>;
      downvoted: Array<Answer>;
    };
  };
  error?: unknown;
  message?: string | null;
};
