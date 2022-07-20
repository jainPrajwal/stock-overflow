import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Tooltip
} from "@chakra-ui/react";
import React, { useState } from "react";
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
  const {profile} = useAppSelector(state => state.profile);
  const [comment, setComment] = useState<{ text: string | null }>({
    text: null
  })
  return (
    <Box my="12px">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if ((profile ? profile.reputation < 3 : false)) {
            toast.error(`You need at least 3 reputation to upvote or downvote!`)
          } else {
            if (questionId && answerId && comment.text) {
              console.log(`its answer comment`);
              dispatch(addCommentsOnAnswerService({
                questionId,
                answerId,
                comment: { comment: comment.text }
              }))
            } else if (questionId) {
              console.log(`its question comment`)
              if (comment.text) {
                dispatch(addCommentsOnQuestionService({
                  questionId,

                  comment: { comment: comment.text }
                }))
              }

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
        <Divider />

      </form>
    </Box>
  );
};
