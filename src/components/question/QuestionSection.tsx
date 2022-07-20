import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CommentInput } from "../commentInput/CommentInput";
import { Flair } from "../flair/Flair";
import { SectionHeading } from "../heading/SectionHeading";
import { CustomIconButton } from "../icon/CustomIconButton";
import { Tag } from "../tags/Tag";
import { ICON_ALREADY_DOWNVOTED, ICON_ALREADY_UPVOTED, ICON_DOWNVOTE, ICON_UPVOTE } from "../../constants";

import { QuestionDescription } from "./QuestionDescription";
import { checkIfTheQuestionIsAlreadyDownVoted, checkIfTheQuestionIsAlreadyUpvoted, getQuestionFromQuestionId } from "../../utils/question";

import { useEffect } from "react";
import { getQuestionWithQuestionIdService } from "../../services";
import { QuestionCommentSecion } from "../comment/QuestionCommentSection";
import { getCommentsOnQuestionService } from "../../services/comment/getCommentsOnQuestionService";
import { EditQuestionModal } from "./editQuestionModal/EditQuestionModal";















export const QuestionSection = () => {
  const { questionId } = useParams();
  const { questions, loadingStatus } = useAppSelector(state => state.question);
  const { comments } = useAppSelector(state => state.comment);
  const dispatch = useAppDispatch();
  const activity = useAppSelector(state => state.activity);

  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    if (loadingStatus === `idle` && questionId) {
      console.log(`fire API to get the question`);
      dispatch(getQuestionWithQuestionIdService({
        questionId
      }))
    }
  }, [loadingStatus, questionId, dispatch])

  useEffect(() => {
    if (comments.questionsMeta.loadingStatus === `idle`) {
      if (questionId) {
        console.log(`getting comments on question`)
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
      return (
        <>
          {
            isOpen && <EditQuestionModal
              isOpen={isOpen}
              onClose={onClose}
              key={question._id}
            />
          }
          <SectionHeading
            heading={`${question.title}`}
          />
          <Flex pt="2rem" width="100%" gap={["12px", "2rem"]} >

            <Flex direction="column" justify="start" align="center" gap="8px">
              <CustomIconButton icon={isAlreadyUpvoted ? ICON_ALREADY_UPVOTED : ICON_UPVOTE} questionId={questionId} answer={null}

              />
              <Box>
                <Text fontSize="larger">{question.votes.count}</Text>
              </Box>
              <CustomIconButton icon={isAlreadyDownvoted ? ICON_ALREADY_DOWNVOTED : ICON_DOWNVOTE} questionId={questionId}
                answer={null}
              />
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
                  <Box

                  >
                    <Button
                      colorScheme={`telegram`}
                      variant={`outline`}
                      fontSize="small"

                      onClick={onOpen}
                    >Edit</Button>
                  </Box>
                  <Box

                  >
                    <Button
                      colorScheme={`red`}
                      variant={`outline`}
                      fontSize="small"

                    
                    >Delete</Button>
                  </Box>
                  <Box

                  >
                    <Button
                      colorScheme={`telegram`}
                      variant={`outline`}
                      fontSize="small"

                    
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
          </Flex>
        </>
      );
    }
    return <>Invalid ID..!</>

  }

  return <>Invalid ID..!</>

};
