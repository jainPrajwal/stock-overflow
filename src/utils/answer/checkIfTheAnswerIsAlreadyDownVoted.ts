import { Answer } from "../../constants";

export const checkIfTheAnswerIsAlreadyDownVoted = ({
  downvotedAnswers,
  answerId,
}: {
  downvotedAnswers: Answer[];
  answerId: string;
}) => {
  return downvotedAnswers.some((downvotedAnswer) => downvotedAnswer._id === answerId);
};
