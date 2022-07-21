import { Answer, Question } from "../../constants";

export const removeQuestionFromUpvotes = ({
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
      upvoted: activity.questions.upvoted.filter(
        (upvotedQuestion) => upvotedQuestion._id !== question._id
      ),
      downvoted: [...activity.questions.downvoted],
      bookmarked: [...activity.questions.bookmarked],
    },
    answers: { ...activity.answers },
  };
};
