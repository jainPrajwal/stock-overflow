import { Answer, Question } from "../../constants";

export const removeQuestionFromDownvotes = ({
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
    answers: { ...activity.answers },
    questions: {
      downvoted: activity.questions.downvoted.filter(
        (upvotedQuestion) => upvotedQuestion._id !== question._id
      ),
      upvoted: [...activity.questions.upvoted],
      bookmarked: [...activity.questions.bookmarked],
    },
  };
};
