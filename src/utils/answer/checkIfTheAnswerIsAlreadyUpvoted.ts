import { Answer } from "../../constants";

export const checkIfTheAnswerIsAlreadyUpvoted = ({
  upvotedAnswers,
  answerId,
}: {
  upvotedAnswers: Answer[];
  answerId: string;
}) => {
  return upvotedAnswers.some(
    (upvotedAnswer) => upvotedAnswer._id === answerId
  );
};
