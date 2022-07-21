import { Answer, Question } from "../../constants";

export const addAnswerToDownvotes = ({
  activity,
  answer,
}: {
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
  answer: Answer;
}): {
  answers: {
    upvoted: Array<Answer>;
    downvoted: Array<Answer>;
  };
  questions: {
    downvoted: Question[];
    upvoted: Question[];
    bookmarked: Array<Question>;
  };
} => {
  return {
    questions: {
      ...activity.questions,
    },
    answers: {
      upvoted: [...activity.answers.upvoted],
      downvoted: activity.answers.downvoted.concat(answer),
    },
  };
};
