import { Answer, Question } from "../../constants";

export const addQuestionToDownvotes = ({
  activity,
  question,
}: {
  activity: {
    questions: {
      upvoted: Array<Question>;
      downvoted: Array<Question>;
    };
    answers: {
      upvoted: Array<Answer>;
      downvoted: Array<Answer>;
    };
  };
  question: Question;
}): {
  answers: {
    upvoted: Array<Answer>;
    downvoted: Array<Answer>;
  };
  questions: {
    downvoted: Question[];
    upvoted: Question[];
  };
} => {
  return {
    questions: {
      ...activity.questions,
      upvoted: [...activity.questions.upvoted],
      downvoted: activity.questions.downvoted.concat(question),
    },
    answers: { ...activity.answers },
  };
};
