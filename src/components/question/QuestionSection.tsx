import { Box, Button, Flex, Icon, Text, Tooltip, useDisclosure } from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CommentInput } from "../commentInput/CommentInput";
import { Flair } from "../flair/Flair";
import { SectionHeading } from "../heading/SectionHeading";
import { CustomIconButton } from "../icon/CustomIconButton";
import { Tag } from "../tags/Tag";
import { ICON_ALREADY_BOOKMARKED, ICON_ALREADY_DOWNVOTED, ICON_ALREADY_UPVOTED, ICON_BOOKMARK, ICON_DOWNVOTE, ICON_UPVOTE } from "../../constants";

import { QuestionDescription } from "./QuestionDescription";
import { checkIfTheQuestionIsAlreadyBookmarked, checkIfTheQuestionIsAlreadyDownVoted, checkIfTheQuestionIsAlreadyUpvoted, getQuestionFromQuestionId } from "../../utils/question";

import { useEffect, useState } from "react";
import { getQuestionWithQuestionIdService, updateActivityQuestionService } from "../../services";
import { QuestionCommentSecion } from "../comment/QuestionCommentSection";
import { getCommentsOnQuestionService } from "../../services/comment/getCommentsOnQuestionService";
import { EditQuestionModal } from "./editQuestionModal/EditQuestionModal";
import { DeleteQuestionModal } from "./deleteQuestionModal/DeleteQuestionModal";
import { toast } from "react-toastify";
import { handleLinkShare } from "../../utils/handleLinkShare";
import { ErrorFallback } from "../errorBoundary/ErrorFallback";
import { Loader } from "../loader/Loader";



