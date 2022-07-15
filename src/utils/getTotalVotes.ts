import { Answer, Question } from "../constants";


export const getTotalVotes = ({
  questionOrAnswer,
}: {
  questionOrAnswer: Question | Answer;
}) => {
  return {
    totalVotes:
      questionOrAnswer.votes.upvotes.count +
      questionOrAnswer.votes.downvotes.count,
    totalPoints:
      questionOrAnswer.votes.upvotes.points +
      questionOrAnswer.votes.downvotes.points,
  };
};
