import { IconType } from "react-icons";
import {
  ActivitiesState,
  Answer,
  ICON_ALREADY_DOWNVOTED,
  ICON_ALREADY_UPVOTED,
  ICON_DOWNVOTE,
  ICON_UPVOTE,
  Profile,
  Question,
} from "../../constants";
import {
  updateActivityAnswerService,
  updateAnswerService,
} from "../../services";
import { updateProfileService } from "../../services/profile/updateProfileService";
import {
  addAnswerToDownvotes,
  removeAnswerFromDownvotes,
  removeAnswerFromUpvotes,
  addAnswerToUpvotes,
  checkIfTheAnswerIsAlreadyDownVoted,
  checkIfTheAnswerIsAlreadyUpvoted,
} from "../../utils/answer";

export const handleAnswerActivity = ({
  icon,
  dispatch,
  answer,
  activity,
  questionId,
  profile,
}: {
  icon: IconType;
  dispatch: any;
  answer: Answer;
  activity: ActivitiesState;
  questionId: string;
  profile: Profile;
}) => {
  let updatedActivity: {
    questions: {
      upvoted: Question[];
      downvoted: Question[];
      bookmarked: Question[];
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
        updateAnswerService({
          answerId: answer._id,
          questionId,
          answer: {
            votes: {
              count: answer.votes.count - 1,
            },
            answerer: {
              ...answer.answerer,
              reputation: answer.answerer.reputation - 1,
            },
          },
        })
      );

      // Remove Question From Upvoted List
      updatedActivity = removeAnswerFromUpvotes({
        activity,
        answer,
      });

      // Dispatch
      dispatch(
        updateActivityAnswerService({
          answerId: answer._id,
          activity: { activity: updatedActivity },
        })
      );
      break;

    case ICON_UPVOTE:
      const isAlreadyDownvoted = checkIfTheAnswerIsAlreadyDownVoted({
        downvotedAnswers: activity.answers.downvoted,
        answerId: answer._id,
      });

      if (isAlreadyDownvoted) {
        // Undo Decreased Vote

        // Remove Question from Downvoted list
        updatedActivity = removeAnswerFromDownvotes({
          answer,
          activity,
        });
      }

      // Add Question to Upvoted List
      if (updatedActivity) {
        // it is downvoted

        updatedActivity = addAnswerToUpvotes({
          activity: updatedActivity,
          answer,
        });
      } else {
        updatedActivity = addAnswerToUpvotes({
          activity,
          answer,
        });
      }

      // Dispatch
      dispatch(
        updateActivityAnswerService({
          answerId: answer._id,
          activity: { activity: updatedActivity },
        })
      );

      // Increase Vote
      dispatch(
        updateAnswerService({
          answerId: answer._id,
          questionId,
          answer: {
            votes: {
              count: isAlreadyDownvoted
                ? answer.votes.count + 2
                : answer.votes.count + 1,
            },
            answerer: {
              ...answer.answerer,
              reputation: answer.answerer.reputation + 1,
            },
          },
        })
      );

      break;

    case ICON_DOWNVOTE:
      const isAlreadyUpvoted = checkIfTheAnswerIsAlreadyUpvoted({
        upvotedAnswers: activity.answers.upvoted,
        answerId: answer._id,
      });

      if (isAlreadyUpvoted) {
        // Remove from upvotes

        updatedActivity = removeAnswerFromUpvotes({
          activity,
          answer,
        });
      }

      if (updatedActivity) {
        // it is already upvoted

        // Add to down votes
        updatedActivity = addAnswerToDownvotes({
          activity: updatedActivity,
          answer,
        });
      } else {
        // it is not upvoted

        updatedActivity = addAnswerToDownvotes({
          activity,
          answer,
        });
      }

      // Decrease Vote
      dispatch(
        updateAnswerService({
          answerId: answer._id,
          questionId,
          answer: {
            votes: {
              count: isAlreadyUpvoted
                ? answer.votes.count - 2
                : answer.votes.count - 1,
            },
            answerer: {
              ...answer.answerer,
              reputation: answer.answerer.reputation - 1,
            },
          },
        })
      );

      // If the user downvotes an answer, decrease his 1 point
      dispatch(
        updateProfileService({
          profile: {
            ...profile,
            reputation: profile.reputation - 1,
          },
        })
      );

      // Dispatch
      dispatch(
        updateActivityAnswerService({
          answerId: answer._id,
          activity: { activity: updatedActivity },
        })
      );

      break;
    case ICON_ALREADY_DOWNVOTED:
      // Undo Decreased Vote
      dispatch(
        updateAnswerService({
          answerId: answer._id,
          questionId,
          answer: {
            votes: {
              count: answer.votes.count + 1,
            },
            answerer: {
              ...answer.answerer,
              reputation: answer.answerer.reputation + 1,
            },
          },
        })
      );

      // If the user undoes the downvote to an answer, increase his 1 point
      dispatch(
        updateProfileService({
          profile: {
            ...profile,
            reputation: profile.reputation + 1,
          },
        })
      );

      // Remove Question from Downvoted list
      updatedActivity = removeAnswerFromDownvotes({
        answer,
        activity,
      });

      // Dispatch
      dispatch(
        updateActivityAnswerService({
          answerId: answer._id,
          activity: {
            activity: updatedActivity,
          },
        })
      );

      break;

    default:
  }
};
