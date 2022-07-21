import { Answer, Question } from "../../constants";

export const addQuestionToDownvotes = ({
  activity,
  question,
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
  question: Question;
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
      upvoted: [...activity.questions.upvoted],
      downvoted: activity.questions.downvoted.concat(question),
      bookmarked: [...activity.questions.bookmarked],
    },
    answers: { ...activity.answers },
  };
};
