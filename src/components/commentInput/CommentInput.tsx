import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Tooltip
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addCommentsOnAnswerService } from "../../services/comment/addCommentsOnAnswerService";
import { addCommentsOnQuestionService } from "../../services/comment/addCommentsOnQuestionService";
export const CommentInput = ({
  questionId,
  answerId
}: {
  questionId: string;
  answerId: string | null;
}) => {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector(state => state.profile);
  const [comment, setComment] = useState<{ text: string | null }>({
    text: null
  });
  const [isCommentAdded, setIsCommentAdded] = useState({
    question: false,
    answer: false
  })
  const { comments: { questionsMeta: { loadingStatus: questionLoadingStatus, error: questionError, message: questionMessage }, answersMeta: { loadingStatus: answerLoadingStatus, message: answerMessage, error: answerError } } } = useAppSelector(state => state.comment);

  useEffect(() => {
    if (isCommentAdded.answer) {
      if (answerLoadingStatus === `success`) {
        toast.success(`${answerMessage}`)
      }
      if (answerLoadingStatus === `error`) {
        toast.error(`${answerMessage}`)
      }
    }
    if (isCommentAdded.question) {
      if (questionLoadingStatus === `success`) {
        toast.success(`${questionMessage}`)
       
      }
      if (questionLoadingStatus === `error`) {
        toast.error(`${questionMessage}`)
      }
    }

  }, [questionLoadingStatus, isCommentAdded, answerLoadingStatus, answerMessage, questionMessage])


  return (
    <Box my="12px">
      <form
        onSubmit={(e) => {

          e.preventDefault();
          if (!profile) {
            toast.error(`Please login to avail these features`)
            return;
          }
          if ((profile ? profile.reputation < 3 : false)) {
            toast.error(`You need at least 3 reputation to upvote or downvote!`)
          } else {
            if (questionId && answerId && comment.text) {

              dispatch(addCommentsOnAnswerService({
                questionId,
                answerId,
                comment: { comment: comment.text }
              }))
              setIsCommentAdded(prevState => ({ ...prevState, answer: true }));
            } else if (questionId) {

              if (comment.text) {
                dispatch(addCommentsOnQuestionService({
                  questionId,

                  comment: { comment: comment.text }
                }));
                setComment({
                  text: ``
                })
              }
              setIsCommentAdded(prevState => ({ ...prevState, question: true }));
            }

          }
        }}
      >
        <Flex gap="12px" my="12px" wrap={["wrap", "wrap", "nowrap"]}>
          <Tooltip
            label="you need at least 3 reputations to add a comment"
            hasArrow
            placement="top"
          >
            <Input placeholder="Add a comment" flexGrow="1"
              value={comment.text || ``}
              required min={10}
              onChange={e => {
                setComment(prevState => ({ text: e.target.value }))
              }}
            />
          </Tooltip>
          <Button
            colorScheme="telegram"
            type="submit"
            w={["100%", "100%", "inherit"]}
          >
            Comment
          </Button>
        </Flex>


      </form>
    </Box>
  );
};
