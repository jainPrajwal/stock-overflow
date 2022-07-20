import { formatDistance } from "date-fns";
import { Answer, Comment, Question } from "../../constants";

export const getTimeAgo = (questionOrAnswerOrComment: Question | Answer | Comment) =>
  formatDistance(new Date(), new Date(questionOrAnswerOrComment.createdAt));
