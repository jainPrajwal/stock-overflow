import { Question } from "../../constants";

export const checkIfTheQuestionIsAlreadyDownVoted = ({
  downVotedQuestions,
  questionId,
}: {
  downVotedQuestions: Question[];
  questionId: string;
}) => {
  return downVotedQuestions.some((question) => question._id === questionId);
};