export const QuestionSection = () => {
  const { questionId } = useParams();
  const { questions, loadingStatus } = useAppSelector(state => state.question);
  const { comments } = useAppSelector(state => state.comment);
  const dispatch = useAppDispatch();
  const activity = useAppSelector(state => state.activity);
  const { profile } = useAppSelector(state => state.profile);


  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();

  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {

    if (isBookmarked) {
      if (activity.loadingStatus === `success`) {
        toast.success(`${activity.message}`);
        setIsBookmarked(false)
      } else if (activity.loadingStatus === `error`) {
        toast.error(`${activity.message}`)
      }
    }

  }, [activity, isBookmarked])


  useEffect(() => {
    if (loadingStatus === `idle` && questionId) {

      dispatch(getQuestionWithQuestionIdService({
        questionId
      }))
    }
  }, [loadingStatus, questionId, dispatch])

  useEffect(() => {
    if (comments.questionsMeta.loadingStatus === `idle`) {
      if (questionId) {

        dispatch(getCommentsOnQuestionService({
          questionId
        }))
      }
    }

  }, [comments.questionsMeta.loadingStatus, dispatch, questionId]);



  if (questionId) {
    const question = getQuestionFromQuestionId(questions, questionId);
    if (question) {
      const isAlreadyUpvoted = checkIfTheQuestionIsAlreadyUpvoted({ upvotedQuestions: activity.questions.upvoted, questionId: question._id });
      const isAlreadyDownvoted = checkIfTheQuestionIsAlreadyDownVoted({
        downVotedQuestions: activity.questions.downvoted,
        questionId: question._id
      });
      const commentsOnSpecifiedQuestion = comments.questionsMeta.questions.filter(commentOnQuestion => commentOnQuestion.question === questionId);
      const isQuestionAlreadyBookmarked = checkIfTheQuestionIsAlreadyBookmarked({
        bookmarkedQuestions: activity.questions.bookmarked,
        questionId: question._id
      })
      return (
        <>
          {
            isEditModalOpen && <EditQuestionModal
              isOpen={isEditModalOpen}
              onClose={onEditModalClose}
              key={question._id}
              question={question}
            />
          }
          {
            isDeleteModalOpen && <DeleteQuestionModal
              isOpen={isDeleteModalOpen}
              onClose={onDeleteModalClose}
              question={question}
            />
          }
          <SectionHeading
            heading={`${question.title}`}
          />
          {loadingStatus === `success` ? <Flex pt="2rem" width="100%" gap={["12px", "2rem"]} flexGrow={`1`} maxW={`820px`}>

            <Flex direction="column" justify="start" align="center" gap="8px">
              <CustomIconButton icon={isAlreadyUpvoted ? ICON_ALREADY_UPVOTED : ICON_UPVOTE} questionId={questionId} answer={null}

              />
              <Box>
                <Text fontSize="larger">{question.votes.count}</Text>
              </Box>
              <CustomIconButton icon={isAlreadyDownvoted ? ICON_ALREADY_DOWNVOTED : ICON_DOWNVOTE} questionId={questionId}
                answer={null}
              />
              <Box>
                <Tooltip
                  label={`mark this as correct answer`}>
                  <Button
                    isDisabled={activity.loadingStatus === `loading`}
                    bg="transparent"

                    borderRadius="full"
                    p={["4px", "4px", "8px"]}
                    width={["24px", "48px", "48px"]}
                    minW="none"
                    height={["24px", "48px", "48px"]}
                    onClick={() => {
                      if (!profile) {
                        toast.error(`Please login to avail these features`)
                        return;
                      }
                      if (!isQuestionAlreadyBookmarked) {
                        setIsBookmarked(true);
                        dispatch(updateActivityQuestionService({
                          activity: {
                            activity: {
                              ...activity,
                              questions: {
                                ...activity.questions,
                                bookmarked: activity.questions.bookmarked.concat(question),
                              },
                            }

                          },
                          questionId: question._id
                        }))
                      } else {
                        setIsBookmarked(true)
                        dispatch(updateActivityQuestionService({
                          activity: {
                            activity: {
                              ...activity,
                              questions: {
                                ...activity.questions,
                                bookmarked: activity.questions.bookmarked.filter(bookmarkedQuestion => bookmarkedQuestion._id !== question._id),
                              },
                            }

                          },
                          questionId: question._id
                        }))
                      }

                    }}
                  >

                    <Icon width="60%" height="60%" as={!isQuestionAlreadyBookmarked ? ICON_BOOKMARK : ICON_ALREADY_BOOKMARKED} />
                  </Button>
                </Tooltip>
              </Box>
            </Flex>

            <Flex direction="column" flexGrow={`1`}>
              <QuestionDescription description={question.description} />
              <Flex gap="12px">
                <Flex gap="12px">
                  {question.tags.map(tag => <Tag tag={tag}
                    key={tag}
                  />)}
                </Flex>

                <Flex gap="12px" ml="auto">

                  {question.questioner._id === profile?._id &&
                    <>
                      <Box

                      >
                        <Button
                          colorScheme={`telegram`}
                          variant={`outline`}

                          size={`sm`}
                          onClick={onEditModalOpen}
                        >Edit</Button>
                      </Box>


                      <Box

                      >
                        <Button
                          colorScheme={`red`}
                          variant={`outline`}
                          size={`sm`}
                          onClick={onDeleteModalOpen}
                        >Delete</Button>
                      </Box>
                    </>
                  }

                  <Box

                  >
                    <Button
                      colorScheme={`telegram`}
                      variant={`outline`}

                      size={`sm`}
                      onClick={handleLinkShare}

                    >Share</Button>
                  </Box>
                </Flex>
              </Flex>

              <Flex
                justify="end"
                py="12px"
                gap="12px"
                wrap={["wrap", "wrap", "nowrap"]}
              >

                <Flair
                  question={question}
                  cardBackgroundColor="blue.100" />
              </Flex>
              <CommentInput
                questionId={questionId}
                answerId={null}
              />
              <QuestionCommentSecion
                commentsOnSpecifiedQuestion={commentsOnSpecifiedQuestion}
                questionId={`${questionId}`} />



            </Flex>
          </Flex> : loadingStatus === `loading` ? <Loader /> : <ErrorFallback />}
        </>
      );
    }
    return <Box p="1rem">{loadingStatus === `loading` ? <Loader /> : `Invalid ID..!`}</Box>

  }

  return <Box p="1rem">{loadingStatus === `loading` ? <Loader /> : `Invalid ID..!`}</Box>

};
