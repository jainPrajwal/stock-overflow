import { Question } from "../../constants";

export const checkIfTheQuestionIsAlreadyUpvoted = ({
  upvotedQuestions,
  questionId,
}: {
  upvotedQuestions: Question[];
  questionId: string;
}) => {
  return upvotedQuestions.some((question) => question._id === questionId);
};
