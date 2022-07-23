import { formatDistance } from "date-fns";
import { Answer, Comment, Profile, Question } from "../../constants";

export const getTimeAgo = (questionOrAnswerOrComment: Question | Answer | Comment | Profile) =>
  formatDistance(new Date(), new Date(questionOrAnswerOrComment.createdAt));
