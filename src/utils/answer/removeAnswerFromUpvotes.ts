import { Answer, Question } from "../../constants";

export const removeAnswerFromUpvotes = ({
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
    questions: {
      ...activity.questions,
    },
    answers: {
     
      upvoted: activity.answers.upvoted.filter(
        (upvotedAnswer) => upvotedAnswer._id !== answer._id
      ),
      downvoted: [...activity.answers.downvoted],
    },
  };
};
