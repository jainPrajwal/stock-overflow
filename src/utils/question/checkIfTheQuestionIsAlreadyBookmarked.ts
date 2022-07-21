import { Question } from "../../constants";

export const checkIfTheQuestionIsAlreadyBookmarked = ({
  bookmarkedQuestions,
  questionId,
}: {
  bookmarkedQuestions: Question[];
  questionId: string;
}) => {
  return bookmarkedQuestions.some((question) => question._id === questionId);
};
