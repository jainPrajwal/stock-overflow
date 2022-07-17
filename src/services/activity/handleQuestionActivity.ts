import { IconType } from "react-icons";
import {
  ActivitiesState,
  Answer,
  ICON_ALREADY_DOWNVOTED,
  ICON_ALREADY_UPVOTED,
  ICON_DOWNVOTE,
  ICON_UPVOTE,
  Question,
} from "../../constants";
import {
  addQuestionToDownvotes,
  addQuestionToUpvotes,
  checkIfTheQuestionIsAlreadyDownVoted,
  checkIfTheQuestionIsAlreadyUpvoted,
  removeQuestionFromDownvotes,
  removeQuestionFromUpvotes,
} from "../../utils/question";
import { updateQuestionService } from "../question/updateQuestionService";
import { updateActivityQuestionService } from "./updateActivityQuestionService";

export const handleQuestionActivity = ({
  icon,
  dispatch,
  question,
  activity,
}: {
  icon: IconType;
  dispatch: any;
  question: Question;
  activity: ActivitiesState;
}) => {
  let updatedActivity: {
    questions: {
      upvoted: Question[];
      downvoted: Question[];
    };
    answers: {
      upvoted: Answer[];
      downvoted: Answer[];
    };
  } | null = null;
  switch (icon) {
    case ICON_ALREADY_UPVOTED:
      // Undo Increased Vote
      dispatch(
        updateQuestionService({
          questionId: question._id,
          question: {
            votes: {
              count: question.votes.count - 1,
            },
          },
        })
      );

      // Remove Question From Upvoted List
      updatedActivity = removeQuestionFromUpvotes({
        activity,
        question,
      });

      // Dispatch
      dispatch(
        updateActivityQuestionService({
          questionId: question._id,
          activity: { activity: updatedActivity },
        })
      );
      break;

    case ICON_UPVOTE:
      const isAlreadyDownvoted = checkIfTheQuestionIsAlreadyDownVoted({
        downVotedQuestions: activity.questions.downvoted,
        questionId: question._id,
      });

      if (isAlreadyDownvoted) {
        // Undo Decreased Vote

        // Remove Question from Downvoted list
        updatedActivity = removeQuestionFromDownvotes({
          question,
          activity,
        });
      }

      // Add Question to Upvoted List
      if (updatedActivity) {
        // it is downvoted

        updatedActivity = addQuestionToUpvotes({
          activity: updatedActivity,
          question,
        });
      } else {
        updatedActivity = addQuestionToUpvotes({
          activity,
          question,
        });
      }

      // Dispatch
      dispatch(
        updateActivityQuestionService({
          questionId: question._id,
          activity: { activity: updatedActivity },
        })
      );

      // Increase Vote
      dispatch(
        updateQuestionService({
          questionId: question._id,
          question: {
            votes: {
              count: question.votes.count + 1,
            },
          },
        })
      );

      break;

    case ICON_DOWNVOTE:
      const isAlreadyUpvoted = checkIfTheQuestionIsAlreadyUpvoted({
        upvotedQuestions: activity.questions.upvoted,
        questionId: question._id,
      });

      if (isAlreadyUpvoted) {
        // Remove from upvotes

        updatedActivity = removeQuestionFromUpvotes({
          activity,
          question,
        });
      }

      if (updatedActivity) {
        // it is already upvoted

        // Add to down votes
        updatedActivity = addQuestionToDownvotes({
          activity: updatedActivity,
          question,
        });
      } else {
        // it is not upvoted

        updatedActivity = addQuestionToDownvotes({
          activity,
          question,
        });
      }

      // Decrease Vote
      dispatch(
        updateQuestionService({
          questionId: question._id,
          question: {
            votes: {
              count: question.votes.count - 1,
            },
          },
        })
      );

      // Dispatch
      dispatch(
        updateActivityQuestionService({
          questionId: question._id,
          activity: { activity: updatedActivity },
        })
      );

      break;
    case ICON_ALREADY_DOWNVOTED:
      // Undo Decreased Vote
      dispatch(
        updateQuestionService({
          questionId: question._id,
          question: {
            votes: {
              count: question.votes.count + 1,
            },
          },
        })
      );

      // Remove Question from Downvoted list
      updatedActivity = removeQuestionFromDownvotes({
        question,
        activity,
      });

      // Dispatch
      dispatch(
        updateActivityQuestionService({
          questionId: question._id,
          activity: {
            activity: updatedActivity,
          },
        })
      );

      break;

    default:
      console.log(`Invalid Icon`);
  }
};
