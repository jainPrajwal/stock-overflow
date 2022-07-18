import { Answer, Question } from "../../constants";

export const removeAnswerFromDownvotes = ({
  activity,
  answer,
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
  answer: Answer;
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
    answers: {
      downvoted: activity.answers.downvoted.filter(
        (downvotedAnswer) => downvotedAnswer._id !== answer._id
      ),
      upvoted: [...activity.answers.upvoted],
    },
    questions: {
      ...activity.questions,
    },
  };
};
